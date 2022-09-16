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
const ringSound = $("#endMeditation");
const timmingOption = $(".app-tool__wrapper--timming .app-tool__option-list a");
const timer = $(".app__timer span");
const toast = $(".toast");

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
    }
];

const timmingOptions = [ 5, 10, 15, 20, 30 ];
let startingTime;
let runningTime = 0;
let remainingTime = 0;
let intervalId;

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
    };

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


//Play/switch song
const handlePlaySong = (currentSong) => {
    //Close menu of song list
    songBtn.onclick();

    //Render info of selected song
    renderCurrentSong(currentSong);
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

const countDown = () => {
    runningTime = runningTime * 60;

    if (runningTime >= 0) {
        let minutes = Math.floor(runningTime / 60);
        let seconds = (runningTime % 60).toFixed(0); 
        
        if (seconds < 10) {
            seconds = "0" + seconds;
        };

        timer.innerText = `${minutes}:${seconds}`;

        runningTime--;
        remainingTime = runningTime/startingTime;
        //Fix the proportion to match with animation's speed
        remainingTime = remainingTime - ( 1/startingTime) * (1-remainingTime);

        runningTime = runningTime / 60;
    } else {
        clearInterval(intervalId);
        activeSong.pause();
        ringSound.play();
        showToast({
            title: "Congratulations",
            message: `You have completed ${startingTime/60} minutes of meditation`,
            type: "success",
        });
    };

};

//Set timming
const handleSetTime = (id) => {
    //Close menu of timing list
    timmingBtn.onclick();

    //Count Down
    runningTime = Number(id);
    startingTime = Number(id) * 60;
    timer.innerText = `${runningTime}:00`;

};

//User starts meditation 
playBtn.onclick = () => {
    if (activeSong && startingTime) {
        playBtn.classList.add("hide");
        pauseBtn.classList.add("show");
    
        //Start song
        activeSong.play();
    
        //Start countDown
        intervalId = setInterval(() => {
            countDown()
            styleCircleCountDown();
        }, 1000);

    } else {
        showToast({
            title: "Error",
            message: "To start the meditation, please choose a song and an amount of time.",
            type: "error",
        });

    };

};

//User pauses meditation 
pauseBtn.onclick = () => {
    playBtn.classList.remove("hide");
    pauseBtn.classList.remove("show");

    //Pause song
    activeSong.pause();
    clearInterval(intervalId);
};

//Style circle
const styleCircleCountDown = () => {
    const circleDashArray = `${(remainingTime * 283).toFixed(0)} 283`;
    $(".base-timer__path-remaining").setAttribute("stroke-dasharray", circleDashArray);
}

//----------------------------------------------------------------
//Toast messages display
const showToast = ({
    title = "",
    message = "",
    type = "info",
    duration = 3000
}) => {
    const toastField = $(".app__toast-msg");
    if (toastField) {
        const appearTime = duration + 1000;
        const delay = (duration/1000).toFixed(2);

        const icons = {
            infor: "<i class='fa-solid fa-circle-info'></i>",
            success: "<i class='fa-solid fa-circle-check'></i>",
            warning: "<i class='fa-solid fa-triangle-exclamation'></i>",
            error: "<i class='fa-sharp fa-solid fa-circle-exclamation'></i>",  
        };

        const icon = icons[type];
        const toast = document.createElement("div");
        toast.classList.add("toast", `toast--${type}`);
        toast.style.animation = `slideInLeft ease 0.3s, fadeOut linear 1s ${delay}s forwards`

        toast.innerHTML = `
            <div class="toast__icon">
                ${icon}
            </div>
            <div class="toast__body">
                <h3 class="toast__title">${title}</h3>
            <p class="toast__msg">${message}</p>
            </div>
            <div class="toast__close">
                <i class="fas fa-times"></i>
            </div> 
        `;
        
        toastField.appendChild(toast);

        //Remove toast message
        const autoRemoveId = setTimeout(() => {
            toastField.removeChild(toast);
            clearTimeout(autoRemoveId);
        }, appearTime);

        toast.onclick = e => {
            if (e.target.closest(".toast__close")) {
                toastField.removeChild(toast);
                clearTimeout(autoRemoveId);
            };

        };
    };
};