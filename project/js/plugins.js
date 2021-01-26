// Randomlly, change the header background image
const myHeader             = document.querySelector("header");
const myHeaderNumOfImgs    = 5; 
const localStorageRandomBg = localStorage.getItem("random-bg");

let myHeaderImgIndex;
let myHeaderBgInterval;

function randomBg() {
    myHeaderBgInterval = setInterval(() => {
        myHeaderImgIndex = Math.floor((Math.random() * 10) % myHeaderNumOfImgs);
        myHeader.style.backgroundImage = 'url(/imgs/header_0' + myHeaderImgIndex + '.jpg)' 
    }, 10000);
}

if (localStorageRandomBg !== null & localStorageRandomBg === "true") {
    randomBg();
} else {
    const myRandomChoicesSpan = document.querySelectorAll(".settings .menu .random-background span")
    myRandomChoicesSpan.forEach(function(e) {
        if (e.dataset.random === "false"){
            e.classList.add("active");
        } else {
            e.classList.remove('active');
        }
    })
}

// Customizing Opend & Close Setting Menu
const mySetting = document.querySelector(".settings .icon-box");

mySetting.onclick = function () {
    this.firstElementChild.classList.toggle("fa-spin")
    this.parentElement.classList.toggle("opened");
}

// Customizing Color Settings
const myColors          = document.querySelectorAll(".settings .menu .colors ul li");
const localStorageColor = localStorage.getItem("main-color");

if (localStorageColor !== null) {
    document.documentElement.style.setProperty("--main-color", localStorageColor);
    myColors.forEach(function(e) {
        if (e.dataset.color === localStorageColor) {
            e.classList.add("active");
        } else {
            e.classList.remove("active");
        }
    })
}

myColors.forEach(function(e) {
    e.onclick = function() {
        const siblings = Array.prototype.slice.call(this.parentElement.children)

        siblings.forEach((e) => e.classList.remove("active"));
        this.classList.add("active");
        document.documentElement.style.setProperty("--main-color", this.dataset.color);
        localStorage.setItem("main-color", this.dataset.color)
    }
});

// Customizing Random Background Settings
const myBgCohices = document.querySelectorAll(".settings .menu .random-background span");

myBgCohices.forEach(function(e) {
    e.onclick = function() {
        const siblings = Array.prototype.slice.call(this.parentElement.children)
        siblings.forEach((e) => e.classList.remove("active"));
        this.classList.add("active");
        
        if (this.dataset.random === "false") {
            clearInterval(myHeaderBgInterval);
            localStorage.setItem("random-bg", "false")
        } else {
            randomBg();
            localStorage.setItem("random-bg", "true")
        }
    }
});

// Customizing Show Navigation Bullets
const myBulletChoices   = document.querySelectorAll(".settings .menu .show-bullets span");
const localStorageBulletChoice = localStorage.getItem("show-bullets");

function navBulletsSettings() {
    myBulletChoices.forEach(function(e) {
        e.onclick = function() {
            const siblings = Array.prototype.slice.call(this.parentElement.children)
    
            siblings.forEach((e) => e.classList.remove("active"));
            this.classList.add("active");
    
            if (this.dataset.show === "false") {
                document.querySelector(".nav-bullets").style.display ="none";
                localStorage.setItem("show-bullets", "false")
            } else {
                document.querySelector(".nav-bullets").style.display ="block";
                localStorage.setItem("show-bullets", "true")
            }
        }
    });
}

navBulletsSettings();

if (localStorageBulletChoice !== null & localStorageBulletChoice == "true") {
    document.querySelector(".settings .menu .show-bullets span[data-show='true']").click();
} else {
    document.querySelector(".settings .menu .show-bullets span[data-show='false']").click();
}   

// Customizing Reset Options
const myResetBtn   = document.querySelector(".settings .menu .reset-options span");

myResetBtn.onclick = function() {
    document.querySelector(".settings .menu .colors ul li").click()
    document.querySelector(".settings .menu .random-background span[data-random='true']").click();
    document.querySelector(".settings .menu .show-bullets span[data-show='true']").click();
}

// Customizing Skills progress
const mySkills = document.querySelector(".our-skills .skills");
const myProgresses = document.querySelectorAll(".our-skills .skills .skill .progress");

window.onscroll = function() {
    if (this.pageYOffset >= (mySkills.offsetHeight + mySkills.offsetTop - this.innerHeight - 250)) {
        myProgresses.forEach(function (e) {
            e.style.width = e.dataset.progress + "%"
        });
    }
}

//Customizing our gallay popup
const allGallaryImgs = document.querySelectorAll(".our-gallary .imgs-box .img-box");

allGallaryImgs.forEach(function (gallaryImg) {
    gallaryImg.onclick = function() {
        const myPopupOverlay = document.createElement("div");
        myPopupOverlay.className = "popup-overlay";
        document.body.appendChild(myPopupOverlay);

        const myPopupBox = document.createElement("div");
        myPopupBox.className = "popup-box";
        document.body.appendChild(myPopupBox);

        const myPopupTitle = document.createElement("div");
        const myPopupImg   = gallaryImg.cloneNode(true);
        myPopupTitle.className = "popup-title";
        myPopupBox.appendChild(myPopupTitle);
        myPopupBox.appendChild(myPopupImg);

        const myPopupH2 = document.createElement("h2");
        const myGallaryImgTxt = gallaryImg.firstChild.alt;
        let myPopupH2Text;

        if (myGallaryImgTxt != "") {
            myPopupH2Text = document.createTextNode(myGallaryImgTxt);
        } else {
            myPopupH2Text = document.createTextNode("Untitled Popup");
        }
        myPopupH2.appendChild(myPopupH2Text);
        myPopupTitle.appendChild(myPopupH2);

        const myExtBtn = document.createElement("div");
        const myExtTxt = document.createTextNode("X");
        myExtBtn.className = "popup-exit";
        myExtBtn.appendChild(myExtTxt);
        myPopupBox.appendChild(myExtBtn);
    }
});

document.addEventListener("click", function(e) {
    if (e.target && e.target.className === "popup-exit") {
        document.body.removeChild(e.target.parentElement);
        document.body.removeChild(document.querySelector(".popup-overlay"));
    }
});

// Customizing Navigation Bullets
const myNavBullets = document.querySelectorAll(".nav-bullets .bullet");
myNavBullets.forEach(function(myNavBullet) {
    myNavBullet.onclick = function() {
        document.querySelector(this.dataset.target).scrollIntoView({behavior: 'smooth'});
    }
});

// Customizing Navigation Links
const myNavLinks = document.querySelectorAll("header nav .links a");

myNavLinks.forEach(function(myNavLink) {
    myNavLink.onclick = function(e) {
        e.preventDefault();
        document.querySelector(this.dataset.target).scrollIntoView({behavior: 'smooth'});
    }
});
