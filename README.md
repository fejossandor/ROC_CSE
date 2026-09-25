## About the repository 

The repository contains the full experimental code belonging to the experiments featured in the study **Investigating sequential congruency effect modulations by a random object kinematogram**. The project was conducted by Boglarka Ludmany, Julianna Harangozo, Miklos Bognar, Natalija Dokic, Peter Czingraber and Sandor Fejos, members of the [Metascience Lab](https://metasciencelab.elte.hu/) at Eötvös Loránd University.

## Running the experiment

The study to which the repository belongs included two experiments. Both of the experimental codes, the styling elements and the trial randomizations are accessible in the current repository. 

Randomization: `trial_randomization.py`, `trial_randomization_words.py`
Experimental codes: `ROK_CSE.js`, `ROK_CSE_words.js`
Style elements: `styles.css`
Stimuli: `arrow1.png`; `le.png`, `fel.png`, `jobb.png`, `bal.png`, `UP.png`, `DOWN.png`, `RIGHT.png`, `LEFT.png`

The required plugins are included in the repository: `jspsych/dist/`, which includes `jspsych.js`, `jspsych.css`, `plugin-rok.js`.

**Python 3** is also required for genreating randomized trial sequences and to host a server locally.

If you wish to download the repository, please switch to branch **master**, because that contains the up-to-date version of the project. 

## Running the experiment locally

1.  Download this [repository](https://github.com/fejossandor/ROK_CSE.git) as a `.zip` file.
2.  Unzip it to your desired location.
3.  Go to the the folder in which the repository was unzipped.
4.  Open your shell of preference in the local folder (e.g. PowerShell, Bash, Zsh) and 
    launch a local server (e.g. by running the command `python -m http.server 8000`).
5.  Open Firefox or Chrome and go to the URL of your local server (e.g. `localhost:8000/`).
6.  Open the desired experiment:    - Experiment 1: <http://localhost:8000/ROK_CSE.html>
                                    - Experiment 2: <http://localhost:8000/ROK_CSE_WORDS.html>
7.  After the experiment ends, it will save data locally in a `.csv` file.




## Running the experiment on a webserver

1.  [Download and setup JATOS](https://www.jatos.org/Installation.html) to remote server or personal computer.
2.  Download the [experimental code](https://github.com/fejossandor/ROK_CSE.git).
3.  Run JATOS and import experiment by choosing `ROK_CSE.jzip` or `ROK_CSE_words.jzip` in the upload window.
4.  Run the experiment by pressing `play`.


## Language

Both of the experiments are available in English or in Hungarian. You have the option to choose when you launch the experiment 


## Debugging

Typing `?debug=1` to the URL of the server (e.g. <http://localhost:8000/ROK_CSE.html?debug=1>) sets every stimulus duration to 1ms and marks the practice criterion as passed. This enables you to check the whole flow under a minute.


## About the tasks

Therer were two main aims of the study to which the following experiments belong:
        1. to investigate whether the Random-Object-Kinematogram (Strittmatter et al., 2022) is suitable for measuring sequential cognitive conflict adaptation when utilized in confound-minimized designs (Weissman et al., 2014) 
        2. to carry out an analysis that may serve as an arbitrator between existing theoretical frameworks concerning cognitive control

Both of the featured experiments include the presentation of a certain number of objects on the display in random positions. The movement direction and the orientation of the presented objects vary. Most of the objects are moving in the same direction (coherent direction) and all of them are oriented in the same direction. 
The trials can be sorted to two conditions: 
                1. **Congruent**: when the coherent movement direction of the objects correspond to their orientation direction.
                2. **Incongruent**: when the coherent movement direction of the objects does not correspond to the direction of their orientation.

There are four possible orientations and movement directions: left, right, up and down. Concerning the movement direction, the trials alternate between horizontal and vertical trials. The task in both experiments is to give the appropriate keyboard response as quickly as possible for the movement direction of the presented objects. On a QWERTZ keyboard, the "A" key indicates "LEFT", "K" indicates "RIGHT", "N" indicates "DOWN" and "E" indicates "UP".

Both experiments start with a practice block consisting of 16 trials, during which feedback is provided if the given response is incorrect, or a response is not given in time. If the success rate reaches the minimum threshold (13 out of 16 correct responses) on the practice trials, you can progress onto the 8 experimental blocks. 

If you wish to disable the practice blocks; enter debug mode or modify the `practicePassed` in both experimental codes to `TRUE`.


## Randomization

`trial_randomization.py` and `trial_randomization_words.py` create the randomized trial sequences. Each generated trial sequence contains eight blocks, and each block a list of 65 trials.

A trial is described by three criteria only: the number of the `block`, the `condition`, and the `id` of the trial within the block. The direction of movement, orientation of the objects, and the correct response are determined in the experimental code. 

## Experimental codes

The two experimental scripts share the same structure and differ only in the objects that are presented: `ROK_CSE.js` moves copies of a single arrow image, whereas `ROK_CSE_words.js` moves direction words, in Hungarian or in English depending on the language chosen by the participant.



1. `loadExperiment()` loads the chosen trial-list file, and the experimental blocks are handed over to the timeline in the order in which they were generated.  
2. `startExperiment()` then assembles the whole timeline and starts it with `jsPsych.run()`.

3. The timeline begins with preloading the images, followed by the language selection (the choice sets a `language` variable, and every trial later returns Hungarian or English text according to it). Afterwards, the introductory stage of the experiments are included, featuring the welcome trial, instructions screens etc.

4. One trial consists of two timeline elements. The fixation trial displays a cross for 500 ms and then a blank screen, occupying 650 ms altogether, and accepts no responses. The ROK trial follows, presenting the moving objects for a maximum of 1500 ms; the trial ends as soon as one of the four response keys (`a`, `e`, `n`, `k`) is pressed.

    **The ROK trial:** The objects are 40 images, of a size of 7% of the aperture width, moving at 9% of the aperture width per second, with 60% of them moving in the coherent direction and the remaining 40% in random directions. The condition label of the trial determines the coherent direction of movement, the coherent orientation of the objects, and the correct key. Congruency is implemented through the `coherence_orientation`: on congruent trials all objects are oriented in the direction of movement, whereas on incongruent trials all of them are oriented in the opposite direction. In `ROK_CSE_words.js`, the orientation is interpreted by the direction that the word indicates, therefore `coherence_orientation` is always set to 100. 


5. **Data** Only those rows are kept in the output which are marked for collection:
        - the responses of interest and the questionnaire items
        - variables recorded by the ROK plugin: the response key, the reaction time, the correct key, the coherent direction of movement and the coherent orientation
        - congruency of the trial
        - whether the response was correct
        - identifier of the trial within the block

For detailed information about the design, please visit the [preregistration](https://osf.io/qv523/overview) of the project on OSF.
