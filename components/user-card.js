import { globalStore } from "../store.js";

class UserCard extends HTMLElement {

    constructor() {
        super();

        const template =
            document.getElementById("user-card-template");

        this.attachShadow({ mode: "open" });

        this.shadowRoot.appendChild(
            template.content.cloneNode(true)
        );

        this.unsubscribe = null;

        this.handleStateChange =
            this.handleStateChange.bind(this);
    }


    connectedCallback() {

        /* Subscribe when connected */

        this.unsubscribe =
            globalStore.subscribe(
                this.handleStateChange
            );

        /* Render current state immediately */

        this.handleStateChange(
            globalStore.getState()
        );
    }


    disconnectedCallback() {

        /* Prevent memory leaks */

        if (this.unsubscribe) {
            this.unsubscribe();
            this.unsubscribe = null;
        }
    }


    handleStateChange(state) {

        const user =
            state.user || {};

        const progress =
            state.progress ?? 0;

        this.shadowRoot.querySelector(".name")
            .textContent =
            user.name || "Student";

        this.shadowRoot.querySelector(".role")
            .textContent =
            user.role || "Learner";

        this.shadowRoot.querySelector(".avatar")
            .textContent =
            user.initials || "S";

        this.shadowRoot.querySelector(".progress-value")
            .textContent =
            `${progress}%`;

        this.shadowRoot.querySelector(
            ".progress-bar span"
        ).style.width =
            `${progress}%`;
    }
}

customElements.define(
    "user-card",
    UserCard
);