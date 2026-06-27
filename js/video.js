<<<<<<< HEAD
/* =====================================================
   NAVBAR SCROLL EFFECT
===================================================== */

const header =
  document.querySelector("header");

window.addEventListener("scroll", () => {

  if (window.scrollY > 40) {

    header.classList.add("scrolled");

  } else {

    header.classList.remove("scrolled");
  }

});

/* =====================================================
   SCROLL REVEAL ANIMATION
===================================================== */

const cards =
  document.querySelectorAll(".video-card");

const observer =
  new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

      if (entry.isIntersecting) {

        entry.target.classList.add("show");
      }

    });

  }, {

    threshold: 0.15

  });

cards.forEach((card, index) => {

  card.style.animationDelay =
    `${index * 0.15}s`;

  observer.observe(card);

=======
/* =====================================================
   NAVBAR SCROLL EFFECT
===================================================== */

const header =
  document.querySelector("header");

window.addEventListener("scroll", () => {

  if (window.scrollY > 40) {

    header.classList.add("scrolled");

  } else {

    header.classList.remove("scrolled");
  }

});

/* =====================================================
   SCROLL REVEAL ANIMATION
===================================================== */

const cards =
  document.querySelectorAll(".video-card");

const observer =
  new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

      if (entry.isIntersecting) {

        entry.target.classList.add("show");
      }

    });

  }, {

    threshold: 0.15

  });

cards.forEach((card, index) => {

  card.style.animationDelay =
    `${index * 0.15}s`;

  observer.observe(card);

>>>>>>> 893638e432ef6f1664e39e332b9bd919fc4174e3
});