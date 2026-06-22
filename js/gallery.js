import { db } from './firebase.js';

import {

  collection,
  getDocs

} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const gallery =
  document.getElementById("gallery");

/* =========================================
   LOAD GALLERY
========================================= */

async function loadGallery() {

  gallery.innerHTML = "";

  const querySnapshot =
    await getDocs(collection(db, "gallery"));

  let delay = 0;

  querySnapshot.forEach((doc) => {

    const data = doc.data();

    const card =
      document.createElement("div");

    card.classList.add("gallery-item");

    card.setAttribute(
      "data-category",
      data.category || "all"
    );

    card.style.animationDelay =
      `${delay}s`;

    delay += 0.12;

    /* VIDEO OR IMAGE */

    let mediaHTML = "";

    if (data.type === "video") {

      mediaHTML = `
        <video
          src="${data.url}"
          controls
        ></video>
      `;

    } else {

      mediaHTML = `
        <img
          src="${data.url}"
          alt="Gallery Image"
        />
      `;
    }

    card.innerHTML = `

      ${mediaHTML}

      <div class="gallery-overlay">

        <h3>
          ${data.title || "Premium Interior"}
        </h3>

      </div>

    `;

    gallery.appendChild(card);

  });

  setupLightbox();
}

/* =========================================
   FILTER
========================================= */

window.filterGallery = function(category, btn) {

  const cards =
    document.querySelectorAll(".gallery-item");

  cards.forEach((card) => {

    if (
      category === "all" ||
      card.dataset.category === category
    ) {

      card.style.display = "block";

    } else {

      card.style.display = "none";
    }

  });

  /* ACTIVE BUTTON */

  document
    .querySelectorAll(".gallery-filters button")
    .forEach((button) => {

      button.classList.remove("active");

    });

  btn.classList.add("active");
}

/* =========================================
   LIGHTBOX
========================================= */

function setupLightbox() {

  const images =
    document.querySelectorAll(".gallery-item img");

  const lightbox =
    document.getElementById("lightbox");

  const lightboxImg =
    document.getElementById("lightboxImg");

  const closeBtn =
    document.getElementById("closeLightbox");

  images.forEach((img) => {

    img.addEventListener("click", () => {

      lightbox.style.display = "flex";

      lightboxImg.src = img.src;

    });

  });

  closeBtn.addEventListener("click", () => {

    lightbox.style.display = "none";

  });

  lightbox.addEventListener("click", (e) => {

    if (e.target === lightbox) {

      lightbox.style.display = "none";
    }

  });

}

/* =========================================
   START
========================================= */

loadGallery();