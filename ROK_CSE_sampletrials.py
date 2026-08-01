import json
import random
import os 

os.mkdir("sample_trials")


all_blocks = []

for block in range(8):
    conditions_vertical = (["vertical_c1"]*8 + ["vertical_c2"]* 8 + ["vertical_i1"]* 8 + ["vertical_i2"]*8 )
    random.shuffle(conditions_vertical)
    conditions_horizontal = (["horizontal_c1"]*8 + ["horizontal_c2"]* 8 + ["horizontal_i1"]* 8 + ["horizontal_i2"]*8 )
    random.shuffle(conditions_horizontal)

    
    start_with_vertical = (block % 2 == 1)

    trials = []


    for i, (cond_h, cond_v) in enumerate(zip(conditions_horizontal, conditions_vertical)): 
        horizontal_trial = { 
            "block":block, 
            "condition": cond_h}

        vertical_trial = { 
            "block":block, 
            "condition": cond_v}


        if start_with_vertical:
            trials.append(vertical_trial)
            trials.append(horizontal_trial)
        else:
            trials.append(horizontal_trial)
            trials.append(vertical_trial)

        if trials[-1]["condition"].startswith("horizontal"):
         extra_condition = random.choice(conditions_vertical)
        else:
         extra_condition = random.choice(conditions_horizontal)

    num65_trial = {          
         "block": block,
         "condition": extra_condition}
    trials.append(num65_trial)
    for j, trial in enumerate(trials): 
       trial["id"] = j
    all_blocks.append(trials)
with open(f"sample_trials/p_experiment_sample.json", "w") as f:
    json.dump(all_blocks, f, indent = 4)
print(trials)



all_blocks_practice = []

for block in range(8):
    conditions_vertical = (["vertical_c1"]*2 + ["vertical_c2"]* 2 + ["vertical_i1"]* 2 + ["vertical_i2"]*2 )
    random.shuffle(conditions_vertical)
    conditions_horizontal = (["horizontal_c1"]*2 + ["horizontal_c2"]* 2 + ["horizontal_i1"]* 2 + ["horizontal_i2"]*2 )
    random.shuffle(conditions_horizontal)

    
    start_with_vertical = (block % 2 == 1)

    trials = []


    for i, (cond_h, cond_v) in enumerate(zip(conditions_horizontal, conditions_vertical)): 
        horizontal_trial = {
            "id": i, 
            "block":block, 
            "condition": cond_h}

        vertical_trial = {
            "id": i, 
            "block":block, 
            "condition": cond_v}


        if start_with_vertical:
           trials.append(vertical_trial)
           trials.append(horizontal_trial)
        else:
           trials.append(horizontal_trial)
           trials.append(vertical_trial)

        if trials[-1]["condition"].startswith("horizontal"):
         extra_condition = random.choice(conditions_vertical)
        else:
         extra_condition = random.choice(conditions_horizontal)

    num65_trial = {
            "id": i + 1,          # continues the counter (last i was 31, so this is 32)
            "block": block,
            "condition": extra_condition}
    trials.append(num65_trial)
    for j, trial in enumerate(trials): 
       trial["id"] = j
    all_blocks_practice.append(trials)
with open(f"sample_trials/p_practice_sample.json", "w") as f:
    json.dump(all_blocks_practice, f, indent = 4)
print(trials)