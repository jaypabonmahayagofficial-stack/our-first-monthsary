/* ==========================================
   PASSWORD
========================================== */

const PASSWORD = "080226";


/* ==========================================
   ELEMENTS
========================================== */

const loginGate = document.getElementById("loginGate");
const loginForm = document.getElementById("loginForm");
const passwordInput = document.getElementById("password");

const loginError = document.getElementById("loginError");
const loginHint = document.getElementById("loginHint");
const loginCard = document.getElementById("loginCard");

const unlockScreen = document.getElementById("unlockScreen");
const mainContent = document.getElementById("mainContent");

const backgroundMusic =
    document.getElementById("backgroundMusic");

const musicButton =
    document.getElementById("musicButton");

const musicText =
    document.getElementById("musicText");

const beginButton =
    document.getElementById("beginButton");

const openHeartButton =
    document.getElementById("openHeartButton");

const letterLock =
    document.getElementById("letterLock");

const finalLetter =
    document.getElementById("finalLetter");


let musicPlaying = false;


/* ==========================================
   LOGIN
========================================== */

loginForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const enteredPassword =
        passwordInput.value;


    if (enteredPassword === PASSWORD) {

        loginError.style.display = "none";
        loginHint.style.display = "none";


        /* SUCCESS EFFECT */

        createUnlockHearts();


        loginGate.classList.add("unlocking");


        setTimeout(function () {

            loginGate.style.display = "none";

            unlockScreen.classList.add("show");

        }, 900);


        setTimeout(function () {

            unlockScreen.classList.remove("show");

            mainContent.classList.remove("hidden");

            document.body.classList.add("site-open");

            createFloatingHearts();

        }, 2800);


        setTimeout(function () {

            document.querySelector(".hero")
                .scrollIntoView({
                    behavior: "smooth"
                });

        }, 3000);

    }

    else {

        passwordInput.value = "";

        loginError.style.display = "block";

        loginHint.style.display = "block";


        loginCard.classList.remove("shake");

        void loginCard.offsetWidth;

        loginCard.classList.add("shake");


        setTimeout(function () {

            loginHint.style.display = "none";

        }, 3000);

    }

});


/* NUMBERS ONLY */

passwordInput.addEventListener("input", function () {

    passwordInput.value =
        passwordInput.value.replace(/\D/g, "");

});


/* ==========================================
   UNLOCK HEART EXPLOSION
========================================== */

function createUnlockHearts() {

    for (let i = 0; i < 45; i++) {

        const heart =
            document.createElement("div");

        heart.classList.add("unlock-heart-particle");

        heart.innerHTML = "❤️";


        const angle =
            Math.random() * 360;

        const distance =
            100 + Math.random() * 300;


        const x =
            Math.cos(angle * Math.PI / 180)
            * distance;

        const y =
            Math.sin(angle * Math.PI / 180)
            * distance;


        heart.style.setProperty(
            "--x",
            `${x}px`
        );

        heart.style.setProperty(
            "--y",
            `${y}px`
        );


        document.body.appendChild(heart);


        setTimeout(function () {

            heart.remove();

        }, 2000);

    }

}


/* ==========================================
   MUSIC
========================================== */

function playMusic() {

    backgroundMusic.play()
        .then(function () {

            musicPlaying = true;

            musicText.textContent =
                "Playing";

        })
        .catch(function () {

            musicPlaying = false;

            musicText.textContent =
                "Music";

        });

}


function pauseMusic() {

    backgroundMusic.pause();

    musicPlaying = false;

    musicText.textContent =
        "Music";

}


musicButton.addEventListener(
    "click",
    function () {

        if (musicPlaying) {

            pauseMusic();

        }

        else {

            playMusic();

        }

    }
);


beginButton.addEventListener(
    "click",
    function () {

        playMusic();


        document.getElementById("story")
            .scrollIntoView({
                behavior: "smooth"
            });

    }
);


/* ==========================================
   FLOATING HEARTS
========================================== */

function createFloatingHearts() {

    const container =
        document.getElementById("floatingHearts");


    for (let i = 0; i < 25; i++) {

        const heart =
            document.createElement("span");

        heart.innerHTML = "❤️";

        heart.classList.add(
            "floating-heart"
        );


        heart.style.left =
            Math.random() * 100 + "%";


        heart.style.animationDuration =
            6 + Math.random() * 8 + "s";


        heart.style.animationDelay =
            Math.random() * 5 + "s";


        heart.style.fontSize =
            12 + Math.random() * 20 + "px";


        container.appendChild(heart);

    }

}


/* ==========================================
   SCROLL REVEAL
========================================== */

const observer =
    new IntersectionObserver(
        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "visible"
                    );

                }

            });

        },
        {
            threshold: 0.15
        }
    );


document.querySelectorAll(".reveal")
    .forEach(function (element) {

        observer.observe(element);

    });


/* ==========================================
   OPEN FINAL LETTER
========================================== */

openHeartButton.addEventListener(
    "click",
    function () {

        letterLock.classList.add("hidden");


        setTimeout(function () {

            finalLetter.classList.remove("hidden");

            finalLetter.classList.add(
                "letter-open-animation"
            );


            createHeartRain();

        }, 500);

    }
);


/* ==========================================
   HEART RAIN SURPRISE
========================================== */

function createHeartRain() {

    for (let i = 0; i < 70; i++) {

        const heart =
            document.createElement("div");

        heart.innerHTML = "❤️";

        heart.classList.add(
            "rain-heart"
        );


        heart.style.left =
            Math.random() * 100 + "%";


        heart.style.animationDelay =
            Math.random() * 2 + "s";


        heart.style.fontSize =
            15 + Math.random() * 25 + "px";


        document.body.appendChild(heart);


        setTimeout(function () {

            heart.remove();

        }, 6000);

    }

}


/* ==========================================
   PHOTO / VIDEO MEMORIES
========================================== */

const mediaList = [

    {
        file: "photo10.jpeg",
        caption:
            "One of the moments I'll always remember—our first night together, sightseeing at night, admiring the moon and the fog, sharing our first hug, and our first kiss. ❤️"
    },

    {
        file: "Photo9.jpeg",
        caption:
            "Your bading Miguel ❤️"
    },

    {
        file: "Photo5.jpeg",
        caption:
            "One of the moments I'll always remember, our first morning together. ❤️"
    },

    {
        file: "Photo8.jpeg",
        caption:
            "Simple moments become special because this is the day you finally said we're official. ❤️"
    },

    {
        file: "Photo1.jpeg",
        caption:
            "Our first travel together."
    },

    {
        file: "Photo2.jpeg",
        caption:
            "Our first travel together."
    },
   {
        file: "Photo11.jpeg",
        caption:
            "Our first travel together."
    },
   {
        file: "Photo12.jpeg",
        caption:
            "Our first travel together."
    },
    {
        file: "Photo3.png",
        caption:
            "Our first travel together."
    },

    {
        file: "photo6.jpeg",
        caption:
            "Celebrating your special day. ❤️"
    },

    {
        file: "photo7.jpeg",
        caption:
            "Celebrating your special day."
    },

    {
        file: "Photo4.jpeg",
        caption:
            "I hope we make many more memories like this."
    },


    /* VIDEOS */

    {
        file: "vid1.mp4",
        caption:
            "My driver. ❤️"
    },

    {
        file: "vid2.mp4",
        caption:
            "Camiguin Island with you. ❤️"
    },

    {
        file: "vid3.mp4",
        caption:
            "My Chief. ❤️"
    },

    {
        file: "vid4.mp4",
        caption:
            "Sunset with you."
    },

    {
        file: "vid5.mp4",
        caption:
            "Falls with you."
    },

    {
        file: "vid6.mp4",
        caption:
            "Lovers carry. ❤️"
    },

    {
        file: "vid7.mp4",
        caption:
            "My Happiness. ❤️"
    },

    {
        file: "vid8.mp4",
        caption:
            "White Island."
    },

    {
        file: "vid9.mp4",
        caption:
            "White Island."
    },

    {
        file: "vid10.mp4",
        caption:
            "Rides with you. ❤️"
    },
   {
        file: "vid11.mp4",
        caption:
            "First tiktok vid with you. ❤️"
    }

];


const memoryGrid =
    document.getElementById("memoryGrid");


mediaList.forEach(function (
    media,
    index
) {

    const card =
        document.createElement("div");

    card.classList.add(
        "memory-card",
        "reveal"
    );


    const extension =
        media.file
            .split(".")
            .pop()
            .toLowerCase();


    const isVideo =
        extension === "mp4";


    let mediaElement;


    if (isVideo) {

        mediaElement = `

            <video
                src="photos/${media.file}"
                autoplay
                muted
                loop
                playsinline
            ></video>

            <div class="video-label">
                ▶ VIDEO
            </div>

        `;

    }

    else {

        mediaElement = `

            <img
                src="photos/${media.file}"
                alt="Our Memory ${index + 1}"
                loading="lazy"
            >

        `;

    }


    card.innerHTML = `

        <div class="photo-wrapper">

            ${mediaElement}

            <div class="photo-number">

                ${String(index + 1)
                    .padStart(2, "0")}

            </div>

        </div>


        <p>
            ${media.caption}
        </p>

    `;


    memoryGrid.appendChild(card);

    observer.observe(card);

});
