var jsPsychRok = (function (jspsych) {
  'use strict';

  var version = "2.0.0";

  const info = {
    name: "rok",
    version,
    parameters: {
      /** The valid keys that the participant can press to indicate a response. */
      choices: {
        type: jspsych.ParameterType.KEYS,
        pretty_name: "Choices",
        default: "ALL_KEYS"
      },
      /** The correct keys for that trial. */
      correct_choice: {
        type: jspsych.ParameterType.KEYS,
        pretty_name: "Correct choice",
        default: void 0
      },
      /** The length of stimulus presentation. Zero for endless loop. */
      trial_duration: {
        type: jspsych.ParameterType.INT,
        pretty_name: "Trial duration",
        default: 0
      },
      /** If true, then any valid key will end the trial. */
      response_ends_trial: {
        type: jspsych.ParameterType.BOOL,
        pretty_name: "Response ends trial",
        default: true
      },
      /** The number of oriented objects per set in the stimulus. */
      number_of_oobs: {
        type: jspsych.ParameterType.INT,
        pretty_name: "Number of oriented objectes",
        default: 300
      },
      /** The direction of coherent motion in degrees (0 degree meaning right). */
      coherent_movement_direction: {
        type: jspsych.ParameterType.INT,
        pretty_name: "Coherent movement direction",
        default: 0
      },
      /** The orientation of the objects in degree (0 degree meaning right). */
      coherent_orientation: {
        type: jspsych.ParameterType.INT,
        pretty_name: "Coherent object orientation",
        default: 0
      },
      /** The percentage of oriented objects moving in the coherent direction. */
      coherence_movement: {
        type: jspsych.ParameterType.INT,
        pretty_name: "Movement coherence",
        default: 50
      },
      /** The percentage of objects that are oriented in the coherent orientation. */
      coherence_orientation: {
        type: jspsych.ParameterType.INT,
        pretty_name: "Orientation coherence",
        default: 50
      },
      /** The percentage of oriented objects moving in the direction opposite of the coherent direction. */
      coherence_movement_opposite: {
        type: jspsych.ParameterType.INT,
        pretty_name: "Opposite movement coherence",
        default: 0
      },
      /** The percentage of objects that are oriented opposite of the coherent orientation. */
      coherence_orientation_opposite: {
        type: jspsych.ParameterType.INT,
        pretty_name: "Opposite orientation coherence",
        default: 0
      },
      /** The movement speed of the oobs in (percentage of aperature_width)/second. */
      movement_speed: {
        type: jspsych.ParameterType.INT,
        pretty_name: "Movement Speed",
        default: 10
      },
      /** The percentage of randomisation in movement speed:
       * 0 meaning all orientated objects move with speed defined in movement_speed,
       * 100 meaning movement speeds from 0 to 2x movement_speed. */
      movement_speed_randomisation: {
        type: jspsych.ParameterType.INT,
        pretty_name: "Movement speed randomisation",
        default: 0
      },
      /** The size of the orientated objects in percentage of aperture_width. */
      oob_size: {
        type: jspsych.ParameterType.INT,
        pretty_name: "Object size",
        default: 2
      },
      /** The width of the aperture in pixels. */
      aperture_width: {
        type: jspsych.ParameterType.INT,
        pretty_name: "Aperture width",
        default: 600
      },
      /** The height of the aperture in pixels. */
      aperture_height: {
        type: jspsych.ParameterType.INT,
        pretty_name: "Aperture height",
        default: 400
      },
      /** The color of the dots. */
      oob_color: {
        type: jspsych.ParameterType.STRING,
        pretty_name: "Dot color",
        default: "white"
      },
      /** The background color of the stimulus. */
      background_color: {
        type: jspsych.ParameterType.STRING,
        pretty_name: "Background color",
        default: "gray"
      },
      /** The presence of a border around the aperture. */
      border: {
        type: jspsych.ParameterType.BOOL,
        pretty_name: "Border",
        default: false
      },
      /** The thickness of the border in pixels. */
      border_thickness: {
        type: jspsych.ParameterType.INT,
        pretty_name: "Border width",
        default: 1
      },
      /** The color of the border. */
      border_color: {
        type: jspsych.ParameterType.STRING,
        pretty_name: "Border Color",
        default: 1
      },
      /** Apperance of stimulus (0-triangles, 1-circle, 2-square, 3-origami_birds, 4-image). */
      stimulus_type: {
        type: jspsych.ParameterType.INT,
        pretty_name: "Stimulus type",
        default: 0
      },
      /** Shade of aperture (0 - rectangular, 1 - elliptic). */
      aperture_shape: {
        type: jspsych.ParameterType.INT,
        pretty_name: "aperture shape",
        default: 0
      },
      /** Background color of aperture */
      aperture_background_color: {
        type: jspsych.ParameterType.STRING,
        pretty_name: "Background of aperture",
        default: "#0000"
      },
      /** Type of random movement (0 direction is random but fixed, 1 movement direction of incoherent oobs changes over time). */
      random_movement_type: {
        type: jspsych.ParameterType.INT,
        pretty_name: "Random movement type",
        default: 0
      },
      /** Type of random movement (0 - orientation is random but fixed, 1 - orientation of incoherent oobs changes over time). */
      random_orientation_type: {
        type: jspsych.ParameterType.INT,
        pretty_name: "Random orientation type",
        default: 0
      },
      /** Number of apertures. If greater then one, other parameters of trial should be arrays. */
      number_of_apertures: {
        type: jspsych.ParameterType.INT,
        pretty_name: "Number of apertures",
        default: 1
      },
      /** If this parameter is set, number_of_objects is interpreted as average number_of_objects per density_unit_area (in pixels). */
      density_unit_area: {
        type: jspsych.ParameterType.INT,
        pretty_name: "Density area",
        default: null
      },
      /** Position of midpoint of aperture in x direction in percentage of window width (50 being middle). */
      aperture_position_left: {
        type: jspsych.ParameterType.INT,
        pretty_name: "Horizontal position of aperature",
        default: 50
      },
      /** Position of midpoint of aperture in y direction in percentage of window width (0 being top, 50 being middle, 100 being bot). */
      aperture_position_top: {
        type: jspsych.ParameterType.INT,
        pretty_name: "Vertical position of aperature",
        default: 50
      },
      /** Prompt that is presented above the stimulus. */
      prompt: {
        type: jspsych.ParameterType.STRING,
        pretty_name: "Prompt",
        default: null
      },
      /** Fade the oobs on the edges of the aperture. */
      fade_out: {
        type: jspsych.ParameterType.INT,
        pretty_name: "Fade out on edges",
        default: 0
      },
      /** Pictures of stimuli, can be key-framed(animated) or randomised, see documentation. */
      stimulus_image: {
        type: jspsych.ParameterType.IMAGE,
        pretty_name: "Stimuli pictures",
        default: null
      },
      /** Background image, can be key-framed(animated) or randomised, see documentation. */
      background_image: {
        type: jspsych.ParameterType.IMAGE,
        pretty_name: "Background image",
        default: null
      },
      /** Number of keyframes in stimulus images. */
      stimulus_image_keyframes: {
        type: jspsych.ParameterType.INT,
        pretty_name: "Keyframes of stimulus pictures",
        default: 1
      },
      /** Number of keyframes in background pictures. */
      background_image_keyframes: {
        type: jspsych.ParameterType.INT,
        pretty_name: "Keframse of background pictures",
        default: 1
      },
      /** Time between keyframes. */
      stimulus_keyframe_time: {
        type: jspsych.ParameterType.FLOAT,
        pretty_name: "Keyframe time",
        default: 0.1
      },
      /** Mirror image instead of rotating (1 - x axis, 2 - y axis). */
      stimulus_mirror: {
        type: jspsych.ParameterType.INT,
        pretty_name: "Mirror image time",
        default: 0
      },
      /** Sets experiment to congruency mode: experiment_main_task has to be  set (0 = movement or 1 = orientation) if this is set to 1 or 2. The" +
           "congruency of the task does only apply to coherent oobs of main task. If this is set to 1 the remaining oobs secondary feature (the non task feature) is set at random." +
           "If this is set to 2 the remaining oobs have the same direction and orientation .*/
      experiment_congruency_mode: {
        type: jspsych.ParameterType.INT,
        pretty_name: "Experiment congruency mode",
        default: 0
      },
      /** Sets the main task when experiment is in congruency mode. The congruency of the other task then only" +
           "applies to non random oobs of main task. */
      experiment_main_task: {
        type: jspsych.ParameterType.INT,
        pretty_name: "Main task when experiment is set to congruency mode (0- movement, 1-orientation)",
        default: 0
      },
      /** Units in which size and speed of oobs is expressed (null - percentage of aperture width, px - pixels). */
      units: {
        type: jspsych.ParameterType.STRING,
        pretty_name: "Units in which size and speed of oobs is expressed",
        default: null
      },
      /** Should stimuli be drawn on top of each other or intermixed **/
      aperture_draw_mode: {
        type: jspsych.ParameterType.STRING,
        pretty_name: "When in overlay draws stimuli of different apertures on top of each other. When in intermixed oobs all show up in one aperture intermixed",
        default: "overlay"
      }
    },
    data: {
      /** The time in milliseconds for the participant to make a response. The time is measured from when the stimulus first
       * began playing until the participant's response.
       */
      rt: {
        type: jspsych.ParameterType.INT
      },
      /** The key that the participant pressed. */
      key_press: {
        type: jspsych.ParameterType.KEY
      },
      /** If the participant's response was correct or not. */
      correct: {
        type: jspsych.ParameterType.BOOL
      },
      /** An array containing the valid choices. */
      choices: {
        type: jspsych.ParameterType.STRING,
        array: true
      },
      /** The correct choice */
      correct_choice: {
        type: jspsych.ParameterType.STRING,
        array: true
      },
      /** The trial duration in ms. */
      trial_duration: {
        type: jspsych.ParameterType.INT
      },
      /** If the response ends the trial. */
      response_ends_trial: {
        type: jspsych.ParameterType.BOOL
      },
      /** The number of oobs displayed for the trial. */
      number_of_oobs: {
        type: jspsych.ParameterType.INT
      },
      /** The direction of coherent motion in degrees (0 degree meaning right) */
      coherent_movement_direction: {
        type: jspsych.ParameterType.INT
      },
      /** The percentage of oriented objects moving in the coherent direction. */
      coherence_movement: {
        type: jspsych.ParameterType.INT
      },
      /** The percentage of oriented objects moving in the direction opposite of the coherent direction. */
      opposite_coherence_movement: {
        type: jspsych.ParameterType.INT
      },
      /** The percentage of oriented objects moving in the coherent direction */
      coherent_orientation: {
        type: jspsych.ParameterType.INT
      },
      /** The percentage of objects that are oriented in the coherent orientation */
      coherence_orientation: {
        type: jspsych.ParameterType.INT
      },
      /** The percentage of objects that are oriented opposite of the coherent orientation */
      opposite_coherence_orientation: {
        type: jspsych.ParameterType.INT
      },
      /** The movement speed of the oobs in (percentage of aperature_width)/second */
      movement_speed: {
        type: jspsych.ParameterType.INT
      },
      /** The size of the orientated objects in percentage of aperture_width */
      oob_size: {
        type: jspsych.ParameterType.INT
      },
      /** The color of the objects displayed */
      oob_color: {
        type: jspsych.ParameterType.STRING
      },
      /** The percentage of randomisation in movement speed:
       * 0 meaning all orientated objects move with speed defined in movement_speed,
       * 100 meaning movement speeds from 0 to 2x movement_speed. */
      movement_speed_randomisation: {
        type: jspsych.ParameterType.INT
      },
      /** Position of midpoint of aperture in x direction in percentage of window width (50 being middle). */
      aperture_width: {
        type: jspsych.ParameterType.INT
      },
      /** Position of midpoint of aperture in x direction in percentage of window width (50 being middle). */
      aperture_height: {
        type: jspsych.ParameterType.INT
      },
      /** The background color of the stimulus. */
      background_color: {
        type: jspsych.ParameterType.STRING
      },
      /** The background color of the aperture. */
      aperture_background_color: {
        type: jspsych.ParameterType.STRING
      },
      /** The average frame rate for the trial. */
      frame_rate: {
        type: jspsych.ParameterType.INT
      },
      /** The array of ms per frame in this trial. */
      frame_rate_array: {
        type: jspsych.ParameterType.INT,
        array: true
      },
      /** The number of frames in this trial. */
      number_of_frames: {
        type: jspsych.ParameterType.INT
      },
      /** Apperance of stimulus (0-triangles, 1-circle, 2-square, 3-origami_birds, 4-image). */
      stimulus_type: {
        type: jspsych.ParameterType.INT
      },
      /** Shade of aperture (0 - rectangular, 1 - elliptic). */
      aperture_shape: {
        type: jspsych.ParameterType.INT
      },
      /** Type of random movement (0 direction is random but fixed, 1 movement direction of incoherent oobs changes over time). */
      random_movement_type: {
        type: jspsych.ParameterType.INT
      },
      /** Type of random movement (0 - orientation is random but fixed, 1 - orientation of incoherent oobs changes over time). */
      random_orientation_type: {
        type: jspsych.ParameterType.INT
      },
      /** Number of apertures. If greater then one, other parameters of trial should be arrays. */
      number_of_apertures: {
        type: jspsych.ParameterType.INT
      },
      /** If this parameter is set, number_of_objects is interpreted as average number_of_objects per density_unit_area (in pixels). */
      density_unit_area: {
        type: jspsych.ParameterType.INT
      },
      /** Prompt that is presented above the stimulus. */
      prompt: {
        type: jspsych.ParameterType.STRING
      },
      /** Position of midpoint of aperture in x direction in percentage of window width (50 being middle). */
      aperture_position_left: {
        type: jspsych.ParameterType.INT
      },
      /** Position of midpoint of aperture in y direction in percentage of window width (0 being top, 50 being middle, 100 being bot). */
      aperture_position_top: {
        type: jspsych.ParameterType.INT
      },
      /** Should stimuli be drawn on top of each other ("overlay") or intermixed ("intermixed"). **/
      aperture_mode: {
        type: jspsych.ParameterType.STRING
      }
    },
    // prettier-ignore
    citations: {
      "apa": "Strittmatter, Y., Spitzer, M. W. H., & Kiesel, A. (2022). A Random-Dot Kinematogram for Web-Based Vision Research. Behavior Research Methods, 55, 883. https://doi.org/10.3758/s13428-021-01767-3 ",
      "bibtex": "@article{Strittmatter2022Random, 	author = {Strittmatter, Younes and Spitzer, Markus W. H. and Kiesel, Andrea}, 	journal = {Behavior Research Methods}, 	doi = {10.3758/s13428-021-01767-3}, 	issn = {1554-3528}, 	year = {2022}, 	month = {may 3}, 	pages = {883}, 	publisher = {Springer}, 	title = {A {Random}-{Dot} {Kinematogram} for {Web}-{Based} {Vision} {Research}}, 	url = {https://link.springer.com/article/10.3758/s13428-021-01767-3}, 	volume = {55}, }  "
    }
  };
  class RokPlugin {
    constructor(jsPsych) {
      this.jsPsych = jsPsych;
    }
    static {
      this.info = info;
    }
    trial(display_element, trial) {
      var choices = assignParameterValue(trial.choices, []);
      var correct_choice = assignParameterValue(trial.correct_choice, void 0);
      var trial_duration = assignParameterValue(trial.trial_duration, 0);
      var response_ends_trial = assignParameterValue(trial.response_ends_trial, true);
      var number_of_oobs = assignParameterValue(trial.number_of_oobs, 300);
      var coherent_movement_direction = assignParameterValue(trial.coherent_movement_direction, 0);
      var coherent_orientation = assignParameterValue(trial.coherent_orientation, 0);
      var coherence_movement = assignParameterValue(trial.coherence_movement, 50);
      var coherence_orientation = assignParameterValue(trial.coherence_orientation, 50);
      var coherence_movement_opposite = assignParameterValue(trial.coherence_movement_opposite, 50);
      var coherence_orientation_opposite = assignParameterValue(
        trial.coherence_orientation_opposite,
        50
      );
      var movement_speed = assignParameterValue(trial.movement_speed, 10);
      var movement_speed_randomisation = assignParameterValue(trial.movement_speed_randomisation, 0);
      var oob_size = assignParameterValue(trial.oob_size, 2);
      var aperture_width = assignParameterValue(trial.aperture_width, 600);
      var aperture_height = assignParameterValue(trial.aperture_height, 400);
      var oob_color = assignParameterValue(trial.oob_color, "white");
      var background_color = assignParameterValue(trial.background_color, "gray");
      var aperture_background_color = assignParameterValue(trial.aperture_background_color, "#0000");
      assignParameterValue(trial.border, false);
      assignParameterValue(trial.border_thickness, 1);
      assignParameterValue(trial.border_color, "white");
      var stimulus_type = assignParameterValue(trial.stimulus_type, 0);
      var aperture_shape = assignParameterValue(trial.aperture_shape, 0);
      var random_movement_type = assignParameterValue(trial.random_movement_type, 0);
      var random_orientation_type = assignParameterValue(trial.random_orientation_type, 0);
      var number_of_apertures = assignParameterValue(trial.number_of_apertures, 1);
      var density_unit_area = assignParameterValue(trial.density_unit_area, null);
      var aperture_position_left = assignParameterValue(trial.aperture_position_left, 50);
      var aperture_position_top = assignParameterValue(trial.aperture_position_top, 50);
      var prompt = assignParameterValue(trial.prompt, null);
      var fade_out = assignParameterValue(trial.fade_out, 0);
      var stimulus_image = assignParameterValue(trial.stimulus_image, null);
      var background_image = assignParameterValue(trial.background_image, null);
      var stimulus_image_keyframes = assignParameterValue(trial.stimulus_image_keyframes, 1);
      assignParameterValue(trial.background_image_keyframes, 1);
      var stimulus_keyframe_time = assignParameterValue(trial.stimulus_keyframe_time, 0.1);
      var stimulus_mirror = assignParameterValue(trial.stimulus_mirror, 0);
      var experiment_congruency_mode = assignParameterValue(trial.experiment_congruency_mode, 0);
      var experiment_main_task = assignParameterValue(trial.experiment_main_task, 0);
      var units = assignParameterValue(trial.units, null);
      var aperture_mode = assignParameterValue(trial.aperture_draw_mode, "overlay");
      let nApertures = number_of_apertures;
      let nAperturesTmp = nApertures;
      if (aperture_mode !== "overlay") {
        nApertures = 1;
      }
      var canvasArray = [];
      var containerArray = [];
      if (nApertures > 1) {
        for (let i = 0; i < nApertures; i++) {
          containerArray.push(document.createElement("div"));
          canvasArray.push(document.createElement("canvas"));
        }
      } else {
        containerArray.push(document.createElement("div"));
        canvasArray.push(document.createElement("canvas"));
      }
      for (let i = 0; i < nApertures; i++) {
        let imgPath = getValueFromArrayOrNot(background_image, i);
        if (imgPath != null) {
          containerArray[i].style.backgroundImage = "url(" + getValueFromArrayOrNot(background_image, i) + ")";
          containerArray[i].style.backgroundRepeat = "no-repeat";
          containerArray[i].style.backgroundSize = "cover";
        }
        display_element.appendChild(containerArray[i]);
        containerArray[i].appendChild(canvasArray[i]);
        if (Array.isArray(prompt)) {
          let p = document.createElement("div");
          p.style.margin = "0";
          p.style.padding = "0";
          containerArray[i].appendChild(p);
          p.style.textAlign = "center";
          p.innerHTML = prompt[i];
          p.style.position = "absolute";
          p.style.transform = "translate(-50%, 100%)";
          p.style.textAlign = "center";
          p.style.top = 10 + getValueFromArrayOrNot(aperture_height, 0) / 2 + "px";
          p.style.width = getValueFromArrayOrNot(aperture_width, 0) + "px";
        }
      }
      if (prompt != null && !Array.isArray(prompt)) {
        let p = document.createElement("div");
        p.style.margin = "0";
        p.style.padding = "0";
        containerArray[0].appendChild(p);
        p.style.textAlign = "center";
        p.innerHTML = prompt;
        p.style.position = "absolute";
        p.style.transform = "translate(-50%, 100%)";
        p.style.textAlign = "center";
        p.style.top = 10 + getValueFromArrayOrNot(aperture_height, 0) / 2 + "px";
        p.style.width = getValueFromArrayOrNot(aperture_width, 0) + "px";
      }
      let body = document.getElementsByClassName("jspsych-display-element")[0];
      let originalMargin = body.style.margin;
      let originalPadding = body.style.padding;
      let originalBackgroundColor = body.style.backgroundColor;
      body.style.margin = "0";
      body.style.padding = "0";
      for (let i = 0; i < nApertures; i++) {
        containerArray[i].style.margin = "0px";
        containerArray[i].style.margin = "0px";
        canvasArray[i].style.margin = "0px";
        canvasArray[i].style.padding = "0px";
        canvasArray[i].style.position = "absolute";
        canvasArray[i].style.transform = "translate(-50%, -50%)";
      }
      body.style.backgroundColor = background_color;
      let ctxArray = [];
      for (let i = 0; i < nApertures; i++) {
        ctxArray.push(canvasArray[i].getContext("2d"));
      }
      const disp_size = body.getBoundingClientRect();
      for (let i = 0; i < nApertures; i++) {
        canvasArray[i].width = getValueFromArrayOrNot(aperture_width, i);
        canvasArray[i].height = getValueFromArrayOrNot(aperture_height, i);
        canvasArray[i].style.backgroundColor = getValueFromArrayOrNot(aperture_background_color, i);
        containerArray[i].style.position = "absolute";
        if (Array.isArray(aperture_position_left) && Array.isArray(aperture_position_top)) {
          let top = Math.round(aperture_position_top[i] * disp_size.height / 100);
          containerArray[i].style.top = top.toString() + "px";
          containerArray[i].style.left = aperture_position_left[i].toString() + "%";
        } else {
          if (nApertures > 1) {
            let x;
            if (nApertures % 2 == 0) {
              x = i * (100 / nApertures) + 100 / (2 * nApertures);
            } else {
              x = i * (100 / (nApertures + 1)) + 100 / (2 * (nApertures - 1));
            }
            let top = Math.round(aperture_position_top * disp_size.height / 100);
            containerArray[i].style.top = top.toString() + "px";
            containerArray[i].style.left = x.toString() + "%";
          } else {
            let top = Math.round(aperture_position_top * disp_size.height / 100);
            containerArray[i].style.top = top.toString() + "px";
            containerArray[i].style.left = aperture_position_left.toString() + "%";
          }
        }
      }
      let stopOobMotion = false;
      let timerHasStarted = false;
      let response = {
        rt: -1,
        key: ""
      };
      let timeoutID;
      let keyboardListener;
      var frameRate = [];
      let numberOfFrames = 0;
      let img = [];
      if (stimulus_image != null) {
        let imgSrc = stimulus_image;
        if (!Array.isArray(imgSrc)) {
          let i = document.createElement("img");
          i.src = imgSrc;
          img.push(i);
        } else {
          for (let j = 0; j < imgSrc.length; j++) {
            let iS = imgSrc[j];
            if (!Array.isArray(iS)) {
              let i = document.createElement("img");
              i.src = iS;
              img.push(i);
            } else {
              let i = [];
              for (let k = 0; k < iS[j].length; k++) {
                let p = document.createElement("img");
                p.src = iS[k];
                i.push(p);
              }
              img.push(i);
            }
          }
        }
      }
      let oobs = [];
      for (let i = 0; i < nAperturesTmp; i++) {
        let nOob = getValueFromArrayOrNot(number_of_oobs, i);
        if (density_unit_area != null) {
          let width = getValueFromArrayOrNot(aperture_width, i);
          let height = getValueFromArrayOrNot(aperture_height, i);
          let area = width * height;
          nOob = nOob * area / density_unit_area;
        }
        let tmpCoherenceMovement = getValueFromArrayOrNot(coherence_movement, i);
        let tmpOppositeCoherenceMovement = getValueFromArrayOrNot(coherence_movement_opposite, i);
        let tmpCoherenceOrientation = getValueFromArrayOrNot(coherence_orientation, i);
        let tmpOppositeCoherenceOrientation = getValueFromArrayOrNot(
          coherence_orientation_opposite,
          i
        );
        let experimentMode = getValueFromArrayOrNot(experiment_congruency_mode, i);
        let mainTask = getValueFromArrayOrNot(experiment_main_task, i);
        let tmpOrientation = [];
        let tmpMovementDirection = [];
        if (experimentMode === 0) {
          let [nCoherentMovement, nCoherentOppositeMovement, nIncoherentMovement] = getNumbers(
            tmpCoherenceMovement,
            tmpOppositeCoherenceMovement,
            nOob
          );
          let [nCoherentOrientation, nCoherentOppositeOrientation, nIncoherentOrientation] = getNumbers(tmpCoherenceOrientation, tmpOppositeCoherenceOrientation, nOob);
          for (let j = 0; j < nCoherentMovement; j++) {
            tmpMovementDirection.push(1);
          }
          for (let j = 0; j < nCoherentOppositeMovement; j++) {
            tmpMovementDirection.push(-1);
          }
          for (let j = 0; j < nIncoherentMovement; j++) {
            tmpMovementDirection.push(0);
          }
          for (let j = 0; j < nCoherentOrientation; j++) {
            tmpOrientation.push(1);
          }
          for (let j = 0; j < nCoherentOppositeOrientation; j++) {
            tmpOrientation.push(-1);
          }
          for (let j = 0; j < nIncoherentOrientation; j++) {
            tmpOrientation.push(0);
          }
          tmpOrientation = shuffleArray(tmpOrientation);
          tmpMovementDirection = shuffleArray(tmpMovementDirection);
        } else if (mainTask === 0) {
          let [nCoherentMovement, nCoherentOppositeMovement, nIncoherentMovement] = getNumbers(
            tmpCoherenceMovement,
            tmpOppositeCoherenceMovement,
            nOob
          );
          let nCoherentOrientation = Math.floor(tmpCoherenceOrientation / 100 * nCoherentMovement);
          let nCoherentOppositeOrientation = Math.floor(
            tmpOppositeCoherenceOrientation / 100 * nCoherentMovement
          );
          if (tmpCoherenceOrientation + tmpOppositeCoherenceOrientation === 100) {
            nCoherentOppositeOrientation = nCoherentMovement - nCoherentOrientation;
          }
          for (let j = 0; j < nCoherentMovement; j++) {
            tmpMovementDirection.push(1);
          }
          for (let j = 0; j < nCoherentOppositeMovement; j++) {
            tmpMovementDirection.push(-1);
          }
          for (let j = 0; j < nIncoherentMovement; j++) {
            tmpMovementDirection.push(0);
          }
          for (let j = 0; j < nCoherentOrientation; j++) {
            tmpOrientation.push(1);
          }
          for (let j = 0; j < nCoherentOppositeOrientation; j++) {
            tmpOrientation.push(-1);
          }
          for (let j = 0; j < nOob - (nCoherentOrientation + nCoherentOppositeOrientation); j++) {
            tmpOrientation.push(0);
          }
        } else if (mainTask === 1) {
          let [nCoherentOrientation, nCoherentOppositeOrientation, nIncoherentOrientation] = getNumbers(tmpCoherenceOrientation, tmpOppositeCoherenceOrientation, nOob);
          let nCoherentMovement = Math.floor(tmpCoherenceMovement / 100 * nCoherentOrientation);
          let nCoherentOppositeMovement = Math.floor(
            tmpOppositeCoherenceMovement / 100 * nCoherentOrientation
          );
          if (tmpCoherenceMovement + tmpOppositeCoherenceMovement === 100) {
            nCoherentOppositeMovement = nCoherentOrientation - nCoherentMovement;
          }
          for (let j = 0; j < nCoherentOrientation; j++) {
            tmpOrientation.push(1);
          }
          for (let j = 0; j < nCoherentOppositeOrientation; j++) {
            tmpOrientation.push(-1);
          }
          for (let j = 0; j < nIncoherentOrientation; j++) {
            tmpOrientation.push(0);
          }
          for (let j = 0; j < nCoherentMovement; j++) {
            tmpMovementDirection.push(1);
          }
          for (let j = 0; j < nCoherentOppositeMovement; j++) {
            tmpMovementDirection.push(-1);
          }
          if (experimentMode === 1) {
            for (let j = 0; j < nOob - (nCoherentMovement + nCoherentOppositeMovement); j++) {
              tmpMovementDirection.push(0);
            }
          } else {
            for (let j = 0; j < nOob - (nCoherentMovement + nCoherentOppositeMovement); j++) {
              tmpOrientation.push(tmpOrientation[j + nCoherentMovement + nCoherentOppositeMovement]);
            }
          }
        }
        let oobColor = getValueFromArrayOrNot(oob_color, i);
        let stimulusType = getValueFromArrayOrNot(stimulus_type, i);
        if (stimulusType === 3) {
          oobColor = standardColor(oobColor);
        }
        let apertureType = getValueFromArrayOrNot(aperture_shape, i);
        let speed = getValueFromArrayOrNot(movement_speed, i);
        let speedRandomisation = getValueFromArrayOrNot(movement_speed_randomisation, i);
        let size = getValueFromArrayOrNot(oob_size, i);
        let isFade = getValueFromArrayOrNot(fade_out, i);
        for (let j = 0; j < nOob; j++) {
          let randomWalk = 0;
          let randomOrient = 0;
          let orientation = getValueFromArrayOrNot(coherent_orientation, i);
          if (tmpOrientation[j] === -1) {
            orientation += 180;
          } else if (tmpOrientation[j] === 0) {
            orientation = Math.floor(Math.random() * 360);
            randomOrient = getValueFromArrayOrNot(random_orientation_type, i);
          }
          let movementDirection = getValueFromArrayOrNot(coherent_movement_direction, i);
          if (tmpMovementDirection[j] === -1) {
            movementDirection += 180;
          } else if (tmpMovementDirection[j] === 0) {
            movementDirection = Math.floor(Math.random() * 360);
            randomWalk = getValueFromArrayOrNot(random_movement_type, i);
          }
          if (experimentMode === 2 && mainTask === 0 && tmpOrientation[j] === 0 && tmpMovementDirection[j] != 1) {
            orientation = movementDirection;
          } else if (experimentMode === 2 && mainTask === 1 && tmpMovementDirection[j] === 0 && tmpOrientation[j] != 1) {
            movementDirection = orientation;
          }
          let oob;
          let ctx = ctxArray[i];
          let cvs = canvasArray[i];
          if (aperture_mode !== "overlay") {
            ctx = ctxArray[0];
            cvs = canvasArray[0];
          }
          if (stimulusType === 0) {
            oob = new Oob(
              size,
              oobColor,
              orientation,
              movementDirection,
              speed,
              speedRandomisation,
              apertureType,
              randomWalk,
              randomOrient,
              isFade,
              cvs,
              ctx,
              units
            );
          } else if (stimulusType === 1) {
            oob = new OobCircle(
              size,
              oobColor,
              orientation,
              movementDirection,
              speed,
              speedRandomisation,
              apertureType,
              randomWalk,
              randomOrient,
              isFade,
              cvs,
              ctx,
              units
            );
          } else if (stimulusType === 2) {
            oob = new OobSquare(
              size,
              oobColor,
              orientation,
              movementDirection,
              speed,
              speedRandomisation,
              apertureType,
              randomWalk,
              randomOrient,
              isFade,
              cvs,
              ctx,
              units
            );
          } else if (stimulusType === 3) {
            oob = new OobBird(
              size,
              oobColor,
              orientation,
              movementDirection,
              speed,
              speedRandomisation,
              apertureType,
              randomWalk,
              randomOrient,
              isFade,
              cvs,
              ctx,
              units
            );
          } else if (stimulusType === 4) {
            let imageArray, keyframes, keyframeTime, mirrorType;
            if (nAperturesTmp === 1) {
              imageArray = img;
              keyframes = stimulus_image_keyframes;
              keyframeTime = stimulus_keyframe_time;
              mirrorType = stimulus_mirror;
            } else {
              imageArray = getValueFromArrayOrNot(img, i);
              keyframes = getValueFromArrayOrNot(stimulus_image_keyframes, i);
              keyframeTime = getValueFromArrayOrNot(stimulus_keyframe_time, i);
              mirrorType = getValueFromArrayOrNot(stimulus_mirror, i);
            }
            oob = new OobImage(
              size,
              oobColor,
              orientation,
              movementDirection,
              speed,
              speedRandomisation,
              apertureType,
              randomWalk,
              randomOrient,
              isFade,
              imageArray,
              keyframes,
              keyframeTime,
              mirrorType,
              cvs,
              ctx,
              units
            );
          }
          oobs.push(oob);
        }
      }
      oobs = shuffleArray(oobs);
      const startKeyboardListener = () => {
        if (choices != "NO_KEYS") {
          keyboardListener = this.jsPsych.pluginAPI.getKeyboardResponse({
            callback_function: after_response,
            //Function to call once the participant presses a valid key
            valid_responses: choices,
            //The keys that will be considered a valid response and cause the callback function to be called
            rt_method: "performance",
            //The type of method to record timing information.
            persist: false,
            //If set to false, keyboard listener will only trigger the first time a valid key is pressed. If set to true, it has to be explicitly cancelled by the cancelKeyboardResponse plugin API.
            allow_held_key: false
            //Only register the key once, after this getKeyboardResponse function is called. (Check JsPsych docs for better info under 'jsPsych.pluginAPI.getKeyboardResponse').
          });
        }
      };
      const end_trial = () => {
        stopOobMotion = true;
        numberOfFrames = frameRate.length;
        let frameRateArray = frameRate;
        if (numberOfFrames > 0) {
          frameRate = frameRate.reduce((total, current) => total + current) / numberOfFrames;
        } else {
          frameRate = 0;
        }
        if (typeof keyboardListener !== "undefined") {
          this.jsPsych.pluginAPI.cancelKeyboardResponse(keyboardListener);
        }
        let trial_data = {
          rt: response.rt,
          //The response time
          key_press: response.key,
          //The key that the participant pressed
          correct: correctOrNot(),
          //If the participant response was correct
          choices,
          //The set of valid keys
          correct_choice,
          //The correct choice
          trial_duration,
          //The trial duration
          response_ends_trial,
          //If the response ends the trial
          number_of_oobs,
          coherent_movement_direction,
          coherence_movement,
          opposite_coherence_movement: coherence_movement_opposite,
          coherent_orientation,
          coherence_orientation,
          opposite_coherence_orientation: coherence_orientation_opposite,
          movement_speed,
          oob_size,
          oob_color,
          movement_speed_randomisation,
          aperture_width,
          aperture_height,
          background_color,
          aperture_background_color,
          frame_rate: frameRate,
          //The average frame rate for the trial
          frame_rate_array: frameRateArray,
          //The array of ms per frame in this trial, in the form of a JSON string
          number_of_frames: numberOfFrames,
          //The number of frames in this trial
          stimulus_type,
          aperture_shape,
          random_movement_type,
          random_orientation_type,
          number_of_apertures,
          density_unit_area,
          prompt,
          aperture_position_left,
          aperture_position_top,
          aperture_mode
        };
        body.style.margin = originalMargin;
        body.style.padding = originalPadding;
        body.style.backgroundColor = originalBackgroundColor;
        this.jsPsych.finishTrial(trial_data);
      };
      animateDotMotion();
      function after_response(info2) {
        if (response.key == "") {
          response = info2;
        }
        if (response_ends_trial) {
          window.clearTimeout(timeoutID);
          end_trial();
        }
      }
      const correctOrNot = () => {
        if (typeof correct_choice !== "undefined" && correct_choice.constructor === Array) {
          if (typeof correct_choice[0] === "string" || correct_choice[0] instanceof String) {
            var key_in_choices = correct_choice.every((x) => {
              return this.jsPsych.pluginAPI.compareKeys(x, response.key);
            });
            return key_in_choices;
          } else if (typeof correct_choice[0] === "number") {
            console.error(
              "Error in ROK plugin: elements in the correct_choice array must be key characters (strings)."
            );
            return false;
          } else {
            console.error(
              "Error in ROK plugin: elements in the correct_choice array must be key characters (strings)."
            );
            return false;
          }
        } else {
          console.error(
            "Error in ROK plugin: you must specify an array of key characters for the correct_choice parameter."
          );
          return false;
        }
      };
      function update(deltaTime) {
        for (let i = 0; i < oobs.length; i++) {
          oobs[i].update(deltaTime);
        }
      }
      function draw() {
        for (let i = 0; i < canvasArray.length; i++) {
          ctxArray[i].clearRect(0, 0, canvasArray[i].width, canvasArray[i].height);
        }
        for (let i = 0; i < oobs.length; i++) {
          oobs[i].draw();
        }
      }
      function animateDotMotion() {
        let previousTimestamp;
        let dT = 0;
        let frameRequestID = window.requestAnimationFrame(animate);
        startKeyboardListener();
        function animate() {
          if (stopOobMotion) {
            window.cancelAnimationFrame(frameRequestID);
          } else {
            frameRequestID = window.requestAnimationFrame(animate);
            if (!timerHasStarted && trial_duration > 0) {
              timeoutID = window.setTimeout(end_trial, trial_duration);
              timerHasStarted = true;
            }
            update(dT);
            draw();
            if (previousTimestamp === void 0) {
              previousTimestamp = performance.now();
            } else {
              let currentTimeStamp = performance.now();
              if (document.hasFocus()) {
                dT = currentTimeStamp - previousTimestamp;
              } else {
                previousTimestamp = performance.now();
              }
              frameRate.push(Math.round(currentTimeStamp - previousTimestamp));
              previousTimestamp = currentTimeStamp;
            }
          }
        }
      }
      function assignParameterValue(argument, defaultValue) {
        return typeof argument !== "undefined" ? argument : defaultValue;
      }
    }
    // END OF TRIAL
  }
  function getValueFromArrayOrNot(arrayOrNot, l) {
    if (Array.isArray(arrayOrNot)) {
      return arrayOrNot[l];
    }
    return arrayOrNot;
  }
  function standardColor(color) {
    let cvs = document.createElement("canvas");
    cvs.height = 1;
    cvs.width = 1;
    let ctx = cvs.getContext("2d");
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, 1, 1);
    return ctx.getImageData(0, 0, 1, 1).data;
  }
  function brighten(color, value) {
    let col = [0, 0, 0, 255];
    for (let i = 0; i < 3; i++) {
      let tmp = color[i] + value;
      tmp = tmp > 255 ? 255 : tmp;
      tmp = tmp < 0 ? 0 : tmp;
      col[i] = tmp;
    }
    return col;
  }
  function byteToHex(num) {
    return ("0" + num.toString(16)).slice(-2);
  }
  function stdColorToHex(color) {
    let hex;
    hex = [0, 1, 2].map(function(idx) {
      return byteToHex(color[idx]);
    }).join("");
    return "#" + hex;
  }
  function getX(angle) {
    let rad = angle * Math.PI / 180;
    return Math.cos(rad);
  }
  function getY(angle) {
    let rad = angle * Math.PI / 180;
    return -Math.sin(rad);
  }
  function getNumbers(per, perOpp, n) {
    let nC = Math.round(per / 100 * n);
    let nCO;
    if (per + perOpp == 100) {
      nCO = n - nC;
    } else {
      nCO = Math.round(perOpp / 100 * n);
    }
    let nR = n - nC - nCO;
    if (nC + nCO > 100 && per == 50) {
      nC = 100 - nCO;
    }
    return [nC, nCO, nR];
  }
  function shuffleArray(array) {
    let curId = array.length;
    while (0 !== curId) {
      let randId = Math.floor(Math.random() * curId);
      curId -= 1;
      let tmp = array[curId];
      array[curId] = array[randId];
      array[randId] = tmp;
    }
    return array;
  }
  class Oob {
    constructor(size, color, orientation, movementDirection, speed, randomisation, apertureType, isRandomWalk, isRandomOrientated, isFade, canvas, ctx, units) {
      this.canvas = canvas;
      this.size = canvas.width * size / 100;
      if (units === "px") {
        this.size = size;
      }
      this.color = color;
      this.ctx = ctx;
      this.pos = { x: 0, y: 0 };
      this.vel = { x: 0, y: 0 };
      if (apertureType == 0) {
        this.pos.x = Math.random() * canvas.width;
        this.pos.y = Math.random() * canvas.height;
      }
      if (apertureType == 1) {
        let angle = Math.random() * 2 * Math.PI;
        let r = Math.sqrt(Math.sqrt(Math.random())) - 0.5;
        this.pos.x = r * Math.sin(angle) * canvas.width + canvas.width / 2;
        this.pos.y = r * Math.cos(angle) * canvas.height + canvas.height / 2;
      }
      this.speedRes = canvas.width * speed / 100 * (1 + (randomisation / 100 * Math.random() - randomisation / 100));
      if (units === "px") {
        this.speedRes = speed * (1 + (randomisation / 100 * Math.random() - randomisation / 100));
      }
      this.orientation = orientation;
      this.movementDirection = movementDirection;
      this.setVel();
      this.ld = { x: 0, y: 0 };
      this.lu = { x: 0, y: 0 };
      this.r = { x: 0, y: 0 };
      this.setOrient();
      this.isRandomWalk = isRandomWalk;
      this.rW = (Math.random() - 0.5) * 10;
      this.isRandomOrientated = isRandomOrientated;
      this.rO = (Math.random() - 0.5) * 10;
      this.apertureType = apertureType;
      this.timeToChangeMovement = Math.random();
      this.timeToChangeOrientation = Math.random();
      this.isFade = isFade;
      this.alpha = 1;
    }
    setVel() {
      this.vel.x = getX(this.movementDirection) * this.speedRes;
      this.vel.y = getY(this.movementDirection) * this.speedRes;
    }
    setOrient() {
      this.ld.x = getX(this.orientation + 270) * this.size;
      this.ld.y = getY(this.orientation + 270) * this.size;
      this.lu.x = getX(this.orientation + 90) * this.size;
      this.lu.y = getY(this.orientation + 90) * this.size;
      this.r.x = getX(this.orientation) * this.size;
      this.r.y = getY(this.orientation) * this.size;
    }
    randomMovement(deltaTime) {
      this.movementDirection += this.rW * deltaTime / 1e3;
      this.setVel();
      this.timeToChangeMovement += deltaTime / 1e3;
      let d = 1 - this.timeToChangeMovement;
      if (d < 0) {
        this.rW = (Math.random() - 0.5) * 30;
        this.timeToChangeMovement = -d;
      }
    }
    randomOrientation(deltaTime) {
      this.orientation += this.rO * deltaTime / 1e3;
      if (this.orientation < 0) {
        this.orientation = 360 - this.orientation;
      } else if (this.orientation > 360) {
        this.orientation = this.orientation - 360;
      }
      this.setOrient();
      this.timeToChangeOrientation += deltaTime / 1e3;
      let d = 1 - this.timeToChangeOrientation;
      if (d < 0) {
        this.rO = (Math.random() - 0.5) * 60;
        this.setOrient();
        this.timeToChangeOrientation = -d;
      }
    }
    handleOutOfBounds() {
      if (this.apertureType == 0) {
        this.alpha = 0.1;
        if (this.pos.x < -this.size) {
          this.pos.x = this.canvas.width + this.size;
        } else if (this.pos.x > this.canvas.width + this.size) {
          this.pos.x = -this.size;
        }
        if (this.pos.y < -this.size) {
          this.pos.y = this.canvas.height + this.size;
        } else if (this.pos.y > this.canvas.height + this.size) {
          this.pos.y = -this.size;
        }
        let d = Math.min(
          this.pos.x - this.size,
          this.pos.y - this.size,
          this.canvas.width - (this.pos.x + this.size),
          this.canvas.height - (this.pos.y + this.size)
        );
        if (d < this.canvas.width / 20 && this.isFade) {
          this.alpha = d / (this.canvas.width / 20);
          if (this.alpha < 0) this.alpha = 0;
        } else {
          this.alpha = 1;
        }
      }
      if (this.apertureType == 1) {
        this.alpha = 0.1;
        let a = this.canvas.width / 2;
        let b = this.canvas.height / 2;
        let x = this.pos.x - a;
        let y = this.pos.y - b;
        let d = x * x / (a * a) + y * y / (b * b);
        if (d > 0.7 && this.isFade) {
          this.alpha = (1 - d) / 0.3;
          if (this.alpha < 0) this.alpha = 0;
        } else {
          this.alpha = 1;
        }
        if (d > 1) {
          x *= -0.99;
          y *= -0.99;
          this.pos.x = x + a;
          this.pos.y = y + b;
        }
      }
    }
    // deltaTime is given in ms!
    update(deltaTime) {
      this.pos.x += this.vel.x * deltaTime / 1e3;
      this.pos.y += this.vel.y * deltaTime / 1e3;
      if (this.isRandomWalk) this.randomMovement(deltaTime);
      if (this.isRandomOrientated) this.randomOrientation(deltaTime);
      this.handleOutOfBounds();
    }
    draw() {
      this.ctx.globalAlpha = this.alpha;
      this.ctx.beginPath();
      let x = this.pos.x + this.ld.x;
      let y = this.pos.y + this.ld.y;
      this.ctx.moveTo(x, y);
      x = this.pos.x + this.lu.x;
      y = this.pos.y + this.lu.y;
      this.ctx.lineTo(x, y);
      x = this.pos.x + this.r.x;
      y = this.pos.y + this.r.y;
      this.ctx.lineTo(x, y);
      this.ctx.fillStyle = this.color;
      this.ctx.fill();
    }
  }
  class OobBird extends Oob {
    constructor(size, color, orientation, movementDirection, speed, randomisation, apertureType, isRandomWalk, isRandomOrientated, isFade, canvas, ctx, units) {
      super(
        size,
        color,
        orientation,
        movementDirection,
        speed,
        randomisation,
        apertureType,
        isRandomWalk,
        isRandomOrientated,
        isFade,
        canvas,
        ctx,
        units
      );
      this.animationTime = Math.random();
      this.animationFrame = 4;
      if (this.animationTime < 0.8) this.animationFrame = 3;
      if (this.animationTime < 0.6) this.animationFrame = 2;
      if (this.animationTime < 0.4) this.animationFrame = 1;
      if (this.animationTime < 0.2) this.animationFrame = 0;
      this.animationTime *= 0.1;
      this.animdir = 1;
      let stdColor = color;
      this.makeColors(stdColor, orientation);
    }
    makeColors(color, orientation) {
      this.colorsLeft = [];
      this.colorsRight = [];
      let brightenStartR = Math.round(-getY(orientation) * 5);
      let brightenStartL = Math.round(getX(orientation) * 5);
      let colR = brighten(color, brightenStartR);
      let colL = brighten(color, brightenStartL);
      this.colorsRight.push(stdColorToHex(colR));
      this.colorsLeft.push(stdColorToHex(colL));
      for (let i = 0; i < 6; i++) {
        colR = brighten(colR, brightenStartR);
        colL = brighten(colL, brightenStartL);
        this.colorsRight.push(stdColorToHex(colR));
        this.colorsLeft.push(stdColorToHex(colL));
      }
    }
    update(deltaTime) {
      super.update(deltaTime);
      this.animationTime += deltaTime / 1e3;
      let d = 0.1 - this.animationTime;
      if (d < 0) {
        this.animationFrame += this.animdir;
        this.animationTime = -d;
        if (this.animationFrame > 5 || this.animationFrame < 1) {
          this.animationTime -= 0.1;
          this.animdir *= -1;
        }
      }
    }
    draw() {
      this.ctx.globalAlpha = this.alpha;
      let px = this.pos.x + 0.2 * this.r.x;
      let py = this.pos.y + 0.2 * this.r.y;
      this.ctx.beginPath();
      this.ctx.moveTo(px, py);
      let x = this.pos.x + this.ld.x / (this.animationFrame * 0.1 + 1);
      let y = this.pos.y + this.ld.y / (this.animationFrame * 0.1 + 1);
      this.ctx.lineTo(x, y);
      x = this.pos.x + this.r.x;
      y = this.pos.y + this.r.y;
      this.ctx.lineTo(x, y);
      this.ctx.fillStyle = this.colorsRight[this.animationFrame];
      this.ctx.fill();
      this.ctx.beginPath();
      this.ctx.moveTo(px, py);
      x = this.pos.x + this.lu.x / (this.animationFrame * 0.1 + 1);
      y = this.pos.y + this.lu.y / (this.animationFrame * 0.1 + 1);
      this.ctx.lineTo(x, y);
      x = this.pos.x + this.r.x;
      y = this.pos.y + this.r.y;
      this.ctx.lineTo(x, y);
      this.ctx.fillStyle = this.colorsLeft[this.animationFrame];
      this.ctx.fill();
    }
  }
  class OobCircle extends Oob {
    draw() {
      this.ctx.globalAlpha = this.alpha;
      this.ctx.beginPath();
      this.ctx.arc(this.pos.x, this.pos.y, this.size / 2, 0, Math.PI * 2);
      this.ctx.fillStyle = this.color;
      this.ctx.fill();
    }
  }
  class OobSquare extends Oob {
    draw() {
      this.ctx.globalAlpha = this.alpha;
      this.ctx.beginPath();
      let x = this.pos.x - this.size / 2;
      let y = this.pos.y - this.size / 2;
      this.ctx.moveTo(x, y);
      x = this.pos.x + this.size / 2;
      y = this.pos.y - this.size / 2;
      this.ctx.lineTo(x, y);
      x = this.pos.x + this.size / 2;
      y = this.pos.y + this.size / 2;
      this.ctx.lineTo(x, y);
      x = this.pos.x - this.size / 2;
      y = this.pos.y + this.size / 2;
      this.ctx.lineTo(x, y);
      this.ctx.fillStyle = this.color;
      this.ctx.fill();
    }
  }
  class OobImage extends Oob {
    constructor(size, color, orientation, movementDirection, speed, randomisation, apertureType, isRandomWalk, isRandomOrientated, isFade, imageArray, keyframes, keyframeTime, mirrorType, canvas, ctx, units) {
      super(
        size,
        color,
        orientation,
        movementDirection,
        speed,
        randomisation,
        apertureType,
        isRandomWalk,
        isRandomOrientated,
        isFade,
        canvas,
        ctx,
        units
      );
      if (Array.isArray(imageArray)) {
        let i = Math.floor(Math.random() * imageArray.length);
        this.img = imageArray[i];
        this.keyframes = getValueFromArrayOrNot(keyframes, i);
        this.keyframeTime = getValueFromArrayOrNot(keyframeTime, i);
        this.mirrorType = getValueFromArrayOrNot(mirrorType, i);
      } else {
        this.img = imageArray;
        this.keyframes = keyframes;
        this.keyframeTime = keyframeTime;
        this.mirrorType = mirrorType;
      }
      this.imgWidth = this.img.naturalWidth / this.keyframes;
      this.imgHeight = this.img.naturalHeight;
      this.actualKeyframe = Math.floor(Math.random() * this.keyframes);
      this.animationTime = Math.random() * this.keyframeTime;
    }
    update(deltaTime) {
      super.update(deltaTime);
      this.animationTime += deltaTime / 1e3;
      let d = this.keyframeTime - this.animationTime;
      if (d < 0) {
        this.animationTime = 0;
        this.actualKeyframe++;
        if (this.actualKeyframe >= this.keyframes) this.actualKeyframe = 0;
      }
    }
    draw() {
      this.ctx.globalAlpha = this.alpha;
      this.ctx.translate(this.pos.x, this.pos.y);
      if (this.mirrorType === 0) {
        this.ctx.rotate(-Math.PI * this.orientation / 180);
      } else if (this.mirrorType == 1) {
        if (this.orientation > 90 && this.orientation < 270) {
          this.ctx.rotate(-Math.PI * (this.orientation - 180) / 180);
        } else {
          this.ctx.rotate(-Math.PI * this.orientation / 180);
        }
      }
      this.ctx.translate(-this.pos.x, -this.pos.y);
      if (this.mirrorType === 0) {
        this.ctx.drawImage(
          this.img,
          this.actualKeyframe * this.imgWidth,
          0,
          this.imgWidth,
          this.imgHeight,
          this.pos.x - this.size / 2,
          this.pos.y - this.size / 2,
          this.size,
          this.size
        );
      } else if (this.mirrorType === 1) {
        if (this.orientation > 90 && this.orientation < 270) {
          this.ctx.drawImage(
            this.img,
            this.actualKeyframe * this.imgWidth,
            this.imgHeight / 2,
            this.imgWidth,
            this.imgHeight / 2,
            this.pos.x - this.size / 2,
            this.pos.y - this.size / 2,
            this.size,
            this.size
          );
        } else {
          this.ctx.drawImage(
            this.img,
            this.actualKeyframe * this.imgWidth,
            0,
            this.imgWidth,
            this.imgHeight / 2,
            this.pos.x - this.size / 2,
            this.pos.y - this.size / 2,
            this.size,
            this.size
          );
        }
      }
      this.ctx.translate(this.pos.x, this.pos.y);
      if (this.mirrorType === 0) {
        this.ctx.rotate(Math.PI * this.orientation / 180);
      } else if (this.mirrorType === 1) {
        if (this.orientation > 90 && this.orientation < 270) {
          this.ctx.rotate(Math.PI * (this.orientation - 180) / 180);
        } else {
          this.ctx.rotate(Math.PI * this.orientation / 180);
        }
      }
      this.ctx.translate(-this.pos.x, -this.pos.y);
    }
  }

  return RokPlugin;

})(jsPsychModule);
//# sourceMappingURL=https://unpkg.com/@jspsych-contrib/plugin-rok@2.0.0/dist/index.browser.js.map
