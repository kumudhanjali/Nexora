/* =========================================
   NEXORA — DAY 46 + DAY 47
   ========================================= */

const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");

const savedTheme = localStorage.getItem("nexora-theme");

if (savedTheme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
    themeIcon.textContent = "☀";
}


/* =========================================
   DAY 46 — THEME TOGGLE
   ========================================= */

themeToggle.addEventListener("click", () => {

    const isDark =
        document.documentElement.getAttribute("data-theme") === "dark";

    if (isDark) {

        document.documentElement.removeAttribute("data-theme");

        themeIcon.textContent = "☾";

        localStorage.setItem("nexora-theme", "light");

    } else {

        document.documentElement.setAttribute(
            "data-theme",
            "dark"
        );

        themeIcon.textContent = "☀";

        localStorage.setItem("nexora-theme", "dark");
    }
});


/* =========================================
   DAY 47 — CUSTOM MODAL
   ========================================= */

const openModalButton =
    document.getElementById("open-modal");

const welcomeModal =
    document.getElementById("welcome-modal");

openModalButton.addEventListener("click", () => {
    welcomeModal.open();
});