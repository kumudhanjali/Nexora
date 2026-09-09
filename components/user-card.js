class UserCard extends HTMLElement {
    constructor() {
        super();

        const template = document.getElementById("user-card-template");

        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        const name = this.getAttribute("name") || "Student";
        const role = this.getAttribute("role") || "Learner";
        const initials = this.getAttribute("initials") || "S";
        const progress = this.getAttribute("progress") || "0";

        this.shadowRoot.querySelector(".name").textContent = name;
        this.shadowRoot.querySelector(".role").textContent = role;
        this.shadowRoot.querySelector(".avatar").textContent = initials;
        this.shadowRoot.querySelector(".progress-value").textContent = `${progress}%`;
        this.shadowRoot.querySelector(".progress-bar span").style.width = `${progress}%`;
    }
}

customElements.define("user-card", UserCard);