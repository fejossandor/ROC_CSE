var jsPsych = initJsPsych({
    on_finish: () => {
        try {
            jatos.endStudyAndRedirect(
                "link here",
                jsPsych.data.get().csv()
            );
        } catch {
            jsPsych.data.displayData();
            jsPsych.data.get().filter({ collect: true }).ignore(['participant', 'collect']).localSave('csv', `ROK_participant_${participantId}.csv`)
        }
    }
});
const running_jatos = (typeof jatos !== `undefined`)
console.log('Running in JATOS: ', running_jatos);
var participantId = jsPsych.randomization.randomID(2)

jsPsych.data.addProperties({ participant: participantId })

var experimentalTrials;
var practiceTrials;
var practicePassed = false;


async function loadExperiment() {

    practiceTrials = practice_trials

    experimentalTrials = experimental_blocksets[Math.floor(Math.random() * experimental_blocksets.length)];


    startExperiment();
}


var debug = new URLSearchParams(window.location.search).get('debug') === '1'


var expText = {
    "welcomeHun": `<div class = "frame"><h2>Üdvözlünk a <b>Metatudomány Kutatócsoport</b> vizsgálatában!</h2>
                <p>Egy tudományos kutatásban veszel részt, amelynek vezetője <b>Bognár Miklós</b>, az ELTE Affektív Pszichológia Tanszékének kutatója.
                A kutatás célja megvizsgálni, hogy miként működik a kognitív kontroll.</p>
                <h3>Részvétel</h3>
                <p>A kutatásban való részvétel teljesen önkéntes. A vizsgálatot bármikor indoklás nélkül megszakíthatod.
                Ha bármilyen kérdésed, észrevételed vagy problémád van a kutatással kapcsolatban,
                írj Bognár Miklósnak a <a href="mailto:bognar.miklos@ppk.elte.hu">bognar.miklos@ppk.elte.hu</a> címre.</p></div>`,

    "welcomeEn": `<div class = "frame"><h2>Welcome to the experiment of the <b>Metascience Lab</b>!</h2>
                <p>You are participating in a scientific experiment carried out under the supervision of <b>Miklós Bognár</b>, researcher at the Department of Affective Psychology at Eötvös Loránd University.</p>
                <p>The aim of the study is to investigate the mechanisms of cognitive control.</p>
                <h3>Participation</h3>
                <p>Participation is voluntary. You can withdraw from participation at any point of the experiment without having to provide any reason for your actions.
                If you have any questions or suggestions concerning the experiment, please write an email to the following address: <a href="mailto:bognar.miklos@ppk.elte.hu">bognar.miklos@ppk.elte.hu</a>.</p></div>`,


    "consentHun": `<div class ="consentBox">
                <h2 style="text-align: center;">Beleegyező nyilatkozat</h2>
                <p style="text-align: justify; max-width: 800px; margin: auto;">Felelősségem teljes tudatában kijelentem, hogy a mai napon az Eötvös Loránd Tudományegyetem, Bognár Miklós kutatásvezető által végzett vizsgálatban</p>
                    <ul style="text-align: justify; max-width: 800px; margin: auto;">
                    <li>önként veszek részt.</li>
                    <li>a vizsgálat jellegéről, annak megkezdése előtt kielégítő tájékoztatást kaptam.</li>
					<li>elmúltam 18 éves.</li>
                    <li>a vizsgálat idején alkohol vagy drogok hatása alatt nem állok.</li>
					<li>pszichiátriai betegségben nem szenvedek.</li>
					<li>nem vagyok színtévesztő.</li>
                    </ul>
                <p style="text-align: justify; max-width: 800px; margin: auto;">Tudomásul veszem, hogy az azonosításomra alkalmas személyi adataimat bizalmasan kezelik.
                    Hozzájárulok ahhoz, hogy a vizsgálat során a rólam felvett, személyem azonosítására nem alkalmas adatok más kutatók számára is hozzáférhetők legyenek.
                    Fenntartom a jogot arra, hogy a vizsgálat során annak folytatásától bármikor elállhassak. 
                    Ilyen esetben a rólam addig felvett adatokat törölni kell.</p>
                <p style="text-align: justify; max-width: 800px; margin: auto;">Tudomásul veszem, hogy csak a teljesen befejezett kitöltésért kapok pontot a <i>Pszichológiai kísérletben és tudományos aktivitásban való részvétel</i> nevű kurzuson.</p>
                
                
                <h2 style="text-align: center;">Adatkezelési tájékoztató</h2>
            	<p style="text-align: justify; max-width: 800px; margin: auto;">Szigorúan bizalmasan kezelünk minden olyan személyes információt, amit a kutatás keretén belül gyűjtünk össze. 
                A kutatás során nyert adatokat kóddal ellátva biztonságos számítógépeken tároljuk. A kutatás során nyert adatokat összegezzük. 
                Az ELTE PPK Affektív Pszichológia Tanszék Metatudomány Kutatócsoportja, mint adatkezelő, fenti személyes adataidat bizalmasan kezeli, más adatkezelőnek, adatfeldolgozónak nem adja át.
                E tényállás részleteit a <a href="http://metasciencelab.elte.hu/hozzajarulas-adatkezeleshez/" target=_blank">"Hozzájárulás adatkezeléshez"</a> c. dokumentum tartalmazza.</p>

            	<p style="text-align: justify; max-width: 800px; margin: auto;">Az adatkezelésről szóló szabályzásról részletesebben pedig itt tájékozódhatsz:
                <a href="https://ppk.elte.hu/file/Hozzajarulas_adatkezeleshez_melleklet_2018.pdf" target="_blank">Hozzájárulás adatkezeléshez melléklet</a></p>
            	<p style="text-align: justify; max-width: 800px; margin: auto;">A kutatás során nyert személyes adataidat arra használjuk fel, hogy regisztrálhassuk a részvételért járó kurzuspontokat. 
            	Az azonosítására alkalmas adatokat (NEPTUN-kód) ezután törölni fogjuk. A kezelt adatok a következők:</p>
                <ul style="text-align: justify; max-width: 800px; margin: auto;">
                    <li>Életkor</li>
                    <li>NEPTUN-kód</li>
                    <li>Nem</li>
                </ul>
            	<p style="text-align: justify; max-width: 800px; margin: auto;">Válaszaid nem lesznek semmilyen módon hozzád köthetők. Az anonimizált adataidat más kutatókkal megosztjuk.</p></div>`,

    "consentEn": `<div class ="consentBox">
                <h2 style="text-align: center;">Informed Consent Form</h2>
                <p style="text-align: justify; max-width: 800px; margin: auto;">I hereby declare with full awareness of my responsibility that today I am participating in a study conducted by Miklós Bognár (PI) and that the following apply to me:</p>
                    <ul style="text-align: justify; max-width: 800px; margin: auto;">
                    <li>I am participating voluntarily.</li>
                    <li>I received sufficient information regarding the nature of the experiment before it began.</li>
					<li>I am over 18 years of age.</li>
                    <li>I am not under the influence of alcohol or any illicit substances during the experiment.</li>
					<li>I do not have any form of psychiatric illness.</li>
					<li>I do not have any difficulties with color recognition.</li>
                    </ul>
                <p style="text-align: justify; max-width: 800px; margin: auto;">I acknowledge that my personal data capable of identifying me will be treated confidentially. 
                I consent to the data collected about me during the study — provided it is not capable of identifying me personally — being made accessible to other researchers. 
                I reserve the right to withdraw from the study at any time. 
                In such an event, the data collected about me up to that point will be deleted.</p>
                <p style="text-align: justify; max-width: 800px; margin: auto;">I acknowledge that only full completion of the experiment will earn me points in the <i>Participation in Psychological Experiments and Scientific Activity</i> course.</p>
                
                
                <h2 style="text-align: center;">Privacy Notice</h2>
            	<p style="text-align: justify; max-width: 800px; margin: auto;">We handle any personal data collected during the study strictly confidentially. 
                The accumulated data are pseudonymized and stored on a secure computer. The data collected during the study are aggregated.
                As data controller, the Metascience Lab of the Department of Affective Psychology, Faculty of Education and Psychology,Eötvös Loránd University handles your personal data confidentially and does not share them with other data controllers or data processors.
                Details about the aforementioned statements are included in the following document: <a href="http://metasciencelab.elte.hu/hozzajarulas-adatkezeleshez/" target=_blank">"Consent to Data Processing"</a>.</p>

            	<p style="text-align: justify; max-width: 800px; margin: auto;"> More information can be acquired regarding laws and regulations on data processing:
                <a href="https://ppk.elte.hu/file/Hozzajarulas_adatkezeleshez_melleklet_2018.pdf" target="_blank">Consent to Data Processing Appendix</a>.</p>
            	<p style="text-align: justify; max-width: 800px; margin: auto;">The collected personal data will be used to register your course points for your participation.
            	Data that can be used for identification (NEPTUN code) will be deleted afterwards. The processed data are the following:</p>
                <ul style="text-align: justify; max-width: 800px; margin: auto;">
                    <li>Age</li>
                    <li>NEPTUN code</li>
                    <li>Gender</li>
                </ul>
            	<p style="text-align: justify; max-width: 800px; margin: auto;">It will not be possible to identify you based on your answers. The anonymized data will be shared with other researchers.</p></div>`,

    "instructionsHun1": `<div class = "frame"><h1>Feladat</h1><h4>A képernyőn irányokat jelölő szavak („BAL”, „JOBB”, „FEL”, „LE”) fognak megjelenni,
                 amelyek különböző irányokba mozognak.
                A feladatod az lesz, hogy a szavak <i><b>mozgásirányára</b></i> reagálj. Ezt minél gyorsabban és pontosabban tedd!</h4>
                <h4>A szavak <i><b>többsége</b></i> fog azonos irányba mozogni, a többi véletlenszerűen.</h4>
                <h4>Kérlek, a szavak <i><b>többségének mozgásirányának</b></i> megfelelő gombot nyomd meg a billentyűzeten.</h4>
                <h2>Vigyázz!</h2>
                <h3>A szavak mozgásiránya nem biztos, hogy megegyezik a szavak által jelölt iránnyal.</h3>
                <p>Nyomd meg a <span class='key'>SZÓKÖZ</span>-t a folytatáshoz!</p></div>`,

    "instructionsHun2": `<div class="frame"><h3>Amikor a szó által jelölt irány és a mozgás iránya megegyezik:</h3>
                <div class="animFrameWord">
                <img src="jobb.png" class="animCongruentWord">
                </div>
                <h3>Amikor a szó által jelölt irány és a mozgás iránya ellentétes:</h3>
                <div class="animFrameWord">
                <img src="jobb.png" class="animIncongruentWord">
                </div>
                <h3>Mindig a <i>mozgás</i> irányára reagálj!</h3>
                <p>Nyomd meg a <span class='key'>SZÓKÖZ</span>-t a folytatáshoz!</p></div>`,

    "instructionsHun3": `<div class = "frame"><h3> Ha a szavak <i>balra</i> mozognak, nyomd meg az <span class ='key'>A</span> billentyűt! </h3> 
                <h3>Ha a szavak <i>jobbra</i> mozognak, nyomd meg a <span class ='key'>K</span> billentyűt!</h3> 
                <h3>Ha a szavak <i>felfelé</i> mozognak, nyomd meg az <span class ='key'>E</span> billentyűt! </h3> 
                <h3>Ha a szavak <i>lefelé</i> mozognak, nyomd meg a <span class ='key'>N</span> billentyűt! </h3>
                <p>Nyomd meg a <span class='key'>SZÓKÖZ</span>-t a folytatáshoz!</p></div>`,

    "instructionsHun4": `<div class = "frame"><h3>Kérlek, mindig igyekezz a minél gyorsabb és pontosabb válaszadásra.</h3>
                    <h3> A kísérlet egy gyakorló blokkal kezdődik.</h3>
                    <p> Nyomd meg a <span class='key'>SZÓKÖZ</span>-t a folytatáshoz!</p></div>`,

    "instructionsEn1": `<div class = "frame"><h1>Task</h1><h4>You will see words on the screen indicating certain
                directions ("LEFT", "RIGHT", "UP", "DOWN"). The words will also be moving in different directions.
                Your task is to react to the direction in which the words 
                are <i><b>moving</b></i> as quickly and as accurately as possible.</h4>
                <h4>The <i><b>majority</b></i> of the words will move in the same direction, while the rest of them will float on the screen randomly.</h4>
                <h4>Please press the key on your keyboard that corresponds to the direction in which the <i><b>majority</b></i> of the words are <i><b>moving</b></i>.</h4>
                <h2>Be careful!</h2>
                <h3>The direction the words move in may not match the direction they indicate.</h3>
                <p>Press <span class='key'>SPACE</span> to continue</p></div>`,

    "instructionsEn2": `<div class="frame"><h3>When the indicated direction matches the direction of the movement:</h3>
                <div class="animFrameWord">
                <img src="RIGHT.png" class="animCongruentWord">
                </div>
                <h3>When the indicated direction and the movement direction differ:</h3>
                <div class="animFrameWord">
                <img src="RIGHT.png" class="animIncongruentWord">
                </div>
                <h3>Always respond to the direction of the <i>movement</i>!</h3>
                <p>Press <span class='key'>SPACE</span> to continue</p></div>`,

    "instructionsEn3": `<div class = "frame"><h3>If the words are moving to the <i>left</i>, press the <span class='key'>A</span> key.</h3> 
                <h3>If the words are moving to the <i>right</i>, press the <span class='key'>K</span> key.</h3> 
                <h3>If the words are moving <i>upwards</i>, press the <span class='key'>E</span> key.</h3> 
                <h3>If the words are moving <i>downwards</i>, press the <span class='key'>N</span> key.</h3>
                <p>Press <span class='key'>SPACE</span> to continue</p></div>`,

    "instructionsEn4": `<div class = "frame"><h3>Please always try to respond as quickly and accurately as possible!</h3>
                    <h3>The experiment begins with a practice block.</h3>
                    <p> Press <span class='key'>SPACE</span> to continue</p></div>`}


var timeline = []

var language;

var preLoadTrial = {
    type: jsPsychPreload,
    images: ["le.png",
        "fel.png",
        "jobb.png",
        "bal.png",
        "UP.png",
        "DOWN.png",
        "RIGHT.png",
        "LEFT.png"],
    auto_preload: true
}

var imgLe = preLoadTrial.images[0];
var imgFel = preLoadTrial.images[1];
var imgJobb = preLoadTrial.images[2];
var imgBal = preLoadTrial.images[3];

var imgUP = preLoadTrial.images[4];
var imgDOWN = preLoadTrial.images[5];
var imgRIGHT = preLoadTrial.images[6];
var imgLEFT = preLoadTrial.images[7];


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
    stimulus: "flags.png",
    prompt: "<h2>Please choose a language!</h2>",
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
            return expText.welcomeHun
        }
        else if (language == "EN") {
            return expText.welcomeEn
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
         Kérlek, kattintsd a <span class="key"> Folytatás </span> gombra</b>!</p></div>`
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
    preamble: function () {
        if (language == "HUN") {
            return expText.consentHun
        }
        else if (language == "EN") {
            return expText.consentEn
        }
    },
    questions: [{
        prompt: function () {
            if (language == "HUN") {
                return `A beleegyező nyilatkozatot és az adatkezelési tájékoztatót elolvastam és beleegyezem a kutatásban való részvételbe.`
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
        if (language == "HUN") { return `<p>Kérlek, add meg a NEPTUN-kódod!</p>` }
        else if (language == "EN") { return `<p>Please enter your NEPTUN code!</p>` }
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
            if (language == "HUN") { return "Kérlek, add meg a nemed!" }
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
        if (language == "HUN") { return '<p>Kérlek, add meg az életkorod!</p>' }
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
            return [expText.instructionsHun1,
            expText.instructionsHun2,
            expText.instructionsHun3,
            expText.instructionsHun4]
        }
        else if (language == "EN") {
            return [expText.instructionsEn1,
            expText.instructionsEn2,
            expText.instructionsEn3,
            expText.instructionsEn4]
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
    oob_size: function () {
        if (language == "HUN") { return 20 }
        else if (language == "EN") { return 20 }
    },
    number_of_oobs: 30,
    coherence_movement: 60,
    trial_duration: trialDuration,
    stimulus_image: function () {
        var c = jsPsych.evaluateTimelineVariable("condition");
        if (language == "HUN") {
            if (["vertical_c1", "vertical_i1"].includes(c)) {
                return imgLe
            }
            else if (["vertical_c2", "vertical_i2"].includes(c)) {
                return imgFel
            }
            else if (["horizontal_c1", "horizontal_i1"].includes(c)) {
                return imgJobb
            }
            else if (["horizontal_c2", "horizontal_i2"].includes(c)) {
                return imgBal
            }
        }
        else if (language == "EN") {
            if (["vertical_c1", "vertical_i1"].includes(c)) {
                return imgDOWN
            }
            else if (["vertical_c2", "vertical_i2"].includes(c)) {
                return imgUP
            }
            else if (["horizontal_c1", "horizontal_i1"].includes(c)) {
                return imgRIGHT
            }
            else if (["horizontal_c2", "horizontal_i2"].includes(c)) {
                return imgLEFT
            }

        }
    },

    background_color: "white",
    oob_color: "black",
    choices: ['a', 'e', 'n', 'k'],
    aperture_height: 500,
    aperture_width: 800,
    coherence_orientation: 100,
    coherence_orientation_opposite: 0,
    coherence_movement_opposite: 0,
    coherent_movement_direction: function () {
        var c = jsPsych.evaluateTimelineVariable("condition");
        if (["horizontal_c1", "horizontal_i2"].includes(c)) { return 0 }
        else if (["horizontal_c2", "horizontal_i1"].includes(c)) { return 180 }
        else if (["vertical_c1", "vertical_i2"].includes(c)) { return 270 }
        else if (["vertical_c2", "vertical_i1"].includes(c)) { return 90 }
    },
    coherent_orientation: 0,
    correct_choice: function () {
        var c = jsPsych.evaluateTimelineVariable("condition");
        if (["horizontal_c1", "horizontal_i2"].includes(c)) { return ["k"] }
        else if (["horizontal_c2", "horizontal_i1"].includes(c)) { return ["a"] }
        else if (["vertical_c1", "vertical_i2"].includes(c)) { return ["n"] }
        else if (["vertical_c2", "vertical_i1"].includes(c)) { return ["e"] }
    },
    movement_speed: 7,
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
        data.condition = jsPsych.evaluateTimelineVariable("condition");
        console.log(data.key_press)
        console.log(data.correct_choice)
        console.log(data.congruency)
        console.log(data.condition)
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
            return `<div class = "frame"><p>Túl sokat hibáztál a gyakorló blokkban. Kérlek, nyomd meg a <span class="key">SPACE</span> billentyűt,
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
    console.log(preLoadTrial)

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
                    var correctRatio = jsPsych.data.get().filter({ isCorrect: true }).last(practiceTrials[i].length).count() / (lastBlock.count());
                    if (correctRatio >= 0.8125) {
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
                    return `<div class="frame"><h1>${j + 1}. Blokk kezdődik</h1></div>`
                }
                else if (language == "EN") {
                    return `<div class="frame"><h1>Block ${j + 1} begins</h1></div>`
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


try {
    jatos.onLoad(function () {
        console.log("Jatos loaded, starting experiment...")
        loadExperiment()
    }
    )
} catch (error) {
    console.log("Jatos was not found, starting experiment...")
    loadExperiment()
}