import { db } from "./firebase.js";

import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

/* =========================================
   CONTAINER
========================================= */

const container = document.getElementById("pendingContainer");

/* =========================================
   LOAD PENDING REVIEWS
========================================= */

async function loadPendingReviews() {
  const querySnapshot = await getDocs(collection(db, "pendingReviews"));

  querySnapshot.forEach((documentData) => {
    const data = documentData.data();

    const card = document.createElement("div");

    card.className = "review-card";

    /* STORE RATING */

    card.dataset.rating = data.rating;

    card.innerHTML = `

      <h3>${data.name}</h3>

      <p>${data.review}</p>

      <div class="actions">

        <button
          class="approve"
          data-id="${documentData.id}"
        >
          Approve
        </button>

        <button
          class="delete"
          data-id="${documentData.id}"
        >
          Delete
        </button>

      </div>

    `;

    container.appendChild(card);
  });
}

loadPendingReviews();

/* =========================================
   BUTTON ACTIONS
========================================= */

container.addEventListener(
  "click",

  async (e) => {
    const button = e.target;

    const id = button.dataset.id;

    /* =====================================
       APPROVE REVIEW
    ===================================== */

    if (button.classList.contains("approve")) {
      /* PREVENT MULTIPLE CLICKS */

      button.disabled = true;

      button.textContent = "Approving...";

      try {
        const card = button.closest(".review-card");

        const name = card.querySelector("h3").textContent;

        const review = card.querySelector("p").textContent;

        /* GET RATING */

        const rating = Number(card.dataset.rating);

        /* ADD TO APPROVED REVIEWS */

        await addDoc(
          collection(db, "reviews"),

          {
            name,
            review,
            rating,
          },
        );

        /* DELETE FROM PENDING */

        await deleteDoc(doc(db, "pendingReviews", id));

        /* REMOVE CARD FROM UI */

        card.remove();

        /* SUCCESS MESSAGE */

        alert("Review Approved Successfully");
      } catch (error) {
        console.log(error);

        alert("Error approving review");

        button.disabled = false;

        button.textContent = "Approve";
      }
    }

    /* =====================================
       DELETE REVIEW
    ===================================== */

    if (button.classList.contains("delete")) {
      button.disabled = true;

      button.textContent = "Deleting...";

      try {
        await deleteDoc(doc(db, "pendingReviews", id));

        /* REMOVE UI CARD */

        button.closest(".review-card").remove();

        alert("Review Deleted");
      } catch (error) {
        console.log(error);

        alert("Error deleting review");

        button.disabled = false;

        button.textContent = "Delete";
      }
    }
  },
);