import { globalStore } from "./store.js";
import { saveData } from "./db.js";


/* =========================================
   NEXORA — DAY 48
   State + Memory Management
   ========================================= */

const themeToggle =
    document.getElementById("theme-toggle");

const themeIcon =
    document.getElementById("theme-icon");


/* =========================================
   Theme
   ========================================= */

const savedTheme =
    globalStore.getState().theme;

if (savedTheme === "dark") {

    document.documentElement.setAttribute(
        "data-theme",
        "dark"
    );

    themeIcon.textContent = "☀";
}


/* =========================================
   Theme Toggle
   ========================================= */

themeToggle.addEventListener("click", async () => {

    const isDark =
        document.documentElement
            .getAttribute("data-theme") === "dark";

    const newTheme =
        isDark ? "light" : "dark";


    if (newTheme === "dark") {

        document.documentElement.setAttribute(
            "data-theme",
            "dark"
        );

        themeIcon.textContent = "☀";

    } else {

        document.documentElement.removeAttribute(
            "data-theme"
        );

        themeIcon.textContent = "☾";
    }


    globalStore.setState({
        theme: newTheme
    });


    localStorage.setItem(
        "nexora-theme",
        newTheme
    );


    await saveData(
        "theme",
        newTheme
    );
});


/* =========================================
   Day 48 — Demonstrate Reactive State
   ========================================= */

const progressButton =
    document.getElementById(
        "increase-progress"
    );

if (progressButton) {

    progressButton.addEventListener(
        "click",
        () => {

            const currentProgress =
                globalStore.getState().progress;

            const nextProgress =
                Math.min(
                    currentProgress + 1,
                    100
                );

            globalStore.setState({
                progress: nextProgress
            });

            saveData(
                "progress",
                nextProgress
            );
        }
    );
}


/* =========================================
   Modal
   ========================================= */

const openModalButton =
    document.getElementById(
        "open-modal"
    );

const welcomeModal =
    document.getElementById(
        "welcome-modal"
    );

if (openModalButton) {

    openModalButton.addEventListener(
        "click",
        () => {
            welcomeModal.open();
        }
    );
}