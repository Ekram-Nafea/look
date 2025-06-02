
  document.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault();

    const form = this;

    fetch(form.action, {
      method: form.method,
      headers: {
        'Accept': 'application/json'
      },
      body: new FormData(form)
    }).then(response => {
      if (response.ok) {
        form.reset();
        document.getElementById("thank-you-modal").classList.remove("hidden");
      } else {
        alert("Something went wrong. Please try again.");
      }
    }).catch(error => {
      alert("Error: " + error.message);
    });
  });

  // Close modal
  document.getElementById("close-modal").addEventListener("click", function () {
    document.getElementById("thank-you-modal").classList.add("hidden");
  });






// ************************

  const establishedYear = 2024;
  const currentYear = new Date().getFullYear();
  const yearDisplay = (currentYear === establishedYear)? establishedYear: `${establishedYear} - ${currentYear}`;
  document.getElementById("copyright").innerHTML = `&copy; ${yearDisplay} Gallery Website. All rights reserved.`;

//***********************

const menu = document.querySelector('#menu');
const closeMenu = document.querySelector('#times');

const sidebar = document.querySelector('.sidebar');
sidebar.style.display= 'none';


menu.addEventListener('click',()=>{
    sidebar.style.display= 'flex';
})
closeMenu.addEventListener('click',()=>{
    sidebar.style.display= 'none';
})


// *************************** Album *************************


// You can change global variables here:
var radius = 240; // how big of the radius
var autoRotate = true; // auto rotate or not
var rotateSpeed = -60; // unit: seconds/360 degrees
var imgWidth = 120; // width of images (unit: px)
var imgHeight = 170; // height of images (unit: px)

// Link of background music - set 'null' if you dont want to play background music
var bgMusicURL = 'https://api.soundcloud.com/tracks/143041228/stream?client_id=587aa2d384f7333a886010d5f52f302a';
var bgMusicControls = true; // Show UI music control

/*
     NOTE:
       + imgWidth, imgHeight will work for video
       + if imgWidth, imgHeight too small, play/pause button in <video> will be hidden
       + Music link are taken from: https://hoangtran0410.github.io/Visualyze-design-your-own-/?theme=HauMaster&playlist=1&song=1&background=28
       + Custom from code in tiktok video  https://www.facebook.com/J2TEAM.ManhTuan/videos/1353367338135935/
*/


// ===================== start =======================
// animation start after 1000 miliseconds
setTimeout(init, 1000);
// setTimeout(init, 1000);
setInterval(init, 1000) 

var odrag = document.getElementById('drag-container');
var ospin = document.getElementById('spin-container');
var aImg = ospin.getElementsByTagName('img');
var aVid = ospin.getElementsByTagName('video');
var aEle = [...aImg, ...aVid]; // combine 2 arrays

// Size of images
ospin.style.width = imgWidth + "px";
ospin.style.height = imgHeight + "px";

// Size of ground - depend on radius
var ground = document.getElementById('ground');
ground.style.width = radius * 3 + "px";
ground.style.height = radius * 3 + "px";

function init(delayTime) {
  for (var i = 0; i < aEle.length; i++) {
    aEle[i].style.transform = "rotateY(" + (i * (360 / aEle.length)) + "deg) translateZ(" + radius + "px)";
    aEle[i].style.transition = "transform 1s";
    aEle[i].style.transitionDelay = delayTime || (aEle.length - i) / 4 + "s";
  }
}

function applyTranform(obj) {
  // Constrain the angle of camera (between 0 and 180)
  if(tY > 180) tY = 180;
  if(tY < 0) tY = 0;

  // Apply the angle
  obj.style.transform = "rotateX(" + (-tY) + "deg) rotateY(" + (tX) + "deg)";
}

function playSpin(yes) {
  ospin.style.animationPlayState = (yes?'running':'paused');
}

var sX, sY, nX, nY, desX = 0,
    desY = 0,
    tX = 0,
    tY = 10;

// auto spin
if (autoRotate) {
  var animationName = (rotateSpeed > 0 ? 'spin' : 'spinRevert');
  ospin.style.animation = `${animationName} ${Math.abs(rotateSpeed)}s infinite linear`;
}



// ***************************************************************


const inputs = document.querySelectorAll('input, textarea ');

inputs.forEach(input => {
    input.addEventListener('pointerdown', (e) => {
        e.stopPropagation();
    });
});


const interactiveTags = ['input', 'textarea', 'select', 'button'];

document.onpointerdown = function (e) {
    if (interactiveTags.includes(e.target.tagName.toLowerCase())) {
        return; // let browser handle interaction for those elements
    }

    // your drag/rotate logic here...
};


// ***************************************************************


// setup events
document.onpointerdown = function (e) {
  clearInterval(odrag.timer);
  e = e || window.event;
  var sX = e.clientX,
      sY = e.clientY;

  this.onpointermove = function (e) {
    e = e || window.event;
    var nX = e.clientX,
        nY = e.clientY;
    desX = nX - sX;
    desY = nY - sY;
    tX += desX * 0.1;
    tY += desY * 0.1;
    applyTranform(odrag);
    sX = nX;
    sY = nY;
  };

  this.onpointerup = function (e) {
    odrag.timer = setInterval(function () {
      desX *= 0.95;
      desY *= 0.95;
      tX += desX * 0.1;
      tY += desY * 0.1;
      applyTranform(odrag);
      playSpin(false);
      if (Math.abs(desX) < 0.5 && Math.abs(desY) < 0.5) {
        clearInterval(odrag.timer);
        playSpin(true);
      }
    }, 17);
    this.onpointermove = this.onpointerup = null;
  };

  return false;
};

document.onmousewheel = function(e) {
  e = e || window.event;
  var d = e.wheelDelta / 20 || -e.detail;
  radius += d;
  init(1);
};






  // ******************* testomenals****************

  const dots = document.querySelectorAll('.dot');
const testimonialText = document.querySelector('.testimonial-text');
const testimonialName = document.querySelector('.testimonial-name');
const testimonialImg = document.querySelector('.testimonial-img');


const testimonials = [
    {
        name: "Ahmed",
        text: "“Exploring their gallery is like stepping into a world of art and emotion. Each photo tells a story. I've never seen such a captivating collection of images before!”",
         icon: "fa-user-tie"
    },
    {
        name: "Nabil",
        text: "“As a fellow photographer, I’m blown away by the artistry and professionalism of this team. Their use of light and composition is simply inspiring..”",
        icon: "fa-user-doctor" 
    },
    {
        name: "Ibrahim",
        text: "“I’ve never seen nature portrayed so beautifully. The way they capture light, textures, and landscapes makes you feel like you’re standing right there in the moment”",
       icon: "fa-user-graduate"
    },
    {
        name: "Zayd",
        text: "“The nature photography on this site is simply breathtaking! Each image feels alive, capturing the beauty and serenity of the outdoors in a way that inspires and soothes the soul”",
        icon: "fa-user" 
    }
];

let currentIndex = 0;

function updateTestimonial(index) {
    testimonialName.textContent = testimonials[index].name;
    testimonialText.textContent = testimonials[index].text;
    testimonialImg.innerHTML = `<i class="fa-solid ${testimonials[index].icon}"></i>`;
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
}

document.querySelector('.prev-btn').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
    updateTestimonial(currentIndex);
});

document.querySelector('.next-btn').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % testimonials.length;
    updateTestimonial(currentIndex);
});

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentIndex = index;
        updateTestimonial(currentIndex);
    });
});



// *****************************scroll btn
const scrollBtn = document.querySelector('#scrollBtn')
window.onscroll =function(){
    if(scrollY >= 100){
        scrollBtn.style.display = 'block';

    }
    else{
        scrollBtn.style.display = 'none';

    }
}
scrollBtn.onclick=function(){
   scroll({
    left:0,
    top:0,
    behavior:"smooth"

   })
}

  // ************************************************

  window.addEventListener('scroll', () => {
    AOS.refresh(); // Refresh animations on scroll
  });

  AOS.init({
    offset: 200,
    duration: 1000,
    once: false // Ensures animations repeat when scrolling up and down
  });

  var animation = lottie.loadAnimation({
        container: document.getElementById('paper-plane'),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'json/paperplane1.json' 
    });
    var animation = lottie.loadAnimation({
          container: document.getElementById('SmediaAnimations'),
          renderer: 'svg',
          loop: true,
          autoplay: true,
          path: 'json/imgAnim1.json' 
      });
      var animation = lottie.loadAnimation({
          container: document.getElementById('sidebarAnimation'),
          renderer: 'svg',
          loop: true,
          autoplay: true,
          // path: '../json/Animation3.json' 
          path:'json/Animation3.json'
      });

AOS.init({
  mirror: true, // 👈 this makes animation happen again when scrolling *back up*
});


// **********************************************// active / scroll******************************************************

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll('.sidebar a[href^="#"]'); // Only anchors that are internal links


function onScroll() {
  let scrollY = window.pageYOffset;

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 350;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove("active-section");
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active-section");
        }
      });
    }
  });
}



window.addEventListener("scroll", onScroll);

navLinks.forEach(link => {
  link.addEventListener("click", function(e) {
    e.preventDefault();

    const targetId = this.getAttribute("href").slice(1);
    const targetSection = document.getElementById(targetId);

    if (!targetSection) return; // prevent error if target section doesn't exist

    const offset = 200; // height of your fixed header
    const top = targetSection.offsetTop - offset;

    window.scrollTo({
      top: top,
      behavior: "smooth"
    });

    setTimeout(() => onScroll(), 300);
  });
});
