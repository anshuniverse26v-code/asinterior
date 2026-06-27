import { db } from "./firebase.js";

import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

/* =====================================================
   SUBMIT REVIEW
===================================================== */

const form = document.getElementById("reviewForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  /* GET VALUES */

  const name = document.getElementById("name").value;

  const rating = document.getElementById("rating").value;

  const review = document.getElementById("reviewText").value;

  try {
    /* SAVE IN PENDING REVIEWS */

    await addDoc(
      collection(db, "pendingReviews"),

      {
        name: name,

        rating: Number(rating),

        review: review,

        time: serverTimestamp(),
      },
    );

    alert("Review submitted for approval.");

    form.reset();
  } catch (error) {
    console.log(error);

    alert("Error submitting review.");
  }
});

/* =====================================================
   LOAD APPROVED REVIEWS
===================================================== */

const container = document.getElementById("reviewsContainer");

const loadMoreBtn = document.getElementById("loadMoreBtn");

let reviews = [];

let visibleReviews = 4;

/* =====================================================
   FETCH APPROVED REVIEWS
===================================================== */

async function fetchReviews() {
  const querySnapshot = await getDocs(collection(db, "reviews"));

  reviews = [];

  querySnapshot.forEach((doc) => {
    reviews.push(doc.data());
  });

  renderReviews();
}

/* =====================================================
   RENDER REVIEWS
===================================================== */

function renderReviews() {
  container.innerHTML = "";

  const visible = reviews.slice(0, visibleReviews);

  visible.forEach((data) => {
    const card = document.createElement("div");

    card.classList.add("review-card");

    card.innerHTML = `

      <div class="stars">

        ${"★".repeat(data.rating)}

      </div>

      <p>

        “${data.review}”

      </p>

      <h4>

        — ${data.name}

      </h4>

    `;

    container.appendChild(card);
  });

  /* HIDE BUTTON */

  if (visibleReviews >= reviews.length) {
    loadMoreBtn.style.display = "none";
  }
}

/* =====================================================
   LOAD MORE BUTTON
===================================================== */

loadMoreBtn.addEventListener(
  "click",

  () => {
    visibleReviews += 4;

    renderReviews();
  },
);

fetchReviews();

