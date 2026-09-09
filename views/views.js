import {
    getDashboardData,
    getLearningResources,
    getTasks
} from "../api.js";

import { globalStore } from "../store.js";

function setActiveNavigation(path) {
    document.querySelectorAll("[data-route]").forEach(link => {
        const linkPath = link.getAttribute("href");

        link.classList.toggle(
            "active",
            linkPath === path
        );
    });
}

function renderLoading(title = "Loading your workspace...") {
    return `
        <section class="page-section">
            <div class="loading-state">
                <div class="spinner"></div>
                <h2>${title}</h2>
                <p>Please wait while Nexora loads your data.</p>
            </div>
        </section>
    `;
}

function renderError(message) {
    return `
        <section class="page-section">
            <div class="error-state">
                <div class="error-icon">!</div>
                <h2>Something went wrong</h2>
                <p>${message}</p>
                <button
                    class="primary-button"
                    onclick="location.reload()"
                >
                    Try Again
                </button>
            </div>
        </section>
    `;
}

export async function renderDashboard(root) {
    setActiveNavigation("/");

    root.innerHTML = renderLoading(
        "Loading your dashboard..."
    );

    try {
        const data = await getDashboardData();

        const feed = data.posts.map((post, index) => ({
            icon: ["JS", "UI", "AI", "WD", "UX", "API"][index],
            title: post.title
                .split(" ")
                .slice(0, 6)
                .join(" "),
            category: [
                "Development",
                "Design",
                "Technology",
                "Web",
                "UX",
                "API"
            ][index],
            time: `${8 + index * 2} min read`
        }));

        globalStore.setState({
            feed
        });

        root.innerHTML = `
            <section class="page-section">

                <div class="page-heading">
                    <div>
                        <p class="eyebrow">WELCOME BACK</p>
                        <h1>Good to see you again 👋</h1>
                        <p>
                            Here's what's happening in your
                            learning workspace today.
                        </p>
                    </div>

                    <div class="live-status">
                        <span class="status-dot"></span>
                        Live data
                    </div>
                </div>

                <div class="stats-grid">

                    <article class="stat-card">
                        <div class="stat-icon">✓</div>
                        <div>
                            <span>Completed Tasks</span>
                            <strong>
                                ${globalStore.getState().completedTasks}
                            </strong>
                        </div>
                    </article>

                    <article class="stat-card">
                        <div class="stat-icon">◷</div>
                        <div>
                            <span>Focus Hours</span>
                            <strong>
                                ${globalStore.getState().focusHours}
                            </strong>
                        </div>
                    </article>

                    <article class="stat-card">
                        <div class="stat-icon">↗</div>
                        <div>
                            <span>Learning Streak</span>
                            <strong>
                                ${globalStore.getState().learningStreak} days
                            </strong>
                        </div>
                    </article>

                    <article class="stat-card">
                        <div class="stat-icon">◎</div>
                        <div>
                            <span>API Resources</span>
                            <strong>${data.posts.length}</strong>
                        </div>
                    </article>

                </div>

                <div class="dashboard-grid">

                    <div class="dashboard-column">

                        <section class="content-card">
                            <div class="card-heading">
                                <div>
                                    <span class="card-label">
                                        PROFILE
                                    </span>
                                    <h2>Your Progress</h2>
                                </div>
                            </div>

                            <user-card
                                name="Nexora Student"
                                role="Computer Science Learner"
                                initials="NS"
                                progress="${globalStore.getState().progress}"
                            ></user-card>

                        </section>

                        <section class="content-card">
                            <div class="card-heading">
                                <div>
                                    <span class="card-label">
                                        DATA STREAM
                                    </span>
                                    <h2>Learning Feed</h2>
                                </div>

                                <span class="api-badge">
                                    API
                                </span>
                            </div>

                            <data-feed></data-feed>
                        </section>

                    </div>

                    <aside class="dashboard-side">

                        <section class="content-card progress-card">

                            <div class="card-heading">
                                <div>
                                    <span class="card-label">
                                        THIS WEEK
                                    </span>
                                    <h2>Weekly Progress</h2>
                                </div>
                            </div>

                            <div class="progress-ring">
                                <div class="progress-ring-inner">
                                    <strong>68%</strong>
                                    <span>Complete</span>
                                </div>
                            </div>

                            <div class="progress-details">
                                <div>
                                    <span>Completed</span>
                                    <strong>18 tasks</strong>
                                </div>

                                <div>
                                    <span>Remaining</span>
                                    <strong>8 tasks</strong>
                                </div>
                            </div>

                        </section>

                        <section class="content-card inspiration-card">

                            <span class="card-label">
                                DAILY NOTE
                            </span>

                            <div class="quote-mark">“</div>

                            <p>
                                Small progress every day
                                creates remarkable results.
                            </p>

                            <span class="quote-author">
                                — Nexora
                            </span>

                        </section>

                    </aside>

                </div>

            </section>
        `;

    } catch (error) {
        console.error(error);

        root.innerHTML = renderError(
            "We couldn't load the latest dashboard data. Please check your connection and try again."
        );
    }
}


export async function renderTasks(root) {
    setActiveNavigation("/tasks");

    root.innerHTML = renderLoading(
        "Loading your tasks..."
    );

    try {
        const tasks = await getTasks();

        root.innerHTML = `
            <section class="page-section">

                <div class="page-heading">
                    <div>
                        <p class="eyebrow">YOUR WORKSPACE</p>
                        <h1>Tasks</h1>
                        <p>
                            Stay organized and keep your
                            learning goals moving forward.
                        </p>
                    </div>
                </div>

                <div class="task-list">

                    ${tasks.map(task => `
                        <article class="task-card">

                            <div class="task-check ${
                                task.completed ? "completed" : ""
                            }">
                                ${task.completed ? "✓" : ""}
                            </div>

                            <div class="task-info">
                                <strong>
                                    ${task.title}
                                </strong>

                                <span>
                                    ${task.completed
                                        ? "Completed"
                                        : "In progress"}
                                </span>
                            </div>

                            <span class="task-status ${
                                task.completed
                                    ? "done"
                                    : "pending"
                            }">
                                ${
                                    task.completed
                                        ? "Done"
                                        : "Pending"
                                }
                            </span>

                        </article>
                    `).join("")}

                </div>

            </section>
        `;

    } catch (error) {
        console.error(error);

        root.innerHTML = renderError(
            "Tasks could not be loaded right now."
        );
    }
}


export async function renderLearning(root) {
    setActiveNavigation("/learning");

    root.innerHTML = renderLoading(
        "Loading learning resources..."
    );

    try {
        const resources =
            await getLearningResources();

        const categories = [
            "Development",
            "Design",
            "Technology",
            "Web Development",
            "UX",
            "APIs"
        ];

        root.innerHTML = `
            <section class="page-section">

                <div class="page-heading">
                    <div>
                        <p class="eyebrow">LEARNING HUB</p>
                        <h1>Learning Resources</h1>
                        <p>
                            Explore curated resources
                            for your development journey.
                        </p>
                    </div>
                </div>

                <div class="resource-grid">

                    ${resources.map((resource, index) => `
                        <article class="resource-card">

                            <div class="resource-icon">
                                ${["JS", "UI", "AI", "WD", "UX", "API"][index]}
                            </div>

                            <div class="resource-content">

                                <span class="resource-category">
                                    ${categories[index]}
                                </span>

                                <h3>
                                    ${resource.title}
                                </h3>

                                <p>
                                    ${resource.body
                                        .split(" ")
                                        .slice(0, 15)
                                        .join(" ")}...
                                </p>

                                <button class="text-button">
                                    Explore →
                                </button>

                            </div>

                        </article>
                    `).join("")}

                </div>

            </section>
        `;

    } catch (error) {
        console.error(error);

        root.innerHTML = renderError(
            "Learning resources could not be loaded."
        );
    }
}


export async function renderAnalytics(root) {
    setActiveNavigation("/analytics");

    root.innerHTML = renderLoading(
        "Preparing your analytics..."
    );

    try {
        const data = await getDashboardData();

        const completed =
            data.todos.filter(todo => todo.completed).length;

        const total = data.todos.length;

        const completionRate =
            Math.round((completed / total) * 100);

        root.innerHTML = `
            <section class="page-section">

                <div class="page-heading">
                    <div>
                        <p class="eyebrow">INSIGHTS</p>
                        <h1>Analytics</h1>
                        <p>
                            A simple overview of your
                            current learning activity.
                        </p>
                    </div>
                </div>

                <div class="analytics-grid">

                    <article class="analytics-card">
                        <span>Task Completion</span>
                        <strong>${completionRate}%</strong>

                        <div class="analytics-bar">
                            <span
                                style="width:${completionRate}%"
                            ></span>
                        </div>
                    </article>

                    <article class="analytics-card">
                        <span>Learning Resources</span>
                        <strong>${data.posts.length}</strong>

                        <p>
                            Resources available from
                            the current data stream.
                        </p>
                    </article>

                    <article class="analytics-card">
                        <span>Active Data Sources</span>
                        <strong>3</strong>

                        <p>
                            Users, posts and tasks are
                            fetched concurrently.
                        </p>
                    </article>

                </div>

                <section class="content-card architecture-card">

                    <span class="card-label">
                        DATA ARCHITECTURE
                    </span>

                    <h2>How Nexora loads data</h2>

                    <div class="architecture-flow">

                        <div>
                            <strong>API</strong>
                            <span>External Sources</span>
                        </div>

                        <b>→</b>

                        <div>
                            <strong>Promise.all()</strong>
                            <span>Parallel Requests</span>
                        </div>

                        <b>→</b>

                        <div>
                            <strong>Store</strong>
                            <span>Application State</span>
                        </div>

                        <b>→</b>

                        <div>
                            <strong>UI</strong>
                            <span>Reactive Views</span>
                        </div>

                    </div>

                </section>

            </section>
        `;

    } catch (error) {
        console.error(error);

        root.innerHTML = renderError(
            "Analytics data could not be loaded."
        );
    }
}