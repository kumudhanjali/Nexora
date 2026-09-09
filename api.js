import { fetchWithRetry } from "./fetchWithRetry.js";
import { saveData, getData } from "./db.js";


const API_BASE =
    "https://jsonplaceholder.typicode.com";


const CACHE_KEYS = {
    dashboard: "dashboard-api-data",
    resources: "learning-resources",
    tasks: "tasks"
};


/* =================================
   DASHBOARD DATA
================================= */

export async function getDashboardData() {

    try {

        const [
            users,
            posts,
            todos
        ] = await Promise.all([

            fetchWithRetry(
                `${API_BASE}/users?_limit=5`
            ),

            fetchWithRetry(
                `${API_BASE}/posts?_limit=6`
            ),

            fetchWithRetry(
                `${API_BASE}/todos?_limit=8`
            )

        ]);


        const data = {
            users,
            posts,
            todos
        };


        await saveData(
            CACHE_KEYS.dashboard,
            data
        );


        return data;

    } catch (error) {

        console.warn(
            "Using cached dashboard data.",
            error
        );


        const cachedData =
            await getData(
                CACHE_KEYS.dashboard
            );


        if (cachedData) {
            return cachedData;
        }


        throw error;
    }
}


/* =================================
   LEARNING RESOURCES
================================= */

export async function getLearningResources() {

    try {

        const posts =
            await fetchWithRetry(
                `${API_BASE}/posts?_limit=6`
            );


        await saveData(
            CACHE_KEYS.resources,
            posts
        );


        return posts;

    } catch (error) {

        console.warn(
            "Using cached learning resources.",
            error
        );


        const cachedPosts =
            await getData(
                CACHE_KEYS.resources
            );


        if (cachedPosts) {
            return cachedPosts;
        }


        throw error;
    }
}


/* =================================
   TASKS
================================= */

export async function getTasks() {

    try {

        const todos =
            await fetchWithRetry(
                `${API_BASE}/todos?_limit=8`
            );


        await saveData(
            CACHE_KEYS.tasks,
            todos
        );


        return todos;

    } catch (error) {

        console.warn(
            "Using cached tasks.",
            error
        );


        const cachedTasks =
            await getData(
                CACHE_KEYS.tasks
            );


        if (cachedTasks) {
            return cachedTasks;
        }


        throw error;
    }
}