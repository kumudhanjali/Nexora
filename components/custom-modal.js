class CustomModal extends HTMLElement {
    constructor() {
        super();

        const template = document.getElementById("custom-modal-template");

        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.close = this.close.bind(this);
        this.handleOverlayClick = this.handleOverlayClick.bind(this);
        this.handleKeydown = this.handleKeydown.bind(this);
    }

    connectedCallback() {
        this.overlay = this.shadowRoot.querySelector(".modal-overlay");
        this.closeButton = this.shadowRoot.querySelector(".close-button");

        this.closeButton.addEventListener("click", this.close);
        this.overlay.addEventListener("click", this.handleOverlayClick);

        document.addEventListener("keydown", this.handleKeydown);

        this.updateVisibility();
    }

    disconnectedCallback() {
        this.closeButton?.removeEventListener("click", this.close);
        this.overlay?.removeEventListener("click", this.handleOverlayClick);
        document.removeEventListener("keydown", this.handleKeydown);
    }

    static get observedAttributes() {
        return ["open"];
    }

    attributeChangedCallback() {
        if (this.shadowRoot) {
            this.updateVisibility();
        }
    }

    updateVisibility() {
        const overlay = this.shadowRoot.querySelector(".modal-overlay");

        if (overlay) {
            overlay.hidden = !this.hasAttribute("open");
        }
    }

    handleOverlayClick(event) {
        if (event.target === this.overlay) {
            this.close();
        }
    }

    handleKeydown(event) {
        if (event.key === "Escape" && this.hasAttribute("open")) {
            this.close();
        }
    }

    open() {
        this.setAttribute("open", "");
    }

    close() {
        this.removeAttribute("open");
    }
}

customElements.define("custom-modal", CustomModal);