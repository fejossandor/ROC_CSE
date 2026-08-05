var jsPsych = initJsPsych({
    on_finish: function () {
        jsPsych.data.displayData();
        jsPsych.data.get().filter({ collect: true }).ignore(['trial_type', 'participant', 'collect']).localSave('csv', `ROK_participant_${participantId}.csv`)
    }
});

var participantId = jsPsych.randomization.randomID(2)

jsPsych.data.addProperties({ participant: participantId })

var experimentalTrials;
var practiceTrials;
var practicePassed = false;


async function loadExperiment() {
    var practiceResponse = await fetch(`http://localhost:8000/sample_trials/p_practice_sample.json`)
    practiceTrials = await practiceResponse.json();

    var response = await fetch(`http://localhost:8000/sample_trials/p_experiment_sample.json`);
    experimentalTrials = await response.json();


    startExperiment();
}


var debug = new URLSearchParams(window.location.search).get('debug') === '1'

var timeline = []

var language;

var preLoadTrial = {
    type: jsPsychPreload,
    images: ["http://localhost:8000/arrow1.png"],
    auto_preload: true
}

var trialDuration = 1500;
var fixationCrossDuration = 500;
var fixationTrialDuration = 650;
var feedBackDuration = 2000;


if (debug) {
    trialDuration = 1;
    fixationCrossDuration = 1;
    fixationTrialDuration = 1;
    feedBackDuration = 1;
    practicePassed = true;
}

var language;
var languageTrial = {
    type: jsPsychImageButtonResponse,
    stimulus: "http://localhost:8000/flags.png",
    prompt: "<h2>Please, pick a language!</h2>",
    choices: [`HUN`, `EN`],
    margin_vertical: '120px',
    button_html: function (choice) {
        return `<button class="jspsych-btn" style="margin-inline:256px; font-size:24px; color:black; padding:12px 24px; border:1.4px solid black">` + choice + "</button>"

    },
    data: {
        collect: true
    },
    on_finish: function (data) {
        if (data.response == 0) {
            language = "HUN"
        }
        else if (data.response == 1) {
            language = "EN"
        }
    }
}

var welcomeTrial = {
    type: jsPsychHtmlButtonResponse,
    stimulus: function () {
        if (language == "HUN") {
            return `
    <div class = "frame"><h2>Üdvözlünk a <b>Metatudomány Kutatócsoport</b> vizsgálatában!</h2>
    <p>Egy tudományos kutatásban veszel részt, amelynek vezetője <b>Bognár Miklós</b>, az ELTE Affektív Pszichológia Tanszékének kutatója.
    A kutatás célja megvizsgálni, hogy miként működik a kognitív kontroll.</p>
    <h3>Részvétel</h3>
    <p>A kutatásban való részvétel teljesen önkéntes. A vizsgálatot bármikor indoklás nélkül megszakíthatod.
    Ha bármilyen kérdésed, észrevételed vagy problémád van a kutatással kapcsolatban,
    írj Bognár Miklósnak a <a href="mailto:bognar.miklos@ppk.elte.hu">bognar.miklos@ppk.elte.hu</a> címre.</p></div>
  `}
        else if (language == "EN") {
            return `<div class = "frame"><h2>Welcome to the experiment of the <b>Metascience Lab</b>!</h2>
    <p>You are participating in a scientific experiment carried out under the supervision of <b>Miklós Bognár</b>, researcher at the Department of Affective Psychology at Eötvös Loránd University.</p>
    <p>The aim of the study is to investigate the mechanisms of cognitive control</p>
    <h3>Participation</h3>
    <p>Participation is voluntary. You can withdraw from participation at any point of the experiment without having to provide any reason for your actions.
    If you have any questions or suggestions concerning the experiment, please write an email to the following address: <a href="mailto:bognar.miklos@ppk.elte.hu">bognar.miklos@ppk.elte.hu</a></p></div>
  `
        }
    },
    choices: function () {
        if (language == "HUN") { return ["Tovább"] }
        else { return ["Continue"] }
    },
    button_html: function (choice) {
        return `<button class="jspsych-btn" style="font-size:20px; color:black; padding:8px 16px; border:1.4px solid black">` + choice + "</button>"
    }
}

var fullScreenTrial = {
    type: jsPsychFullscreen,
    fullscreen_mode: true,
    message: function () {
        if (language == "HUN") {
            return `<div class = "frame"><p><b>A kísérlet teljes képernyős módba fog váltani.
         Kérlek kattintsd a <span class="key"> Folytatás </span> gombra</b></p></div>`
        }
        else if (language == "EN") {
            return `<div class = "frame"><p><b>The experiment will switch to full-screen mode.</p>
            <p> Please, click on the <span class="key"> Continue</span> button below!</p></div>`
        }
    },
    button_label: function () {
        if (language == "HUN") {
            return "Folytatás"
        }
        else if (language == "EN") {
            return "Continue"
        }
    }
}


var consentTrial = {
    type: jsPsychSurveyMultiChoice,
    questions: [{
        prompt: function () {
            if (language == "HUN") {
                return `A beleegyező nyilatkozatot elolvastam és beleegyezem a kutatásban való részvételbe.`
            }
            else if (language == "EN") {
                return `I have read the consent form and I agree to participate in the study.`
            }
        },
        name: "consent",
        options: function () {
            if (language == "HUN") { return ['Igen', 'Nem'] }
            else if (language == "EN") { return ['Yes', 'No'] }
        },
        required: true
    }],
    button_label: function () {
        if (language == "HUN") {
            return "Folytatás"
        }
        else if (language == "EN") {
            return "Continue"
        }
    },
    data: { collect: true },
    on_finish: function (data) {
        var response = data.response.consent;
        if (["No", "Nem"].includes(response)) {
            if (language == "HUN") {
                jsPsych.abortExperiment(
                    `Megértjük a döntésed, a kísérlet számodra véget ért.`
                )
            }
            else if (language == "EN") {
                jsPsych.abortExperiment(
                    "We understand your decision. The experiment has ended for you.")
            }
        }
    }
}

var neptunCodeTrial = {
    type: jsPsychSurveyHtmlForm,
    preamble: function () {
        if (language == "HUN") { return `<p>Kérlek add meg a Neptun-kódod!</p>` }
        else if (language == "EN") { return `<p>Please enter your Neptun code!</p>` }
    },
    html: '<input type="text" name="response" required>',
    button_label: function () {
        if (language == "HUN") { return "Folytatás" }
        else if (language == "EN") { return "Continue" }
    },
    data: { collect: true }
}

var genderTrial = {
    type: jsPsychSurveyMultiChoice,
    questions: [{
        prompt: function () {
            if (language == "HUN") { return "Kérlek add meg a nemed!" }
            else if (language == "EN") { return "Please indicate your gender!" }
        },
        name: "Gender",
        options: function () {
            if (language == "HUN") { return ['Férfi', 'Nő', 'Nem szeretném megadni', 'Egyéb'] }
            else if (language == "EN") { return ['Male', 'Female', 'Prefer not to say', 'Other'] }
        },
        required: true
    }],
    button_label: function () {
        if (language == "HUN") {
            return "Folytatás"
        }
        else if (language == "EN") {
            return "Continue"
        }
    },
    data: { collect: true }
}

var ageTrial = {
    type: jsPsychSurveyHtmlForm,
    preamble: function () {
        if (language == "HUN") { return '<p>Kérlek add meg az életkorod!</p>' }
        else if (language == "EN") { return '<p>Please enter your age!</p>' }
    },
    html: '<input type="text" name="response" required>',
    button_label: function () {
        if (language == "HUN") { return "Folytatás" }
        else if (language == "EN") { return "Continue" }
    },
    data: { collect: true }
}

var instructionsTrial = {
    type: jsPsychInstructions,
    pages: function () {
        if (language == "HUN") {
            return [`<div class = "frame"><h1>Feladat</h1><h3>A képernyőn különböző irányba mutató és mozgó nyilakat fogsz látni.
                A feladatod az lesz, hogy azon iránynak megfelelő gombot nyomd le a billentyűzeten, 
                amelyik irányba a nyilak <b>mutatnak<b>.</h3>
                <h2>Vigyázz!</h2>
                <h3>A nyilak mozgásiránya nem biztos, hogy megegyezik a mutatott iránnyal.</h3>
                <p>Nyomd meg a <span class='key'>SZÓKÖZ</span>-t a folytatáshoz!</p></div>`,
                `<div class = "frameArrows"><h3> Ha a nyilak <b>balra</b> mutatnak, nyomd meg a <span class ='key'>F</span> billentyűt! 
              <img src ="http://localhost:8000/arrow1.png" class ="arrow-left"></h3> 
                <h3>Ha a nyilak <b>jobbra</b> mutatnak, nyomd meg a <span class ='key'>G</span> billentyűt!
                <img src ="http://localhost:8000/arrow1.png" class ="arrow-right"></h3> 
                <h3>Ha a nyilak <b>felfelé</b> mutatnak, nyomd meg a <span class ='key'>J</span> billentyűt! 
                <img src ="http://localhost:8000/arrow1.png" class ="arrow-up"></h3> 
                <h3>Ha a nyilak <b>lefelé</b> mutatnak, nyomd meg a <span class ='key'>N</span> billentyűt! 
                <img src ="http://localhost:8000/arrow1.png" class ="arrow-down"></h3>
                <p>Nyomd meg a <span class='key'>SZÓKÖZ</span>-t a folytatáshoz!</p></div>`,
                `<div class = "frame"><h3>Kérlek mindig igyekezz a minél gyorsabb és pontosabb válaszadásra.</h3>
                    <p> A kísérlet egy gyakorló blokkal kezdődik. Nyomd meg a <span class='key'>SZÓKÖZ</span>-t a folytatáshoz!</p></div>`]
        }
        else if (language == "EN") {
            return [`<div class = "frame"><h1>Task</h1><h3>You will see arrows on the screen pointing and moving in different directions.
                Your task is to press the key corresponding to the direction the arrows 
                are <b>pointing</b>.</h3>
                <h2>Be careful!</h2>
                <h3>The direction the arrows move in may not match the direction in which they point.</h3>
                <p>Press <span class='key'>SPACE</span> to continue</p></div>`,
                `<div class = "frameArrows"><h3>If the arrows point to the <b>left</b>, press the <span class='key'>F</span> key.
                <img src ="http://localhost:8000/arrow1.png" class ="arrow-left"></h3> 
                <h3>If the arrows point to the<b>right</b>, press the <span class='key'>G</span> key.
                <img src ="http://localhost:8000/arrow1.png" class ="arrow-right"></h3> 
                <h3>If the arrows point <b>up</b>, press the <span class='key'>J</span> key.
                <img src ="http://localhost:8000/arrow1.png" class ="arrow-up"></h3> 
                <h3>If the arrows point <b>down</b>, press the <span class='key'>N</span> key.
                <img src ="http://localhost:8000/arrow1.png" class ="arrow-down"></h3>
                <p>Press <span class='key'>SPACE</span> to continue<p></div>`,
                `<div class = "frame"><h3>Please always try to respond as quickly and accurately as possible!</h3>
                    <h3>The experiment begins with a practice block. Press <span class='key'>SPACE</span> to continue!</h3></div>`]
        }
    },
    key_forward: ' ',
    key_backward: 'b'
}


var fixationTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `<h1>+</h1>`,
    trial_duration: fixationTrialDuration,
    stimulus_duration: fixationCrossDuration,
    choices: 'NO_KEYS'
}


var expTrial = {
    type: jsPsychRok,
    stimulus_type: 4,
    oob_size: 5,
    coherence_movement: 60,
    trial_duration: trialDuration,
    stimulus_image: preLoadTrial.images,
    background_color: "white",
    oob_color: "black",
    choices: ['f', 'g', 'j', 'n'],
    coherence_orientation: function () {
        var c = jsPsych.evaluateTimelineVariable("condition");
        if (["horizontal_c1", "horizontal_c2", "vertical_c1", "vertical_c2"].includes(c)) {
            return 100;
        }
        else if (["horizontal_i1", "horizontal_i2", "vertical_i1", "vertical_i2"].includes(c)) {
            return 0;
        }
    },
    coherence_orientation_opposite: function () {
        var c = jsPsych.evaluateTimelineVariable("condition");
        if (["horizontal_c1", "horizontal_c2", "vertical_c1", "vertical_c2"].includes(c)) {
            return 0;
        }
        else if (["horizontal_i1", "horizontal_i2", "vertical_i1", "vertical_i2"].includes(c)) {
            return 100;
        }
    },
    coherence_movement_opposite: 0,
    coherent_movement_direction: function () {
        var c = jsPsych.evaluateTimelineVariable("condition");
        if (["horizontal_c1", "horizontal_i1"].includes(c)) { return 0 }
        else if (["horizontal_c2", "horizontal_i2"].includes(c)) { return 180 }
        else if (["vertical_c1", "vertical_i1"].includes(c)) { return 90 }
        else if (["vertical_c2", "vertical_i2"].includes(c)) { return 270 }
    },
    coherent_orientation: function () {
        var c = jsPsych.evaluateTimelineVariable("condition");
        if (["horizontal_c1", "horizontal_i1"].includes(c)) { return 0 }
        else if (["horizontal_c2", "horizontal_i2"].includes(c)) { return 180 }
        else if (["vertical_c1", "vertical_i1"].includes(c)) { return 90 }
        else if (["vertical_c2", "vertical_i2"].includes(c)) { return 270 }

        if (["horizontal_c1", "horizontal_c2", "vertical_c1", "vertical_c2"].includes(c)) {
            return dir;
        }
        else if (["horizontal_i1", "horizontal_i2", "vertical_i1", "vertical_i2"].includes(c)) {
            return 180 - dir;
        }
    },
    correct_choice: function () {
        var c = jsPsych.evaluateTimelineVariable("condition");
        if (["horizontal_c2", "horizontal_i2"].includes(c)) { return ["f"] }
        else if (["horizontal_c1", "horizontal_i1"].includes(c)) { return ["g"] }
        else if (["vertical_c2", "vertical_i2"].includes(c)) { return ["n"] }
        else if (["vertical_c1", "vertical_i1"].includes(c)) { return ["j"] }
    },
    movement_speed: 14,
    data: {
        collect: true,
        task: "expTrial"
    },

    on_finish: function (data) {
        delete data.frame_rate_array;
        var c = jsPsych.evaluateTimelineVariable("condition");
        if (["horizontal_c1", "horizontal_c2", "vertical_c1", "vertical_c2"].includes(c)) {
            data.congruency = "congruent";
        }
        else if (["horizontal_i1", "horizontal_i2", "vertical_i1", "vertical_i2"].includes(c)) {
            data.congruency = "incongruent";
        }
        data.correct_choice = `${data.correct_choice}`
        data.isCorrect = data.key_press == data.correct_choice;
        data.id = jsPsych.evaluateTimelineVariable("id");
        console.log(data.key_press)
        console.log(data.correct_choice)
    }
};


var practiceStart = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function () {
        if (language == "HUN") {
            return `<div class = "frame"><h2>Gyakorló blokk</h2><p style="text-align: center; max-width: 800px; margin: auto; font-size: 24px">A kísérlet egy gyakorló blokkal kezdődik.
            Kérjük, törekedj a minél gyorsabb és pontosabb válaszadásra! Amint készen állsz, nyomj meg egy tetszőleges billentyűt a kezdéshez!</p></div>`;
        }
        else if (language == "EN") {
            return `<div class = "frame"><h2>Practice block</h2><p style="text-align: center; max-width: 800px; margin: auto; font-size: 24px">The experiment begins with a practice block.
            Please try to respond as quickly and accurately as possible! When you are ready, press any key to begin!</p></div>`;
        }
    },
    choices: "ALL_KEYS"
};

var tooSlowOrIncorrect = {
    timeline: [{
        type: jsPsychHtmlKeyboardResponse,
        stimulus: function () {
            var lastResponse = jsPsych.data.get().last(1).values()[0];
            if (lastResponse.key_press == "") {
                if (language == "HUN") {
                    return '<p style="font-size:32px">Túl lassú voltál!</p>'
                }
                else if (language == "EN") {
                    return '<p style="font-size:32px">Too slow!</p>'
                }
            }
            else if (lastResponse.key_press != lastResponse.correctResponse) {
                if (language == "HUN") {
                    return '<p style="font-size:32px">Hibás válasz!</p>'
                }
                else if (language == "EN") {
                    return '<p style="font-size:32px">Incorrect response!</p>'
                }
            }
        },
        choices: 'NO_KEYS',
        trial_duration: feedBackDuration
    }],
    conditional_function: function () {
        lastResponse = jsPsych.data.get().last().values()[0];
        if (lastResponse.isCorrect == true) {
            return false
        }
        else { return true }
    }
}

var repeatPractice = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function () {
        if (language == "HUN") {
            return `<div class = "frame"><p>Túl sokat hibáztál a gyakorló blokkban. Kérlek nyomd be a <span class="key">SPACE</span> billentyűt,
            hogy újrakezd a gyakorlást!</p></div>`
        }
        else if (language == "EN") {
            return `<div class = "frame"><p>You made too many mistakes in the practice block. Please, press the <span class="key">SPACE</span> key
            to restart the practice.</p></div>`
        }
    },
    choices: [' '],

}

var practiceEnd = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function () {
        if (language == "HUN") {
            return `<div class = "frame"><h2>Gyakorló blokk vége</h2><p style="text-align: center; max-width: 800px; margin: auto; font-size: 24px">A gyakorló blokk véget ért.
             Most a kísérleti blokk következik. Ha készen állsz, nyomj le egy tetszőleges billentyűt a kezdéshez!</p></div>`
        }
        else if (language == "EN") {
            return `<div class = "frame"><h2>End of practice block</h2><p style="text-align: center; max-width: 800px; margin: auto; font-size: 24px">The practice block has ended. 
            The experimental block comes next. When you are ready, press any key to begin!</p></div>`
        }
    },
    choices: "ALL_KEYS"
};




var blockEnd = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function () {
        if (language == "HUN") {
            return `
        <div class = "frame"><p style="text-align: center; max-width: 800px; margin: auto; font-size: 24px">
        A kísérletnek ezen szakasza befejeződött, most pihenhetsz kicsit.
        Amennyiben készen állsz, nyomj le egy tetszőleges billentyűt a folytatáshoz!</p></div>
        <p style="font-size: 24px;  position: absolute; top: 40px; right: 80px;">Hátralévő idő: <span id="timer" class="timer">2:00</span></p>
    `
        }
        else if (language == "EN") {
            return `
        <div class = "frame"><p style="text-align: center; max-width: 800px; margin: auto; font-size: 24px">
        This part of the experiment is complete, you can rest now.
        When you are ready, press any key to continue!</p></div>
        <p style="font-size: 24px;  position: absolute; top: 40px; right: 80px;">Time remaining: <span id="timer" class="timer">2:00</span></p>
    `
        }
    },
    choices: "ALL_KEYS",
    trial_duration: 120000,
    on_load: function () {
        var timeLeft = 120; // seconds
        var timerElement = document.getElementById('timer');

        var countdown = setInterval(function () {
            timeLeft--;
            var minutes = Math.floor(timeLeft / 60);
            var seconds = timeLeft % 60;
            timerElement.innerHTML = minutes + ':' + (seconds < 10 ? '0' : '') + seconds;

            if (timeLeft <= 0) {
                clearInterval(countdown);
            }
        }, 1000);


        jsPsych.getCurrentTrial().countdown_id = countdown;
    },
    on_finish: function () {

        clearInterval(jsPsych.getCurrentTrial().countdown_id);
    }
}

var debriefTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function () {
        if (language == "HUN") {
            return `<div class = "frame"><h2>Kísérlet vége</h2><p style="text-align: center; max-width: 800px; margin: auto; font-size: 24px">
            Köszönjük, hogy részt vettél a vizsgálatban!</p></div>`
        }
        else if (language == "EN") {
            return `<div class = "frame"><h2>End of experiment</h2><p style="text-align: center; max-width: 800px; margin: auto; font-size: 24px">
            Thank you for your participation!</p></div>`
        }
    },
    choices: "ALL_KEYS"
};

function startExperiment() {
    timeline.push(
        preLoadTrial,
        languageTrial,
        welcomeTrial,
        fullScreenTrial,
        consentTrial,
        neptunCodeTrial,
        genderTrial,
        ageTrial,
        instructionsTrial,
        practiceStart
    )

    var practiceProcedure = []

    for (let i = 0; i < practiceTrials.length; i++) {
        var practiceBlock = {
            timeline: [fixationTrial, expTrial, tooSlowOrIncorrect],
            timeline_variables: practiceTrials[i],
            conditional_function: function () {
                if (practicePassed == false) {
                    return true
                }
                else {
                    return false
                }
            }
        }
        console.log(practiceBlock)
        practiceProcedure.push(practiceBlock)


        var accuracyCheck = {
            timeline: [{
                type: jsPsychHtmlKeyboardResponse,
                stimulus: " ",
                choices: 'NO_KEYS',
                trial_duration: 1,
                on_finish: function () {
                    var lastBlock = jsPsych.data.get().filter({ task: "expTrial" }).last(practiceTrials[i].length);
                    var correctRatio = jsPsych.data.get().filter({ isCorrect: true }).last(practiceTrials[i].length).count() / lastBlock.count();
                    if (correctRatio >= 0.8) {
                        practicePassed = true
                    }
                    else { practicePassed = false }

                }
            }],
            conditional_function: function () {
                if (practicePassed == true) {
                    return false
                }
                else { return true }
            }
        };
        practiceProcedure.push(accuracyCheck)

        var repeatPracticeTrial = {
            timeline: [repeatPractice],
            conditional_function: function () {
                if (practicePassed == true) {
                    return false
                }
                else { return true }
            }
        }
        practiceProcedure.push(repeatPracticeTrial)
    }

    timeline.push(...practiceProcedure, practiceEnd)


    var experimentalProcedure = []

    for (let j = 0; j < experimentalTrials.length; j++) {

        var blockStart = {
            type: jsPsychHtmlKeyboardResponse,
            stimulus: function () {
                if (language == "HUN") {
                    return `<h1>${j + 1}. Blokk kezdődik</h1>`
                }
                else if (language == "EN") {
                    return `<h1>Block ${j + 1} begins</h1>`
                }
            },
            trial_duration: 2000,
            choices: "NO_KEYS",
            data: { collect: true }
        }



        var experimentalBlock = {
            timeline: [fixationTrial, expTrial],
            timeline_variables: experimentalTrials[j]
        }

        experimentalProcedure.push(blockStart, experimentalBlock, blockEnd)
    }

    timeline.push(...experimentalProcedure, debriefTrial)
    jsPsych.run(timeline)

}


loadExperiment()
