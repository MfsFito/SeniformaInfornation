/* ============================================================
   NIC 2026 — National Informatics Conference
   External JavaScript | HMIF FT-UNRAM
   ============================================================ */

/* ── Speaker Modal Data ─────────────────────────────────────── */
const SPEAKER_DATA = [
  {
    category: "Keynote Speaker #1",
    title: "Segera Diumumkan",
    content: `
      <div class="bg-[#F5F5F7] p-8 md:p-10 rounded-2xl mb-6">
        <p class="text-base md:text-lg text-gray-500">
          Detail profil, topik, dan jadwal keynote speaker pertama akan segera diumumkan
          melalui website dan media sosial resmi HMIF FT-UNRAM.
        </p>
      </div>`
  },
  {
    category: "Keynote Speaker #2",
    title: "Segera Diumumkan",
    content: `
      <div class="bg-[#F5F5F7] p-8 md:p-10 rounded-2xl mb-6">
        <p class="text-base md:text-lg text-gray-500">
          Detail profil, topik, dan jadwal keynote speaker kedua akan segera diumumkan
          melalui website dan media sosial resmi HMIF FT-UNRAM.
        </p>
      </div>`
  },
  {
    category: "Keynote Speaker #3",
    title: "Segera Diumumkan",
    content: `
      <div class="bg-[#F5F5F7] p-8 md:p-10 rounded-2xl mb-6">
        <p class="text-base md:text-lg text-gray-500">
          Detail profil, topik, dan jadwal keynote speaker ketiga akan segera diumumkan
          melalui website dan media sosial resmi HMIF FT-UNRAM.
        </p>
      </div>`
  },
  {
    category: "Keynote Speaker #4",
    title: "Segera Diumumkan",
    content: `
      <div class="bg-[#F5F5F7] p-8 md:p-10 rounded-2xl mb-6">
        <p class="text-base md:text-lg text-gray-500">
          Detail profil, topik, dan jadwal keynote speaker keempat akan segera diumumkan
          melalui website dan media sosial resmi HMIF FT-UNRAM.
        </p>
      </div>`
  },
  {
    category: "Keynote Speaker #5",
    title: "Segera Diumumkan",
    content: `
      <div class="bg-[#F5F5F7] p-8 md:p-10 rounded-2xl mb-6">
        <p class="text-base md:text-lg text-gray-500">
          Detail profil, topik, dan jadwal keynote speaker kelima akan segera diumumkan
          melalui website dan media sosial resmi HMIF FT-UNRAM.
        </p>
      </div>`
  },
];

/* ── Bootstrap on DOM Ready ─────────────────────────────────── */
document.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons();
  AOS.init({ offset: 0, duration: 700, easing: "ease-out-cubic", once: true });

  initMobileMenu();
  initCarousel();
  initModal();
  initNavbarScroll();
});

/* ── Mobile Menu ────────────────────────────────────────────── */
function initMobileMenu() {
  const menuBtn    = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileLinks = document.querySelectorAll(".mobile-link");
  let menuOpen = false;

  function toggleMenu() {
    menuOpen = !menuOpen;
    if (menuOpen) {
      mobileMenu.classList.remove("hidden");
      requestAnimationFrame(() => mobileMenu.classList.remove("opacity-0"));
    } else {
      mobileMenu.classList.add("opacity-0");
      setTimeout(() => mobileMenu.classList.add("hidden"), 300);
    }
  }

  menuBtn.addEventListener("click", toggleMenu);
  mobileLinks.forEach((link) =>
    link.addEventListener("click", () => { if (menuOpen) toggleMenu(); })
  );
}

/* ── Carousel (Speaker Cards) ───────────────────────────────── */
function initCarousel() {
  const track   = document.getElementById("apple-carousel");
  const btnPrev = document.getElementById("btn-prev");
  const btnNext = document.getElementById("btn-next");

  if (!track || !btnPrev || !btnNext) return;

  function updateButtons() {
    const maxScroll = track.scrollWidth - track.clientWidth;
    btnPrev.disabled = track.scrollLeft <= 5;
    btnNext.disabled = track.scrollLeft >= maxScroll - 5;
  }

  track.addEventListener("scroll", updateButtons);
  btnPrev.addEventListener("click", () => track.scrollBy({ left: -320, behavior: "smooth" }));
  btnNext.addEventListener("click", () => track.scrollBy({ left:  320, behavior: "smooth" }));

  setTimeout(updateButtons, 100);
}

/* ── Speaker Modal ──────────────────────────────────────────── */
function initModal() {
  const overlay    = document.getElementById("card-modal");
  const btnClose   = document.getElementById("close-modal");
  const categoryEl = document.getElementById("modal-category");
  const titleEl    = document.getElementById("modal-title");
  const bodyEl     = document.getElementById("modal-body");
  const cards      = document.querySelectorAll(".apple-card");

  function openModal(index) {
    const data = SPEAKER_DATA[index];
    if (!data) return;
    categoryEl.textContent = data.category;
    titleEl.textContent    = data.title;
    bodyEl.innerHTML       = data.content;
    overlay.classList.add("active");
    document.body.classList.add("modal-open");
  }

  function closeModal() {
    overlay.classList.remove("active");
    document.body.classList.remove("modal-open");
  }

  cards.forEach((card) =>
    card.addEventListener("click", function () {
      openModal(parseInt(this.dataset.index));
    })
  );

  btnClose.addEventListener("click", closeModal);
  overlay.addEventListener("click", (e) => { if (e.target === overlay) closeModal(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });
}

/* ── Navbar Scroll Blur Effect ──────────────────────────────── */
function initNavbarScroll() {
  const navbar = document.getElementById("navbar");

  window.addEventListener("scroll", () => {
    const scrolled = window.scrollY > 50;
    navbar.classList.toggle("bg-white",           !scrolled);
    navbar.classList.toggle("border-border-color", !scrolled);
    navbar.classList.toggle("bg-white/90",          scrolled);
    navbar.classList.toggle("backdrop-blur-xl",     scrolled);
    navbar.classList.toggle("border-white/20",      scrolled);
  });
}