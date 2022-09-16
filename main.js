const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const listOfBtns = $$(".app-tool__btn");
const songBtn = $(".app-tool__btn.app-tool__btn—-song");
const timmingBtn = $(".app-tool__btn.app-tool__btn—-timer");
const playBtn = $(".app-tool__btn.app-tool__btn—-play");
const pauseBtn = $(".app-tool__btn.app-tool__btn—-pause");
const song = $(".app-tool__wrapper--song .app-tool__option-list a");
const activeSongField = $(".app-tool__active-song");
const activeSong = $("#audio");
const timmingOption = $(".app-tool__wrapper--timming .app-tool__option-list a");
const timer = $(".app__timer span");

const songList = [
    {
        name: "A mediation",
        path: "./assets/songs/a-meditation-118554.mp3"
    },
    {
        name: "Meditative Rain",
        path: "./assets/songs/meditative-rain.mp3"
    },
    {
        name: "Mindfulness",
        path: "./assets/songs/mindfulness-relaxation-amp-meditation-music-22174.mp3"
    },
    {
        name: "Rainforest",
        path: "./assets/songs/Rain-Sound-and-Rainforest.mp3"
    },
    {
        name: "A voice of nature",
        path: "./assets/songs/voice-of-nature-20683.mp3"
    },
];

const timmingOptions = [ 1, 5, 10, 15, 20 ];
let selectedTiming = 5;
let finishCounting = false;

//Render list of songs
$(".app-tool__wrapper.app-tool__wrapper--song .app-tool__option-list").innerHTML = songList.map( song => (
        `<a onclick="handlePlaySong(this)">${song.name}</a>`
    )
).join("");

//Render list of timming options 
$(".app-tool__wrapper.app-tool__wrapper--timming .app-tool__option-list").innerHTML = timmingOptions.map((option) => (
        `<a id=${option} onclick="handleSetTime(id)">${option} minutes</a>`
    )
).join("");

//Render current song
const renderCurrentSong = (currentSong) => {
    //Remove old active song
    const oldSong = $(".app-tool__active-song h2")
    if (oldSong) {
        activeSongField.removeChild(oldSong)
    }

    //Add new active song
    const h2 = document.createElement("h2");
    h2.innerText = currentSong.innerText;
    activeSongField.appendChild(h2);

    const url = songList.find(item => item.name === currentSong.innerText).path;
    activeSong.src = url;
}

//Function to check active button + remove active status
const handleActiveStatus = (e) => {
    let activeBtn;
    listOfBtns.forEach(btn => {
        const isActive = btn.className.includes("active");
        
        if (isActive) {
            btn.classList.remove("active");
            activeBtn = btn;
        };
        
    });

    return activeBtn;
}
//----------------------------------------------------------------
// User opens song list
songBtn.onclick = () => {
    const activeBtn = handleActiveStatus();

    if (activeBtn !== songBtn) {
        songBtn.classList.add("active");
    } else {
        songBtn.classList.remove("active");
    };

};

//User plays/pauses song
playBtn.onclick = () => {
    playBtn.classList.add("hide");
    pauseBtn.classList.add("show");
    activeSong.play();

};

pauseBtn.onclick = () => {
    playBtn.classList.remove("hide");
    pauseBtn.classList.remove("show");
    activeSong.pause();
};

//Play/switch song
const handlePlaySong = (currentSong) => {
    //Close menu of song list
    songBtn.onclick();

    //Render info of selected song
    renderCurrentSong(currentSong);

    //Play selected song
    playBtn.onclick();
};

//----------------------------------------------------------------
//User opens list of timing
timmingBtn.onclick = () => {
    const activeBtn = handleActiveStatus();

    if (activeBtn !== timmingBtn) {
        timmingBtn.classList.add("active");
    } else {
        timmingBtn.classList.remove("active");
    };

};

console.log(selectedTiming)

const countDown = (intervalId) => {
    let totalTime = selectedTiming * 60;
    console.log(totalTime)
    if (totalTime >= 0) {
        let minutes = Math.floor(totalTime / 60);
        let seconds = (totalTime % 60).toFixed(0); 

        if (seconds < 10) {
            seconds = "0" + seconds;
        };

        timer.innerText = `${minutes}:${seconds}`;
        totalTime--;
        selectedTiming = totalTime / 60;
    } else {
        clearInterval(intervalId);
    };


};

const handleSetTime = (id) => {
    //Close menu of timing list
    timmingBtn.onclick();

    //Count Down
    selectedTiming = Number(id);
    const intervalId = setInterval(() => {
       countDown(intervalId)
   }, 1000);
};

if (finishCounting) {
    console.log("finishCounting")
}