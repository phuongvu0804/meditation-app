const listOfBtns = document.querySelectorAll(".app-tool__btn");
const songBtn = document.querySelector(".app-tool__btn.app-tool__btn—-song");
const timmingBtn = document.querySelector(".app-tool__btn.app-tool__btn—-timer");
const playBtn = document.querySelector(".app-tool__btn.app-tool__btn—-play");
const pauseBtn = document.querySelector(".app-tool__btn.app-tool__btn—-pause");

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

// User selects song
songBtn.onclick = () => {
    const activeBtn = handleActiveStatus();

    if (activeBtn !== songBtn) {
        songBtn.classList.add("active");
    } else {
        songBtn.classList.remove("active");
    };

};

//User selects timing
timmingBtn.onclick = () => {
    const activeBtn = handleActiveStatus();

    if (activeBtn !== timmingBtn) {
        timmingBtn.classList.add("active");
    } else {
        timmingBtn.classList.remove("active");
    };

};

//User plays/pause music
playBtn.onclick = () => {
    playBtn.classList.add("hide");
    pauseBtn.classList.add("show");
};

pauseBtn.onclick = () => {
    playBtn.classList.remove("hide");
    pauseBtn.classList.remove("show");
};