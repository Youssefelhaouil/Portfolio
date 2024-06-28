/*==================== MENU SHOW Y HIDDEN ====================*/
const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close");

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  // When we click on each nav__link, we remove the show-menu class
  navMenu.classList.remove("show-menu");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

/*==================== ACCORDION SKILLS ====================*/
const skillsContent = document.getElementsByClassName("skills__content"),
  skillsHeader = document.querySelectorAll(".skills__header");

function toggleSkills() {
  let itemClass = this.parentNode.className;

  for (i = 0; i < skillsContent.length; i++) {
    skillsContent[i].className = "skills__content skills__close";
  }
  if (itemClass === "skills__content skills__close") {
    this.parentNode.className = "skills__content skills__open";
  }
}

skillsHeader.forEach((el) => {
  el.addEventListener("click", toggleSkills);
});

/*==================== QUALIFICATION TABS ====================*/
const tabs = document.querySelectorAll("[data-target]"),
  tabContents = document.querySelectorAll("[data-content]");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = document.querySelector(tab.dataset.target);

    tabContents.forEach((tabContent) => {
      tabContent.classList.remove("qualification__active");
    });
    target.classList.add("qualification__active");

    tabs.forEach((tab) => {
      tab.classList.remove("qualification__active");
    });
    tab.classList.add("qualification__active");
  });
});

/*==================== SERVICES MODAL ====================*/
const modalViews = document.querySelectorAll(".services__modal"),
  modalBtns = document.querySelectorAll(".services__button"),
  modalCloses = document.querySelectorAll(".services__modal-close");

let modal = function (modalClick) {
  modalViews[modalClick].classList.add("active-modal");
};

modalBtns.forEach((modalBtn, i) => {
  modalBtn.addEventListener("click", () => {
    modal(i);
  });
});

modalCloses.forEach((modalClose) => {
  modalClose.addEventListener("click", () => {
    modalViews.forEach((modalView) => {
      modalView.classList.remove("active-modal");
    });
  });
});

/*==================== PORTFOLIO SWIPER  ====================*/
let swiperPortfolio = new Swiper(".portfolio__container", {
  cssMode: true,
  loop: true,

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

  /* mousewheel: true,
  keyboard: true, */
});

/*==================== TESTIMONIAL ====================*/
let swiperTestimonial = new Swiper(".testimonial__container", {
  loop: true,
  grabCursor: true,
  spaceBetween: 48,

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },

  breakpoints: {
    568: {
      slidesPerView: 2,
    },
  },

  /* mousewheel: true,
  keyboard: true, */
});

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.add("active-link");
    } else {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.remove("active-link");
    }
  });
}
window.addEventListener("scroll", scrollActive);

/*==================== CHANGE BACKGROUND HEADER ====================*/
function scrollHeader() {
  const nav = document.getElementById("header");
  // When the scroll is greater than 200 viewport height, add the scroll-header class to the header tag
  if (this.scrollY >= 80) nav.classList.add("scroll-header");
  else nav.classList.remove("scroll-header");
}
window.addEventListener("scroll", scrollHeader);

/*==================== SHOW SCROLL UP ====================*/
function scrollUp() {
  const scrollUp = document.getElementById("scroll-up");
  // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
  if (this.scrollY >= 560) scrollUp.classList.add("show-scroll");
  else scrollUp.classList.remove("show-scroll");
}
window.addEventListener("scroll", scrollUp);

/*==================== DARK LIGHT THEME ====================*/

const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "uil-sun";

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "uil-moon" : "uil-sun";

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme
  );
  themeButton.classList[selectedIcon === "uil-moon" ? "add" : "remove"](
    iconTheme
  );
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener("click", () => {
  // Add or remove the dark / icon theme
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  // We save the theme and the current icon that the user chose
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});
document.addEventListener('DOMContentLoaded', function() {
  const homeData = document.querySelector('.home__data');

  // Define the GSAP animation
  const tl = gsap.timeline({paused: true});
  tl.fromTo(homeData, {x: '-100%', opacity: 0}, {x: '0%', opacity: 1, duration: 1, ease: "power2.out"});

  // Function to play the animation
  function animateOnTop() {
      if (window.scrollY === 0) {
          tl.restart(); // Restart the timeline each time it's at the top
      }
  }

  // Initial animation
  tl.play();

  // Event listener for scroll
  window.addEventListener('scroll', animateOnTop);
});

document.addEventListener('DOMContentLoaded', function() {
  const blobImage = document.querySelector('.home__blob');

  // Animation for entering the hover
  blobImage.addEventListener('mouseenter', () => {
      gsap.to(blobImage, {scale: 1.1, duration: 0.5, ease: "bounce.out"});
  });

  // Animation for leaving the hover
  blobImage.addEventListener('mouseleave', () => {
      gsap.to(blobImage, {scale: 1, duration: 0.5, ease: "bounce.out"});
  });

  // Initial animation from right to left
  gsap.fromTo('.home__blob', 
      { x: '100%', opacity: 0 }, 
      { x: '0%', opacity: 1, duration: 2, ease: "power2.out" });
});


document.addEventListener('DOMContentLoaded', function() {
  const aboutDescription = document.querySelector('.about__description');

  // Define the GSAP animation
  const tl = gsap.timeline({
      paused: true,
      defaults: {duration: 1, ease: "power2.inOut"}
  });

  tl.fromTo(aboutDescription, {x: '100%', opacity: 0}, {x: '0%', opacity: 1});

  // Function to play the animation based on scroll position
  function checkScroll() {
      if (window.scrollY === 0 || window.innerHeight + window.scrollY >= document.body.offsetHeight) {
          tl.restart();
      }
  }

  // Event listener for scroll
  window.addEventListener('scroll', checkScroll);

  // Initial animation
  tl.play();
});

document.addEventListener('DOMContentLoaded', function() {
  const infoDivs = document.querySelectorAll('.about__info > div');

  // Define the GSAP timeline
  gsap.timeline()
      .fromTo(infoDivs, 
          { y: 50, opacity: 0 }, 
          { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", stagger: 0.3 }
      );
});


document.addEventListener('DOMContentLoaded', function() {
  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray('.skills__content').forEach((panel, i) => {
      gsap.fromTo(panel, 
          {y: 100, opacity: 0}, 
          {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: 'power2.out',
              scrollTrigger: {
                  trigger: panel,
                  start: 'top 90%', // Trigger the animation when the top of the panel hits the 80% height of the viewport
                  toggleActions: 'play none none reverse', // Reverses the animation if scrolled up
              }
          }
      );
  });

});


document.addEventListener('DOMContentLoaded', function() {
  gsap.registerPlugin(ScrollTrigger);

  const skillsData = document.querySelectorAll('.skills__data');

  skillsData.forEach(data => {
      const percentageElement = data.querySelector('.skills__percentage');
      const number = data.querySelector('.skills__number').textContent.trim();
      const endWidth = number; // Assumes the text is "60%", "50%", etc.

      gsap.fromTo(percentageElement, 
          { width: '0%' }, 
          {
              width: endWidth,
              duration: 2,
              ease: 'power3.out',
              scrollTrigger: {
                  trigger: data,
                  start: 'top 90%', // Starts animation when the top of the data block is in view
                  toggleActions: 'play none none none'
              }
          }
      );
  });
});



