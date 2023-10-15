"use strict";

const housesContainer = document.querySelector(".houses-wrapper");
const heroSectionEl = document.querySelector(".section-hero");
const houseEls = document.querySelectorAll(".house");
const houseModals = document.querySelectorAll(".modal");
const navLinks = document.querySelectorAll("a:link");

const openModal = function (target) {
  const targetModal = Array.from(houseModals).find(
    (modal) => modal.dataset.house === target
  );

  houseModals.forEach((modal) => modal.classList.remove("open"));
  targetModal.classList.add("open");
  targetModal.scrollIntoView({ behavior: "smooth" });
};

housesContainer.addEventListener("click", (e) => {
  houseEls.forEach((house) => house.classList.remove("clicked"));
  const targetHouse = e.target.closest("div.house");
  targetHouse.classList.add("clicked");
  const banner = targetHouse.dataset.banner;
  openModal(banner);
});

const obs = new IntersectionObserver(
  (entries) => {
    const ent = entries[0];

    if (!ent.isIntersecting) {
      document.body.classList.add("sticky");
    }

    if (ent.isIntersecting) {
      document.body.classList.remove("sticky");
    }
  },
  {
    root: null,
    threshold: 0,
    rootMargin: "-71px",
  }
);

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    const href = link.getAttribute("href");
    if (href === "#") {
      window.scroll({
        top: 0,
        behavior: "smooth",
      });
    } else if (href.startsWith("#")) {
      const targetEl = document.querySelector(href);
      targetEl.scrollIntoView({ behavior: "smooth" });
    }
  });
});

obs.observe(heroSectionEl);
