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

const backgroundMusic = document.getElementById("backgroundMusic");
const musicButton = document.getElementById("musicButton");
const musicText = document.getElementById("musicText");

const beginButton = document.getElementById("beginButton");
const openHeartButton = document.getElementById("openHeartButton");

const letterLock = document.getElementById("letterLock");
const finalLetter = document.getElementById("finalLetter");

const memoryGrid = document.getElementById("memoryGrid");
const floatingHearts = document.getElementById("floatingHearts");

let musicPlaying = false;
let loginInProgress = false;


/* ==========================================
   LOGIN
========================================== */

if (loginForm && passwordInput) {

    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();

        // Prevent multiple submissions
        if (loginInProgress) return;

        const enteredPassword = passwordInput.value.trim();

        /* ==========================
           CORRECT PASSWORD
        ========================== */

        if (enteredPassword === PASSWORD) {

            loginInProgress = true;

            if (loginError) {
                loginError.style.display = "none";
            }

            if (loginHint) {
                loginHint.style.display = "none";
            }

            // Create heart explosion
            createUnlockHearts();

            // Start unlocking animation
            if (loginGate) {
                loginGate.classList.add("unlocking");
            }


            /* ==========================
               SHOW UNLOCK SCREEN
            ========================== */

            setTimeout(function () {

                if (loginGate) {
                    loginGate.style.display = "none";
                }

                if (unlockScreen) {
                    unlockScreen.classList.add("show");
                }

            }, 900);


            /* ==========================
               SHOW MAIN CONTENT
            ========================== */

            setTimeout(function () {

                if (unlockScreen) {
                    unlockScreen.classList.remove("show");
                }

                if (mainContent) {
                    mainContent.classList.remove("hidden");
                }

                document.body.classList.add("site-open");

                createFloatingHearts();

            }, 2800);


            /* ==========================
               SCROLL TO HERO
            ========================== */

            setTimeout(function () {

                const hero = document.querySelector(".hero");

                if (hero) {

                    hero.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

            }, 3000);

        }


        /* ==========================
           WRONG PASSWORD
        ========================== */

        else {

            passwordInput.value = "";

            if (loginError) {
                loginError.style.display = "block";
            }

            if (loginHint) {
                loginHint.style.display = "block";
            }


            // Shake login card
            if (loginCard) {

                loginCard.classList.remove("shake");

                // Force browser reflow so animation can restart
                void loginCard.offsetWidth;

                loginCard.classList.add("shake");

            }


            // Hide hint after 3 seconds
            setTimeout(function () {

                if (loginHint) {
                    loginHint.style.display = "none";
                }

            }, 3000);

        }

    });

}


/* ==========================================
   PASSWORD — NUMBERS ONLY
========================================== */

if (passwordInput) {

    passwordInput.addEventListener("input", function () {

        passwordInput.value =
            passwordInput.value.replace(/\D/g, "");

    });

}


/* ==========================================
   UNLOCK HEART EXPLOSION
========================================== */

function createUnlockHearts() {

    const heartCount = 45;

    for (let i = 0; i < heartCount; i++) {

        const heart = document.createElement("div");

        heart.classList.add("unlock-heart-particle");

        heart.textContent = "❤️";


        const angle =
            Math.random() * Math.PI * 2;

        const distance =
            100 + Math.random() * 300;


        const x =
            Math.cos(angle) * distance;

        const y =
            Math.sin(angle) * distance;


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

    if (!backgroundMusic) return;

    backgroundMusic.play()
        .then(function () {

            musicPlaying = true;

            if (musicText) {
                musicText.textContent = "Playing";
            }

            if (musicButton) {
                musicButton.classList.add("playing");
            }

        })
        .catch(function (error) {

            console.warn(
                "Music could not be played:",
                error
            );

            musicPlaying = false;

            if (musicText) {
                musicText.textContent = "Music";
            }

        });

}


function pauseMusic() {

    if (!backgroundMusic) return;

    backgroundMusic.pause();

    musicPlaying = false;

    if (musicText) {
        musicText.textContent = "Music";
    }

    if (musicButton) {
        musicButton.classList.remove("playing");
    }

}


/* ==========================================
   MUSIC BUTTON
========================================== */

if (musicButton) {

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

}


/* ==========================================
   BEGIN BUTTON
========================================== */

if (beginButton) {

    beginButton.addEventListener(
        "click",
        function () {

            // Browsers allow music more reliably
            // when started from a user click.
            playMusic();


            const story =
                document.getElementById("story");

            if (story) {

                story.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        }
    );

}


/* ==========================================
   FLOATING HEARTS
========================================== */

function createFloatingHearts() {

    if (!floatingHearts) return;

    // Prevent creating them more than once
    if (floatingHearts.children.length > 0) {
        return;
    }


    const heartCount = 25;


    for (let i = 0; i < heartCount; i++) {

        const heart =
            document.createElement("span");

        heart.textContent = "❤️";

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


        floatingHearts.appendChild(heart);

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

                    // Stop observing once visible
                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.15
        }
    );


document
    .querySelectorAll(".reveal")
    .forEach(function (element) {

        observer.observe(element);

    });


/* ==========================================
   OPEN FINAL LETTER
========================================== */

if (openHeartButton) {

    openHeartButton.addEventListener(
        "click",
        function () {

            if (letterLock) {
                letterLock.classList.add("hidden");
            }


            setTimeout(function () {

                if (finalLetter) {

                    finalLetter.classList.remove("hidden");

                    finalLetter.classList.add(
                        "letter-open-animation"
                    );

                }

                createHeartRain();

            }, 500);

        }
    );

}


/* ==========================================
   HEART RAIN SURPRISE
========================================== */

function createHeartRain() {

    const heartCount = 70;


    for (let i = 0; i < heartCount; i++) {

        const heart =
            document.createElement("div");

        heart.textContent = "❤️";

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


    /* ==========================
       VIDEOS
    ========================== */

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
            "First TikTok video with you. ❤️"
    }

];


/* ==========================================
   CREATE MEMORY CARDS
========================================== */

if (memoryGrid) {

    mediaList.forEach(function (media, index) {

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
            ["mp4", "webm", "ogg"].includes(
                extension
            );


        let mediaElement;


        /* ==========================
           VIDEO
        ========================== */

        if (isVideo) {

            mediaElement = `

                <video
                    src="photos/${media.file}"
                    muted
                    loop
                    playsinline
                    preload="metadata"
                ></video>

                <div class="video-label">
                    ▶ VIDEO
                </div>

            `;

        }


        /* ==========================
           IMAGE
        ========================== */

        else {

            mediaElement = `

                <img
                    src="photos/${media.file}"
                    alt="Our Memory ${index + 1}"
                    loading="lazy"
                >

            `;

        }


        /* ==========================
           CARD HTML
        ========================== */

        card.innerHTML = `

            <div class="photo-wrapper">

                ${mediaElement}

                <div class="photo-number">
                    ${String(index + 1).padStart(2, "0")}
                </div>

            </div>

            <p>
                ${media.caption}
            </p>

        `;


        memoryGrid.appendChild(card);


        // Observe newly created card
        observer.observe(card);

    });

}
