import { globalStore } from "./store.js";
import { saveData } from "./db.js";
import { Router } from "./router.js";

import {
    renderDashboard,
    renderTasks,
    renderLearning,
    renderAnalytics
} from "./views/views.js";

import "./components/user-card.js";
import "./components/data-feed.js";
import "./components/custom-modal.js";


const root = document.getElementById("app-root");

const routes = {
    "/": () => renderDashboard(root),
    "/tasks": () => renderTasks(root),
    "/learning": () => renderLearning(root),
    "/analytics": () => renderAnalytics(root)
};


const router = new Router(routes, root);

router.init();


/* ================================
   THEME MANAGEMENT
================================ */

const themeToggle =
    document.getElementById("theme-toggle");

const themeIcon =
    document.getElementById("theme-icon");

const savedTheme =
    globalStore.getState().theme;

if (savedTheme === "dark") {
    document.documentElement.setAttribute(
        "data-theme",
        "dark"
    );

    themeIcon.textContent = "☀";
}


themeToggle.addEventListener("click", async () => {

    const isDark =
        document.documentElement.getAttribute(
            "data-theme"
        ) === "dark";

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

    try {
        await saveData(
            "theme",
            newTheme
        );
    } catch (error) {
        console.error(
            "Theme storage error:",
            error
        );
    }
});


/* ================================
   PROGRESS MANAGEMENT
================================ */

const progressButton =
    document.getElementById(
        "increase-progress"
    );


if (progressButton) {

    progressButton.addEventListener(
        "click",
        async () => {

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

            try {
                await saveData(
                    "progress",
                    nextProgress
                );
            } catch (error) {
                console.error(
                    "Progress storage error:",
                    error
                );
            }

        }
    );
}


/* ================================
   MODAL
================================ */

const openModalButton =
    document.getElementById(
        "open-modal"
    );

const welcomeModal =
    document.getElementById(
        "welcome-modal"
    );


if (openModalButton && welcomeModal) {

    openModalButton.addEventListener(
        "click",
        () => {
            welcomeModal.open();
        }
    );
}