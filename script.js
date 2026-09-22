// my javascript for The Untold website
// page switching + a few click interactions

// grab the 3 big sections
var homeSection = document.getElementById("homeSection");
var filmSection = document.getElementById("filmSection");
var exploreSection = document.getElementById("exploreSection");

// nav links
var homeLink = document.getElementById("homeLink");
var filmLink = document.getElementById("filmLink");
var exploreLink = document.getElementById("exploreLink");

// this function hides all sections then shows the one i want
function showSection(sectionName) {
    homeSection.classList.add("hide");
    filmSection.classList.add("hide");
    exploreSection.classList.add("hide");

    homeLink.classList.remove("active");
    filmLink.classList.remove("active");
    exploreLink.classList.remove("active");

    // pause the film if we leave that page
    var vid = document.getElementById("filmPlayer");
    if (vid && sectionName !== "film") {
        vid.pause();
    }

    if (sectionName === "home") {
        homeSection.classList.remove("hide");
        homeLink.classList.add("active");
    }

    if (sectionName === "film") {
        filmSection.classList.remove("hide");
        filmLink.classList.add("active");
    }

    if (sectionName === "explore") {
        exploreSection.classList.remove("hide");
        exploreLink.classList.add("active");
    }

    // scroll back up so it feels like a new page
    window.scrollTo(0, 0);
}

// when you click the nav links
homeLink.onclick = function (e) {
    e.preventDefault();
    showSection("home");
};

filmLink.onclick = function (e) {
    e.preventDefault();
    showSection("film");
};

exploreLink.onclick = function (e) {
    e.preventDefault();
    showSection("explore");
};

// the big button on the home hero also goes to the film
var goToFilmBtn = document.getElementById("goToFilmBtn");
if (goToFilmBtn) {
    goToFilmBtn.onclick = function () {
        showSection("film");
    };
}

// ----- home questions light up when clicked -----
var questions = document.querySelectorAll(".q-item");
var qNote = document.getElementById("qNote");
var qReplies = [
    "Yeah... that thought hits different at night.",
    "Interaction tips are coming. Keep scrolling.",
    "There are rules. Some are better than others.",
    "This one is basically the whole film."
];

for (var q = 0; q < questions.length; q++) {
    questions[q].onclick = function () {
        for (var j = 0; j < questions.length; j++) {
            questions[j].classList.remove("picked");
        }
        this.classList.add("picked");

        // find which question number this was
        var index = 0;
        for (var k = 0; k < questions.length; k++) {
            if (questions[k] === this) {
                index = k;
            }
        }
        qNote.innerHTML = qReplies[index];
    };
}

// ----- video controls (plays on our site) -----
var filmPlayer = document.getElementById("filmPlayer");
var playPauseBtn = document.getElementById("playPauseBtn");
var rewindBtn = document.getElementById("rewindBtn");
var muteBtn = document.getElementById("muteBtn");

if (playPauseBtn && filmPlayer) {
    playPauseBtn.onclick = function () {
        if (filmPlayer.paused) {
            filmPlayer.play();
        } else {
            filmPlayer.pause();
        }
    };
}

if (rewindBtn && filmPlayer) {
    rewindBtn.onclick = function () {
        filmPlayer.currentTime = filmPlayer.currentTime - 10;
        if (filmPlayer.currentTime < 0) {
            filmPlayer.currentTime = 0;
        }
    };
}

if (muteBtn && filmPlayer) {
    muteBtn.onclick = function () {
        filmPlayer.muted = !filmPlayer.muted;
        if (filmPlayer.muted) {
            muteBtn.innerHTML = "Unmute";
        } else {
            muteBtn.innerHTML = "Mute";
        }
    };
}

// ----- clickable rules under the video -----
var rules = document.querySelectorAll(".dont-item");
var revealBox = document.getElementById("revealBox");

for (var i = 0; i < rules.length; i++) {
    rules[i].onclick = function () {
        for (var r = 0; r < rules.length; r++) {
            rules[r].classList.remove("active-rule");
        }
        this.classList.add("active-rule");
        revealBox.innerHTML = this.getAttribute("data-text");
    };
}

// ----- what do you think button -----
var thinkBtn = document.getElementById("thinkBtn");
var thinkMessage = document.getElementById("thinkMessage");

var reactions = [
    "Unexpected... and somehow funny.",
    "Okay I would NOT have handled that well.",
    "Dark humor hits different after this one.",
    "Now I have questions I'm scared to ask."
];

if (thinkBtn) {
    thinkBtn.onclick = function () {
        var num = Math.floor(Math.random() * reactions.length);
        thinkMessage.innerHTML = reactions[num];
    };
}

// ----- explore cards expand when clicked -----
var cards = document.querySelectorAll(".card");

for (var c = 0; c < cards.length; c++) {
    cards[c].onclick = function () {
        var extra = this.querySelector(".card-extra");
        var alreadyOpen = this.classList.contains("open");

        // close all first
        for (var x = 0; x < cards.length; x++) {
            cards[x].classList.remove("open");
            cards[x].querySelector(".card-extra").innerHTML = "";
        }

        // open this one if it was closed
        if (!alreadyOpen) {
            this.classList.add("open");
            extra.innerHTML = this.getAttribute("data-extra");
        }
    };
}

// ----- share text on explore -----
var shareBtn = document.getElementById("shareBtn");
var shareNote = document.getElementById("shareNote");

if (shareBtn) {
    shareBtn.onclick = function () {
        shareNote.innerHTML = "Watch Things Not To Do With A Dead Body - from The Untold.";
    };
}
