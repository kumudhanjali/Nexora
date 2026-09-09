class DataFeed extends HTMLElement {
    constructor() {
        super();

        const template = document.getElementById("data-feed-template");

        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        const items = [
            {
                icon: "JS",
                title: "Modern JavaScript Essentials",
                category: "Development",
                time: "12 min read"
            },
            {
                icon: "UI",
                title: "Designing Better Interfaces",
                category: "Design",
                time: "8 min read"
            },
            {
                icon: "AI",
                title: "Understanding AI Fundamentals",
                category: "Technology",
                time: "15 min read"
            }
        ];

        const feed = this.shadowRoot.querySelector(".feed-list");

        feed.innerHTML = items.map(item => `
            <article class="feed-item">
                <div class="feed-icon">${item.icon}</div>

                <div class="feed-content">
                    <strong>${item.title}</strong>

                    <div class="feed-meta">
                        <span>${item.category}</span>
                        <span>•</span>
                        <span>${item.time}</span>
                    </div>
                </div>

                <button class="feed-action" aria-label="Open resource">
                    →
                </button>
            </article>
        `).join("");
    }
}

customElements.define("data-feed", DataFeed);