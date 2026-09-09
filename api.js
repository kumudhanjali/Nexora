import { fetchWithRetry } from "./fetchWithRetry.js";

const API_BASE = "https://jsonplaceholder.typicode.com";

export async function getDashboardData() {
    const [users, posts, todos] = await Promise.all([
        fetchWithRetry(`${API_BASE}/users?_limit=5`),
        fetchWithRetry(`${API_BASE}/posts?_limit=6`),
        fetchWithRetry(`${API_BASE}/todos?_limit=8`)
    ]);

    return {
        users,
        posts,
        todos
    };
}

export async function getLearningResources() {
    const posts = await fetchWithRetry(
        `${API_BASE}/posts?_limit=6`
    );

    return posts;
}

export async function getTasks() {
    const todos = await fetchWithRetry(
        `${API_BASE}/todos?_limit=8`
    );

    return todos;
}