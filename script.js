/* =========================================================
   OUR FIRST CHAPTER ❤️
   MAIN JAVASCRIPT
========================================================= */


/* =========================================================
   PASSWORD
========================================================= */

const PASSWORD = "080226";


/* =========================================================
   ELEMENTS
========================================================= */

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

const memoryGrid =
    document.getElementById("memoryGrid");

const floatingHearts =
    document.getElementById("floatingHearts");


let musicPlaying = false;


/* =========================================================
   LOGIN
========================================================= */

if (loginForm) {

    loginForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const enteredPassword =
                passwordInput.value.trim();


            /* -----------------------------------------
               CORRECT PASSWORD
            ----------------------------------------- */

            if (enteredPassword === PASSWORD) {

                loginError.style.display = "none";
                loginHint.style.display = "none";


                /* Create heart explosion */

                createUnlockHearts();


                /* Add unlock animation */

                loginGate.classList.add(
                    "unlocking"
                );


                /* Hide login */

                setTimeout(
                    function () {

                        loginGate.style.display =
                            "none";

                        unlockScreen.classList.add(
                            "show"
                        );

                    },
                    900
                );


                /* Show main website */

                setTimeout(
                    function () {

                        unlockScreen.classList.remove(
                            "show"
                        );

                        mainContent.classList.remove(
                            "hidden"
                        );

                        document.body.classList.add(
                            "site-open"
                        );


                        createFloatingHearts();


                        /*
                         * Start videos after
                         * website becomes visible
                         */

                        startAllVideos();


                    },
                    2800
                );


                /* Scroll to hero */

                setTimeout(
                    function () {

                        const hero =
                            document.querySelector(
                                ".hero"
                            );


                        if (hero) {

                            hero.scrollIntoView({
                                behavior: "smooth"
                            });

                        }

                    },
                    3000
                );

            }


            /* -----------------------------------------
               WRONG PASSWORD
            ----------------------------------------- */

            else {

                passwordInput.value = "";

                loginError.style.display =
                    "block";

                loginHint.style.display =
                    "block";


                /* Shake login card */

                loginCard.classList.remove(
                    "shake"
                );


                void loginCard.offsetWidth;


                loginCard.classList.add(
                    "shake"
                );


                /* Hide hint */

                setTimeout(
                    function () {

                        loginHint.style.display =
                            "none";

                    },
                    3000
                );

            }

        }
    );

}


/* =========================================================
   PASSWORD INPUT
   NUMBERS ONLY
========================================================= */

if (passwordInput) {

    passwordInput.addEventListener(
        "input",
        function () {

            passwordInput.value =
                passwordInput.value.replace(
                    /\D/g,
                    ""
                );

        }
    );

}


/* =========================================================
   UNLOCK HEART EXPLOSION
========================================================= */

function createUnlockHearts() {

    for (
        let i = 0;
        i < 45;
        i++
    ) {

        const heart =
            document.createElement("div");


        heart.classList.add(
            "unlock-heart-particle"
        );


        heart.innerHTML =
            "❤️";


        const angle =
            Math.random() * 360;


        const distance =
            100 +
            Math.random() * 300;


        const x =
            Math.cos(
                angle * Math.PI / 180
            ) *
            distance;


        const y =
            Math.sin(
                angle * Math.PI / 180
            ) *
            distance;


        heart.style.setProperty(
            "--x",
            `${x}px`
        );


        heart.style.setProperty(
            "--y",
            `${y}px`
        );


        heart.style.fontSize =
            `${12 + Math.random() * 25}px`;


        document.body.appendChild(
            heart
        );


        setTimeout(
            function () {

                heart.remove();

            },
            2000
        );

    }

}


/* =========================================================
   MUSIC
========================================================= */

function playMusic() {

    if (!backgroundMusic) {
        return;
    }


    backgroundMusic.volume = 0.7;


    const playPromise =
        backgroundMusic.play();


    if (
        playPromise !== undefined
    ) {

        playPromise
            .then(
                function () {

                    musicPlaying = true;


                    if (musicText) {

                        musicText.textContent =
                            "Playing";

                    }


                    if (musicButton) {

                        musicButton.classList.add(
                            "playing"
                        );

                    }

                }
            )
            .catch(
                function (error) {

                    console.log(
                        "Music autoplay blocked:",
                        error
                    );


                    musicPlaying = false;


                    if (musicText) {

                        musicText.textContent =
                            "Music";

                    }

                }
            );

    }

}


function pauseMusic() {

    if (!backgroundMusic) {
        return;
    }


    backgroundMusic.pause();


    musicPlaying = false;


    if (musicText) {

        musicText.textContent =
            "Music";

    }


    if (musicButton) {

        musicButton.classList.remove(
            "playing"
        );

    }

}


/* =========================================================
   MUSIC BUTTON
========================================================= */

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


/* =========================================================
   BEGIN OUR STORY
========================================================= */

if (beginButton) {

    beginButton.addEventListener(
        "click",
        function () {

            /*
             * User interaction allows
             * music to start more reliably.
             */

            playMusic();


            const story =
                document.getElementById(
                    "story"
                );


            if (story) {

                story.scrollIntoView({
                    behavior: "smooth"
                });

            }


            /*
             * Also attempt to start
             * all videos.
             */

            startAllVideos();

        }
    );

}


/* =========================================================
   FLOATING HEARTS
========================================================= */

function createFloatingHearts() {

    if (!floatingHearts) {
        return;
    }


    /*
     * Prevent duplicate hearts
     */

    floatingHearts.innerHTML = "";


    for (
        let i = 0;
        i < 25;
        i++
    ) {

        const heart =
            document.createElement("span");


        heart.innerHTML =
            "❤️";


        heart.classList.add(
            "floating-heart"
        );


        heart.style.left =
            Math.random() * 100 +
            "%";


        heart.style.animationDuration =
            6 +
            Math.random() * 8 +
            "s";


        heart.style.animationDelay =
            Math.random() * 5 +
            "s";


        heart.style.fontSize =
            12 +
            Math.random() * 20 +
            "px";


        floatingHearts.appendChild(
            heart
        );

    }

}


/* =========================================================
   SCROLL REVEAL
========================================================= */

const observer =
    new IntersectionObserver(
        function (entries) {

            entries.forEach(
                function (entry) {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );

                    }

                }
            );

        },
        {
            threshold: 0.15
        }
    );


document
    .querySelectorAll(".reveal")
    .forEach(
        function (element) {

            observer.observe(
                element
            );

        }
    );


/* =========================================================
   OPEN FINAL LETTER
========================================================= */

if (openHeartButton) {

    openHeartButton.addEventListener(
        "click",
        function () {

            /*
             * Hide lock screen
             */

            letterLock.classList.add(
                "hidden"
            );


            /*
             * Open letter
             */

            setTimeout(
                function () {

                    finalLetter.classList.remove(
                        "hidden"
                    );


                    finalLetter.classList.add(
                        "letter-open-animation"
                    );


                    /*
                     * Heart rain
                     */

                    createHeartRain();


                    /*
                     * Scroll to letter
                     */

                    setTimeout(
                        function () {

                            finalLetter.scrollIntoView({
                                behavior: "smooth",
                                block: "center"
                            });

                        },
                        200
                    );

                },
                500
            );

        }
    );

}


/* =========================================================
   HEART RAIN SURPRISE
========================================================= */

function createHeartRain() {

    for (
        let i = 0;
        i < 70;
        i++
    ) {

        const heart =
            document.createElement("div");


        heart.innerHTML =
            "❤️";


        heart.classList.add(
            "rain-heart"
        );


        heart.style.left =
            Math.random() * 100 +
            "%";


        heart.style.animationDelay =
            Math.random() * 2 +
            "s";


        heart.style.fontSize =
            15 +
            Math.random() * 25 +
            "px";


        document.body.appendChild(
            heart
        );


        setTimeout(
            function () {

                heart.remove();

            },
            6500
        );

    }

}


/* =========================================================
   PHOTO / VIDEO MEMORIES
========================================================= */

const mediaList = [

    /* =========================
       PHOTOS
    ========================= */

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


    /* =========================
       VIDEOS
    ========================= */

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
            "First TikTok vid with you. ❤️"
    }

];


/* =========================================================
   CREATE MEDIA CARDS
========================================================= */

function createMediaCards() {

    if (!memoryGrid) {
        return;
    }


    /*
     * Clear existing content
     */

    memoryGrid.innerHTML = "";


    mediaList.forEach(
        function (media, index) {

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


            /* =================================================
               VIDEO
            ================================================= */

            if (isVideo) {

                const wrapper =
                    document.createElement("div");


                wrapper.classList.add(
                    "photo-wrapper"
                );


                const video =
                    document.createElement("video");


                /*
                 * VIDEO SOURCE
                 */

                video.src =
                    "photos/" +
                    media.file;


                /*
                 * CRITICAL AUTOPLAY SETTINGS
                 */

                video.autoplay =
                    true;


                video.muted =
                    true;


                video.loop =
                    true;


                video.playsInline =
                    true;


                video.controls =
                    false;


                /*
                 * HTML attributes
                 * for maximum compatibility
                 */

                video.setAttribute(
                    "autoplay",
                    ""
                );


                video.setAttribute(
                    "muted",
                    ""
                );


                video.setAttribute(
                    "loop",
                    ""
                );


                video.setAttribute(
                    "playsinline",
                    ""
                );


                video.setAttribute(
                    "webkit-playsinline",
                    ""
                );


                /*
                 * Preload video
                 */

                video.preload =
                    "auto";


                /*
                 * Add video
                 */

                wrapper.appendChild(
                    video
                );


                /*
                 * Video label
                 */

                const videoLabel =
                    document.createElement(
                        "div"
                    );


                videoLabel.classList.add(
                    "video-label"
                );


                videoLabel.innerHTML =
                    "▶ VIDEO";


                wrapper.appendChild(
                    videoLabel
                );


                /*
                 * Number
                 */

                const number =
                    document.createElement(
                        "div"
                    );


                number.classList.add(
                    "photo-number"
                );


                number.textContent =
                    String(index + 1)
                        .padStart(2, "0");


                wrapper.appendChild(
                    number
                );


                /*
                 * Add wrapper
                 */

                card.appendChild(
                    wrapper
                );


                /*
                 * Caption
                 */

                const caption =
                    document.createElement(
                        "p"
                    );


                caption.textContent =
                    media.caption;


                card.appendChild(
                    caption
                );


                /*
                 * Add card to page
                 */

                memoryGrid.appendChild(
                    card
                );


                /*
                 * Observe reveal
                 */

                observer.observe(
                    card
                );


                /*
                 * Start video
                 */

                startVideo(
                    video
                );

            }


            /* =================================================
               IMAGE
            ================================================= */

            else {

                const wrapper =
                    document.createElement(
                        "div"
                    );


                wrapper.classList.add(
                    "photo-wrapper"
                );


                const image =
                    document.createElement(
                        "img"
                    );


                image.src =
                    "photos/" +
                    media.file;


                image.alt =
                    "Our Memory " +
                    (index + 1);


                image.loading =
                    "lazy";


                wrapper.appendChild(
                    image
                );


                /*
                 * Number
                 */

                const number =
                    document.createElement(
                        "div"
                    );


                number.classList.add(
                    "photo-number"
                );


                number.textContent =
                    String(index + 1)
                        .padStart(2, "0");


                wrapper.appendChild(
                    number
                );


                /*
                 * Add wrapper
                 */

                card.appendChild(
                    wrapper
                );


                /*
                 * Caption
                 */

                const caption =
                    document.createElement(
                        "p"
                    );


                caption.textContent =
                    media.caption;


                card.appendChild(
                    caption
                );


                /*
                 * Add card
                 */

                memoryGrid.appendChild(
                    card
                );


                /*
                 * Observe reveal
                 */

                observer.observe(
                    card
                );

            }

        }
    );

}


/* =========================================================
   START ONE VIDEO
========================================================= */

function startVideo(video) {

    if (!video) {
        return;
    }


    /*
     * Force muted autoplay
     */

    video.muted =
        true;


    video.defaultMuted =
        true;


    video.autoplay =
        true;


    video.loop =
        true;


    video.playsInline =
        true;


    /*
     * Try to play
     */

    const playPromise =
        video.play();


    if (
        playPromise !== undefined
    ) {

        playPromise.catch(
            function (error) {

                console.log(
                    "Autoplay blocked:",
                    video.src,
                    error
                );

            }
        );

    }

}


/* =========================================================
   START ALL VIDEOS
========================================================= */

function startAllVideos() {

    const videos =
        document.querySelectorAll(
            "#memoryGrid video"
        );


    videos.forEach(
        function (video) {

            startVideo(
                video
            );

        }
    );

}


/* =========================================================
   VIDEO AUTOPLAY WHEN VISIBLE
========================================================= */

const videoObserver =
    new IntersectionObserver(
        function (entries) {

            entries.forEach(
                function (entry) {

                    const video =
                        entry.target;


                    if (
                        entry.isIntersecting
                    ) {

                        startVideo(
                            video
                        );

                    }

                    else {

                        /*
                         * Pause videos that are
                         * far outside the screen.
                         */

                        video.pause();

                    }

                }
            );

        },
        {
            threshold: 0.15
        }
    );


/* =========================================================
   OBSERVE ALL VIDEOS
========================================================= */

function observeVideos() {

    const videos =
        document.querySelectorAll(
            "#memoryGrid video"
        );


    videos.forEach(
        function (video) {

            videoObserver.observe(
                video
            );

        }
    );

}


/* =========================================================
   PAGE VISIBILITY
========================================================= */

document.addEventListener(
    "visibilitychange",
    function () {

        if (
            document.visibilityState ===
            "visible"
        ) {

            startAllVideos();

        }

    }
);


/* =========================================================
   USER INTERACTION
========================================================= */

document.addEventListener(
    "click",
    function () {

        startAllVideos();

    }
);


/* =========================================================
   PAGE LOAD
========================================================= */

window.addEventListener(
    "load",
    function () {

        createMediaCards();


        /*
         * Give browser time to
         * load video elements.
         */

        setTimeout(
            function () {

                startAllVideos();

                observeVideos();

            },
            500
        );

    }
);
