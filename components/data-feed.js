import { globalStore } from "../store.js";
import { saveData, getData } from "../db.js";


class DataFeed extends HTMLElement {

    constructor() {
        super();

        const template =
            document.getElementById(
                "data-feed-template"
            );

        this.attachShadow({ mode: "open" });

        this.shadowRoot.appendChild(
            template.content.cloneNode(true)
        );

        this.unsubscribe = null;

        this.handleStateChange =
            this.handleStateChange.bind(this);
    }


    connectedCallback() {

        this.unsubscribe =
            globalStore.subscribe(
                this.handleStateChange
            );

        this.handleStateChange(
            globalStore.getState()
        );

        this.loadLocalData();
    }


    disconnectedCallback() {

        if (this.unsubscribe) {
            this.unsubscribe();
            this.unsubscribe = null;
        }
    }


    handleStateChange(state) {

        const items = state.feed || [
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

        this.render(items);
    }


    render(items) {

        const feed =
            this.shadowRoot.querySelector(
                ".feed-list"
            );

        feed.innerHTML =
            items.map(item => `

                <article class="feed-item">

                    <div class="feed-icon">
                        ${item.icon}
                    </div>

                    <div class="feed-content">

                        <strong>
                            ${item.title}
                        </strong>

                        <div class="feed-meta">

                            <span>
                                ${item.category}
                            </span>

                            <span>•</span>

                            <span>
                                ${item.time}
                            </span>

                        </div>

                    </div>

                    <button
                        class="feed-action"
                        aria-label="Open resource"
                    >
                        →
                    </button>

                </article>

            `).join("");
    }


    async loadLocalData() {

        try {

            const cachedFeed =
                await getData("learning-feed");

            if (cachedFeed) {

                globalStore.setState({
                    feed: cachedFeed
                });

            } else {

                const defaultFeed =
                    globalStore.getState().feed;

                await saveData(
                    "learning-feed",
                    defaultFeed
                );
            }

        } catch (error) {

            console.error(
                "IndexedDB error:",
                error
            );
        }
    }
}


customElements.define(
    "data-feed",
    DataFeed
);