import json
import os
import random
from collections import Counter
from pathlib import Path


# ---------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------

OUTPUT_FILE = Path("experimental_trials_words.js")
TEMP_FILE = OUTPUT_FILE.with_name(f".{OUTPUT_FILE.name}.tmp")

BLOCKS_PER_BLOCKSET = 8
TRIALS_PER_ORIGINAL_BLOCK = 64
TRIALS_PER_SAVED_BLOCK = 65

PAIR_TYPES = ("cC", "cI", "iC", "iI")
TARGET_PAIR_COUNT = 16

# The exact beginning and end of the generated JavaScript file.
FILE_PREFIX = "var experimental_blocksets = [\n"
FILE_SUFFIX = "\n];\n"


# ---------------------------------------------------------------------
# Condition helpers
# ---------------------------------------------------------------------

def get_axis(condition):
    """
    Return the axis of a condition.

    Examples:
        horizontal_c1 -> horizontal
        vertical_i2   -> vertical
    """
    return condition.split("_")[0]


def get_congruency(condition):
    """
    Return 'c' or 'i' from a condition.

    Examples:
        horizontal_c1 -> c
        vertical_i2   -> i
    """
    return condition.split("_")[1][0].lower()


def get_pair_counts(trials):
    """
    Count adjacent congruency transitions.

    Examples:
        congruent   -> congruent     = cC
        congruent   -> incongruent   = cI
        incongruent -> congruent     = iC
        incongruent -> incongruent   = iI
    """
    counts = Counter()

    for previous_trial, current_trial in zip(trials, trials[1:]):
        previous_congruency = get_congruency(
            previous_trial["condition"]
        ).lower()

        current_congruency = get_congruency(
            current_trial["condition"]
        ).upper()

        pair_type = previous_congruency + current_congruency
        counts[pair_type] += 1

    return counts


# ---------------------------------------------------------------------
# Block generation
# ---------------------------------------------------------------------

def generate_candidate_block(block_number):
    """
    Generate the original 64 experimental trials.

    Each axis contains:
        8 c1 trials
        8 c2 trials
        8 i1 trials
        8 i2 trials

    Across both axes, this gives:
        32 congruent trials
        32 incongruent trials
    """
    conditions_vertical = (
        ["vertical_c1"] * 8
        + ["vertical_c2"] * 8
        + ["vertical_i1"] * 8
        + ["vertical_i2"] * 8
    )

    conditions_horizontal = (
        ["horizontal_c1"] * 8
        + ["horizontal_c2"] * 8
        + ["horizontal_i1"] * 8
        + ["horizontal_i2"] * 8
    )

    random.shuffle(conditions_vertical)
    random.shuffle(conditions_horizontal)

    # Blocks 0, 2, 4, and 6 start horizontally.
    # Blocks 1, 3, 5, and 7 start vertically.
    start_with_vertical = block_number % 2 == 1

    trials = []

    for horizontal_condition, vertical_condition in zip(
        conditions_horizontal,
        conditions_vertical
    ):
        horizontal_trial = {
            "block": block_number,
            "condition": horizontal_condition
        }

        vertical_trial = {
            "block": block_number,
            "condition": vertical_condition
        }

        if start_with_vertical:
            trials.append(vertical_trial)
            trials.append(horizontal_trial)
        else:
            trials.append(horizontal_trial)
            trials.append(vertical_trial)

    return trials


def add_balancing_first_trial(trials, block_number):
    """
    Try to prepend one trial so that the resulting 65-trial block has:

        16 cC pairs
        16 cI pairs
        16 iC pairs
        16 iI pairs

    The prepended trial is always on the opposite axis from the original
    first trial.

    Returns:
        A completed 65-trial block when possible.
        None when the candidate must be randomized again.
    """
    existing_pair_counts = get_pair_counts(trials)

    deficits = {
        pair_type: TARGET_PAIR_COUNT
        - existing_pair_counts.get(pair_type, 0)
        for pair_type in PAIR_TYPES
    }

    # Reject the block if any pair type already occurs more than 16 times.
    if any(deficit < 0 for deficit in deficits.values()):
        return None

    missing_pairs = [
        pair_type
        for pair_type, deficit in deficits.items()
        if deficit == 1
    ]

    # The original 64 trials contain 63 transitions. Therefore, exactly
    # one transition must be missing from the desired 16/16/16/16 split.
    if len(missing_pairs) != 1:
        return None

    if sum(deficits.values()) != 1:
        return None

    missing_pair = missing_pairs[0]

    original_first_condition = trials[0]["condition"]
    original_first_congruency = get_congruency(
        original_first_condition
    )

    # The second character of the missing pair must correspond to the
    # congruency of the original first trial.
    #
    # For example, if cI is missing, the original first trial must be
    # incongruent and the additional trial must be congruent.
    if missing_pair[1].lower() != original_first_congruency:
        return None

    required_extra_congruency = missing_pair[0].lower()

    original_first_axis = get_axis(original_first_condition)

    if original_first_axis == "vertical":
        extra_axis = "horizontal"
    else:
        extra_axis = "vertical"

    # Randomly select condition subtype 1 or 2.
    extra_condition = (
        f"{extra_axis}_"
        f"{required_extra_congruency}"
        f"{random.choice([1, 2])}"
    )

    extra_trial = {
        "block": block_number,
        "condition": extra_condition
    }

    completed_trials = [extra_trial] + trials

    # Number the saved trials from 0 to 64.
    for trial_id, trial in enumerate(completed_trials):
        trial["id"] = trial_id

    return completed_trials


def validate_block(trials):
    """
    Perform a final validation before accepting a block.
    """
    if len(trials) != TRIALS_PER_SAVED_BLOCK:
        return False

    # The first trial is the additional transition-balancing trial.
    # The original 64 experimental trials must remain exactly 50/50.
    original_experimental_trials = trials[1:]

    if len(original_experimental_trials) != TRIALS_PER_ORIGINAL_BLOCK:
        return False

    congruency_counts = Counter(
        get_congruency(trial["condition"])
        for trial in original_experimental_trials
    )

    if congruency_counts["c"] != 32:
        return False

    if congruency_counts["i"] != 32:
        return False

    pair_counts = get_pair_counts(trials)

    for pair_type in PAIR_TYPES:
        if pair_counts[pair_type] != TARGET_PAIR_COUNT:
            return False

    # The added first trial must be on the opposite axis from the
    # original first trial.
    added_trial_axis = get_axis(trials[0]["condition"])
    original_first_axis = get_axis(trials[1]["condition"])

    if added_trial_axis == original_first_axis:
        return False

    # Confirm that IDs are exactly 0 through 64.
    expected_ids = list(range(TRIALS_PER_SAVED_BLOCK))
    actual_ids = [trial["id"] for trial in trials]

    if actual_ids != expected_ids:
        return False

    return True


def generate_valid_block(block_number):
    """
    Keep randomizing until one valid 65-trial block is found.
    """
    attempts = 0

    while True:
        attempts += 1

        candidate_trials = generate_candidate_block(block_number)

        completed_trials = add_balancing_first_trial(
            candidate_trials,
            block_number
        )

        if completed_trials is None:
            continue

        if not validate_block(completed_trials):
            continue

        return completed_trials, attempts


def generate_blockset():
    """
    Generate one complete blockset containing eight valid blocks.

    Nothing is written to the JavaScript file until all eight blocks
    have been completed.
    """
    blockset = []
    total_attempts = 0

    for block_number in range(BLOCKS_PER_BLOCKSET):
        trials, attempts = generate_valid_block(block_number)

        blockset.append(trials)
        total_attempts += attempts

        print(
            f"  Completed block {block_number + 1}/"
            f"{BLOCKS_PER_BLOCKSET} after {attempts} attempts."
        )

    return blockset, total_attempts


# ---------------------------------------------------------------------
# Safe JavaScript file handling
# ---------------------------------------------------------------------

def remove_temporary_file():
    """
    Remove a temporary file left by an interrupted earlier run.
    """
    try:
        TEMP_FILE.unlink()
    except FileNotFoundError:
        pass


def initialize_output_file():
    """
    Create an initially valid JavaScript file containing an empty list.

    Existing blocksets are preserved when the script is restarted.
    """
    remove_temporary_file()

    if OUTPUT_FILE.exists():
        validate_output_file_structure()
        return

    with TEMP_FILE.open("w", encoding="utf-8", newline="\n") as file:
        file.write(FILE_PREFIX)
        file.write(FILE_SUFFIX)
        file.flush()
        os.fsync(file.fileno())

    os.replace(TEMP_FILE, OUTPUT_FILE)


def validate_output_file_structure():
    """
    Verify that an existing output file was created in the expected
    format before attempting to append another blockset.
    """
    prefix_bytes = FILE_PREFIX.encode("utf-8")
    suffix_bytes = FILE_SUFFIX.encode("utf-8")

    file_size = OUTPUT_FILE.stat().st_size

    minimum_size = len(prefix_bytes) + len(suffix_bytes)

    if file_size < minimum_size:
        raise RuntimeError(
            f"{OUTPUT_FILE} is incomplete or has an unexpected format."
        )

    with OUTPUT_FILE.open("rb") as file:
        actual_prefix = file.read(len(prefix_bytes))

        file.seek(-len(suffix_bytes), os.SEEK_END)
        actual_suffix = file.read(len(suffix_bytes))

    if actual_prefix != prefix_bytes or actual_suffix != suffix_bytes:
        raise RuntimeError(
            f"{OUTPUT_FILE} does not have the expected format. "
            "Rename or remove it before starting this generator."
        )


def format_blockset_for_javascript(blockset):
    """
    Convert one blockset to formatted JSON.

    JSON arrays and objects are also valid JavaScript syntax.
    """
    blockset_text = json.dumps(
        blockset,
        indent=4,
        ensure_ascii=False
    )

    # Indent the complete blockset within experimental_blocksets.
    return "\n".join(
        f"    {line}"
        for line in blockset_text.splitlines()
    )


def copy_exact_bytes(source, destination, number_of_bytes):
    """
    Copy exactly the requested number of bytes without loading the
    complete existing JavaScript file into memory.
    """
    remaining = number_of_bytes

    while remaining > 0:
        chunk = source.read(min(1024 * 1024, remaining))

        if not chunk:
            raise RuntimeError(
                "Unexpected end of the existing JavaScript file."
            )

        destination.write(chunk)
        remaining -= len(chunk)


def append_blockset_atomically(blockset):
    """
    Append one complete eight-block blockset.

    A complete new file is first written to TEMP_FILE. Only after that
    file has been fully written and flushed does os.replace() replace
    the previous output file.

    Consequently, interruption leaves either:
        - the previous complete JavaScript file, or
        - the new complete JavaScript file.

    It cannot leave a partially appended blockset in OUTPUT_FILE.
    """
    validate_output_file_structure()

    prefix_bytes = FILE_PREFIX.encode("utf-8")
    suffix_bytes = FILE_SUFFIX.encode("utf-8")

    formatted_blockset = format_blockset_for_javascript(
        blockset
    ).encode("utf-8")

    existing_file_size = OUTPUT_FILE.stat().st_size

    existing_body_size = (
        existing_file_size
        - len(prefix_bytes)
        - len(suffix_bytes)
    )

    try:
        with OUTPUT_FILE.open("rb") as source:
            # Move past "var experimental_blocksets = [\n".
            source.seek(len(prefix_bytes))

            with TEMP_FILE.open("wb") as destination:
                destination.write(prefix_bytes)

                # Copy all previously generated blocksets, but not the
                # final closing characters of the JavaScript array.
                copy_exact_bytes(
                    source,
                    destination,
                    existing_body_size
                )

                # Add a comma only when at least one blockset already
                # exists in the file.
                if existing_body_size > 0:
                    destination.write(b",\n")

                destination.write(formatted_blockset)
                destination.write(suffix_bytes)

                destination.flush()
                os.fsync(destination.fileno())

        # Atomic replacement: OUTPUT_FILE is never partially rewritten.
        os.replace(TEMP_FILE, OUTPUT_FILE)

    except BaseException:
        remove_temporary_file()
        raise


# ---------------------------------------------------------------------
# Main infinite generation loop
# ---------------------------------------------------------------------

def main():
    initialize_output_file()

    generated_this_run = 0

    print(f"Writing complete blocksets to: {OUTPUT_FILE.resolve()}")
    print("Press Ctrl+C to stop.\n")

    try:
        while True:
            print(
                f"Generating blockset "
                f"{generated_this_run + 1} of this run..."
            )

            blockset, total_attempts = generate_blockset()

            # Saving occurs only after all eight blocks are complete.
            append_blockset_atomically(blockset)

            generated_this_run += 1

            print(
                f"Saved complete blockset {generated_this_run} "
                f"after {total_attempts} total block attempts.\n"
            )

    except KeyboardInterrupt:
        remove_temporary_file()

        print("\nGeneration stopped.")
        print(
            f"{OUTPUT_FILE} contains only complete blocksets, "
            "each containing eight valid 65-trial blocks."
        )


if __name__ == "__main__":
    main()