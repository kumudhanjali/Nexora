/* =========================================
   NEXORA — DAY 46
   Core UI Shell
   ========================================= */

const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");

const savedTheme = localStorage.getItem("nexora-theme");

if (savedTheme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
    themeIcon.textContent = "☀";
}


/* =========================================
   Theme Toggle
   ========================================= */

themeToggle.addEventListener("click", () => {

    const currentTheme =
        document.documentElement.getAttribute("data-theme");

    const isDark = currentTheme === "dark";

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