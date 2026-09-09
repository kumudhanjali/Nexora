/* =========================================
   NEXORA — DAY 48
   Pub/Sub State Store
   ========================================= */

class StateStore {
    constructor(initialState = {}) {
        this.state = initialState;
        this.listeners = [];
    }

    getState() {
        return this.state;
    }

    setState(newState) {
        this.state = {
            ...this.state,
            ...newState
        };

        this.notify();
    }

    subscribe(listener) {
        this.listeners.push(listener);

        return () => {
            this.listeners = this.listeners.filter(
                currentListener => currentListener !== listener
            );
        };
    }

    notify() {
        this.listeners.forEach(listener => {
            listener(this.state);
        });
    }
}

export const globalStore = new StateStore({
    user: {
        name: "Nexora Student",
        role: "Computer Science Learner",
        initials: "NS"
    },

    progress: 76,

    completedTasks: 18,

    focusHours: 14.5,

    learningStreak: 7,

    theme: localStorage.getItem("nexora-theme") || "light"
});