// ==================================================================== Audios Assets ==================================================================
const normalAudios = [
    { id: 0, text: "Agırlıkları yerine bırakınız uyarısı", audio: new Audio("./assets/agirlik.mp3") },
    { id: 1, text: "Ayakkabı uyarısı", audio: new Audio("./assets/ayakkabi.mp3") },
    { id: 2, text: "Esyalarınızı unutmayın uyarısı", audio: new Audio("./assets/esya.mp3") },
    { id: 3, text: "Havlu kullanımı uyarısı", audio: new Audio("./assets/havlu.mp3") },
    { id: 4, text: "Soyunma odası hijyen uyarısı", audio: new Audio("./assets/hijyen.mp3") },
];

const closingAudios = [
    new Audio("./assets/close5.mp3"),
    new Audio("./assets/close10.mp3"),
    new Audio("./assets/close15.mp3"),
];
// ==================================================================== Audios Assets ==================================================================





// ==================================================================== Closing Time ==================================================================

let closingTime = new Date();

if (localStorage.getItem('closingTime')) {
    const savedClosingTime = localStorage.getItem('closingTime');
    closingTime.setHours(savedClosingTime.slice(0, 2));
    closingTime.setMinutes(savedClosingTime.slice(3, 5));
} else {
    closingTime.setHours(22);
    closingTime.setMinutes(0);
}

const closingTimeHoursInput = document.getElementById('closing-time-hours');
const closingTimeMinutesInput = document.getElementById('closing-time-minutes');
const closingTimeButton = document.getElementById('closing-time-button');

closingTimeHoursInput.value = closingTime.toLocaleTimeString([], { hour: '2-digit', hour12: false });
closingTimeMinutesInput.value = closingTime.getMinutes().toString()[0] + "" + (closingTime.getMinutes().toString()[1] || 0);

closingTimeButton.addEventListener('click', setClosingTime);


function setClosingTime() {
    closingTime.setHours(closingTimeHoursInput.value);
    closingTime.setMinutes(closingTimeMinutesInput.value);

    closingTimeHoursInput.value = closingTime.toLocaleTimeString([], { hour: '2-digit', hour12: false });
    closingTimeMinutesInput.value = closingTime.getMinutes().toString()[0] + "" + (closingTime.getMinutes().toString()[1] || 0)

    localStorage.setItem('closingTime', `${closingTimeHoursInput.value}:${closingTimeMinutesInput.value}`);
}
// ==================================================================== Closing Time ==================================================================





// ==================================================================== Play Per Minute ===============================================================
let playAudiosPerMinute = localStorage.getItem('playAudiosPerMinute') || 30;
let indexAudioPerMinute = 0;

const playAudiosPerMinuteInput = document.getElementById("play-audios-per-minute-input");
const playAudiosPerMinuteButton = document.getElementById("play-audios-per-minute-button");
playAudiosPerMinuteInput.value = playAudiosPerMinute;

function setPlayAudiosPerMinute() {
    playAudiosPerMinute = playAudiosPerMinuteInput.value;
    localStorage.setItem('playAudiosPerMinute' , playAudiosPerMinute);
}

playAudiosPerMinuteButton.addEventListener("click" , setPlayAudiosPerMinute);


function playPerMinute(timeDiff){

    if(timeDiff % playAudiosPerMinute === 0){
        // console.log(timeDiff)
        // console.log(timeDiff % playAudiosPerMinute)
        // console.log(indexAudioPerMinute)

        playAudio(normalAudios[indexAudioPerMinute].audio);

        if(indexAudioPerMinute < normalAudios.length -1){
            indexAudioPerMinute++;
        }else{
            indexAudioPerMinute = 0;
        }
    }
}
// ==================================================================== Play Per Minute ===============================================================





// ==================================================================== Audio Volume Range ============================================================
const audioRange = document.getElementById("audio-range");
let = audioVolume = 0.5;
let isPlaying = false;

audioRange.addEventListener("input", () => {
    audioVolume = audioRange.value;
})
// ==================================================================== Audio Volume Range ============================================================





// ==================================================================== Manual Audios ================================================================
const manualAudiosContainer = document.getElementById("manual-audio-div");


// create manual audio elements 
const manualAudiosElements = normalAudios.map((item) => {
    const element = document.createElement("div");

    element.innerHTML = `
    <div class="row justify-content-center align-items-center bg-success p-1 m-1 fs-6">
    <div class="col">${item.text}</div>

    <button id="${item.id}" class="col-1 btn btn-primary justify-content-center p-2 rounded">Çal</button>
    </div>
    `;

    return element;
});

// add event to elemets button's and append to container
manualAudiosElements.forEach((element) => {
    const button = element.querySelector('button');
    // button.disabled = isPlaying;

    button.addEventListener("click", () => {
        let id = button.getAttribute("id");
        playAudio(normalAudios[id].audio);
    })

    manualAudiosContainer.appendChild(element);
})

function playAudio(audio) {



        if(!isPlaying){
            isPlaying = true;
        audio.volume = audioVolume;
        audio.play();
        
        setTimeout(() => {
            audio.play();
            isPlaying = false;
        },  14 * 1000   )
        }

        



    
}
// ==================================================================== Manual Audios ================================================================





// ==================================================================== Clock ================================================================
var time = new Date();
const clock = document.getElementById('clock');
clock.innerHTML = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });


function updateTime() {
    time = new Date();

    let timeDiff = Math.round((closingTime - time) / 60 / 1000);

    if (timeDiff <= 15 && timeDiff >= 5) {
        if (timeDiff == 15) {
            closingAudios[2].play();
        } else if (timeDiff == 10) {
            closingAudios[1].play();
        } else if (timeDiff == 5) {
            closingAudios[0].play();
        }
    }


    playPerMinute(timeDiff);

    clock.innerHTML = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

}

setInterval(updateTime, 1000 * 60  );
// playAudio(normalAudios[0].audio);

// ==================================================================== Manual Audios ================================================================



