# Nexora — Learn. Plan. Grow. 🚀

Nexora is a modern, responsive student productivity and learning workspace designed to bring learning progress, tasks, resources, and personal insights together in one place.

Built as the final capstone project for the **50 Days Web Development Challenge with Synexus**, Nexora was developed progressively across Days 46–50 using native web technologies and a lightweight, framework-free architecture.

---

## 🌐 Project Links

- **Source Code:** https://github.com/kumudhanjali/Nexora
- **Live Demo:** https://nexora-two-woad.vercel.app


## ✨ Overview

Nexora combines a clean dashboard experience with reusable Web Components, centralized state management, client-side persistence, SPA routing, external API integration, and offline capabilities.

The project demonstrates how a modern single-page application can be built using **HTML, CSS, and JavaScript without relying on heavy frontend frameworks**.

The application was developed incrementally throughout the final phase:

| Day | Focus | Implementation |
|-----|-------|----------------|
| Day 46 | Core UI Shell | Responsive layout, theme system, dashboard interface |
| Day 47 | Component Library | Web Components, Shadow DOM, Template API |
| Day 48 | State & Memory | Pub/Sub state management and IndexedDB |
| Day 49 | Data Streams & Routing | SPA routing, APIs, retry logic, Promise.all() |
| Day 50 | Offline & Polish | Service Worker, caching, offline fallback, final UI polish |

---

## 🎯 Key Features

### 📊 Interactive Dashboard

- Student progress overview
- Completed task statistics
- Focus hour tracking
- Learning streak
- Weekly progress visualization
- Learning feed
- Daily motivational section

### 🧩 Native Web Components

Nexora uses reusable custom elements:

- `<user-card>`
- `<data-feed>`
- `<custom-modal>`

Each component uses:

- Shadow DOM
- HTML `<template>`
- Component lifecycle methods
- Reactive state subscriptions

### 🗃️ State Management

A lightweight custom Pub/Sub architecture manages application state.

The global store manages information such as:

- User information
- Progress
- Completed tasks
- Focus hours
- Learning streak
- Theme
- Learning feed data

Components subscribe to the global state when connected and unsubscribe when disconnected.

### 💾 IndexedDB Persistence

Nexora uses IndexedDB for local client-side storage.

Cached information includes:

- Theme preference
- Progress
- Learning feed
- API dashboard data
- Tasks
- Learning resources

This allows the application to retain useful information locally and support offline behavior.

### 🧭 Single Page Application Routing

Nexora includes a custom Vanilla JavaScript SPA router.

Available routes:

- `/`
- `/tasks`
- `/learning`
- `/analytics`

Navigation links are intercepted by the router and views are dynamically rendered without performing a complete page reload.

### 🌐 External API Integration

Nexora retrieves external data using the JSONPlaceholder API.

The application fetches:

- Users
- Posts
- Tasks

Multiple data sources are requested concurrently using `Promise.all()`.

### 🔄 Fetch Retry Utility

A reusable `fetchWithRetry()` utility was implemented to improve API reliability.

When an API request fails, the utility automatically retries the request before returning the final error.

### 📡 Offline Capability

A Service Worker provides offline support for the application.

It:

- Caches core application files
- Intercepts network requests
- Caches API responses
- Uses cached responses when the network is unavailable
- Returns the cached application shell for offline navigation

Nexora also displays an online/offline connection indicator.

### 🌓 Light & Dark Themes

The application supports both light and dark themes.

Theme preferences are persisted using:

- `localStorage`
- IndexedDB

### 📱 Responsive Design

The interface adapts to different screen sizes, including:

- Desktop
- Tablet
- Mobile

The layout uses responsive CSS grids, flexible components, and mobile navigation behavior.

### ⚠️ Loading & Error States

Asynchronous operations provide user feedback through:

- Loading indicators
- Friendly error messages
- Retry actions
- Offline status information

---

# 🏗️ Architecture

Nexora follows a lightweight modular architecture:

```text
                         ┌─────────────────────┐
                         │      Nexora UI      │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │     SPA Router      │
                         │    router.js        │
                         └──────────┬──────────┘
                                    │
                     ┌──────────────┼──────────────┐
                     ▼              ▼              ▼
                Dashboard         Tasks         Learning
                     │              │              │
                     └──────────────┼──────────────┘
                                    ▼
                         ┌─────────────────────┐
                         │      API Layer      │
                         │      api.js         │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │ fetchWithRetry.js   │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │    External APIs    │
                         └─────────────────────┘


                         ┌─────────────────────┐
                         │    Global Store     │
                         │      store.js       │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │   Web Components    │
                         │ User Card / Feed /  │
                         │       Modal         │
                         └─────────────────────┘


                         ┌─────────────────────┐
                         │      IndexedDB      │
                         │       db.js         │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │   Local Persistence │
                         └─────────────────────┘


                         ┌─────────────────────┐
                         │   Service Worker    │
                         │       sw.js         │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │   Cache Storage     │
                         └─────────────────────┘
```

---

# 🧩 Technology Stack

### Frontend

- HTML5
- CSS3
- JavaScript (ES6+)

### Browser APIs

- Web Components API
- Shadow DOM
- HTML Template API
- IndexedDB
- Service Worker API
- Fetch API
- History API
- Local Storage API

### External Data

- JSONPlaceholder REST API

### Development

- Visual Studio Code
- Live Server
- Git
- GitHub

### Deployment

- Vercel

---

# 📁 Project Structure

```text
Nexora/
│
├── components/
│   ├── custom-modal.js
│   ├── data-feed.js
│   └── user-card.js
│
├── views/
│   └── views.js
│
├── api.js
├── db.js
├── fetchWithRetry.js
├── index.html
├── main.js
├── router.js
├── store.js
├── style.css
├── sw.js
└── README.md
```

---

# 🔍 File Responsibilities

## `index.html`

Contains:

- Main application structure
- Responsive-ready HTML
- Web Component templates
- Navigation
- Modal structure
- Application root
- Metadata

The main SPA mount point is:

```html
<main id="app-root">
```

---

## `style.css`

Contains the global design system and styling, including:

- CSS custom properties
- Light theme
- Dark theme
- Layout systems
- Cards
- Navigation
- Dashboard
- Loading states
- Error states
- Responsive breakpoints
- Animations

---

## `main.js`

Acts as the main application entry point.

Responsible for:

- Router initialization
- Theme management
- Progress state updates
- Modal interaction
- Online/offline status
- Service Worker registration

---

## `router.js`

Implements the Vanilla JavaScript SPA router.

Responsibilities:

- Intercept internal navigation
- Use the History API
- Update browser URLs
- Handle browser back/forward navigation
- Render the correct view without a complete page reload

---

## `store.js`

Contains the lightweight Pub/Sub state management system.

The store provides:

```text
getState()
setState()
subscribe()
notify()
```

This allows different parts of Nexora to react to application state changes.

---

## `db.js`

Provides IndexedDB helper functions:

```text
saveData()
getData()
deleteData()
```

These functions allow Nexora to persist application information locally.

---

## `fetchWithRetry.js`

Provides a reusable API request utility that:

1. Performs a fetch request
2. Detects failed responses
3. Retries failed requests
4. Returns the response data
5. Throws an error after the retry limit is reached

---

## `api.js`

Acts as the application's API layer.

It retrieves external data and uses:

```javascript
Promise.all()
```

to perform multiple dashboard requests concurrently.

It also stores successful API results in IndexedDB and falls back to cached data when network requests fail.

---

## `views/views.js`

Contains the SPA views:

```text
Dashboard
Tasks
Learning
Analytics
```

Each view handles its own loading, data rendering, and error state.

---

## `components/`

Contains Nexora's reusable native Web Components.

### `user-card.js`

Displays:

- Student name
- Role
- Initials
- Progress

It reacts to changes in the global application state.

### `data-feed.js`

Displays learning resources and uses IndexedDB for local data caching.

### `custom-modal.js`

Provides a reusable modal component with:

- Shadow DOM
- Slots
- Open/close behavior
- Overlay interaction
- Escape-key handling
- Component lifecycle cleanup

---

## `sw.js`

Contains the Service Worker implementation.

It provides:

- Application shell caching
- API response caching
- Offline fallback
- Cache version management
- Cache cleanup
- Network/cache request strategies

---

# 🔄 Application Flow

When Nexora starts:

```text
1. Browser loads Nexora
        ↓
2. main.js initializes
        ↓
3. Service Worker registers
        ↓
4. SPA Router initializes
        ↓
5. Dashboard view loads
        ↓
6. API requests are made
        ↓
7. Promise.all() resolves data
        ↓
8. Data is stored in IndexedDB
        ↓
9. Global state is updated
        ↓
10. Web Components reactively update
        ↓
11. UI renders the latest information
```

---

# 📡 Offline Data Flow

When Nexora is online:

```text
Browser
   ↓
Service Worker
   ↓
Network
   ↓
External API
   ↓
Response
   ↓
Cache + IndexedDB
   ↓
Nexora UI
```

When the network is unavailable:

```text
Browser
   ↓
Service Worker
   ↓
Cached Response
   ↓
IndexedDB Fallback
   ↓
Nexora UI
```

This allows previously loaded application data to remain accessible even when the network connection is unavailable.

---

# 🛠️ Running the Project Locally

## 1. Clone the repository

Clone the Nexora repository to your local machine.

## 2. Open the project

Open the project folder in Visual Studio Code.

## 3. Start a local server

Because Nexora uses ES modules and a Service Worker, it should be served through HTTP rather than opened directly using `file://`.

You can use the **Live Server** extension in Visual Studio Code.

## 4. Launch Nexora

Open the application through the local server.

Example:

```text
http://localhost:5500/
```

The exact port may vary depending on your local development environment.

---

# 🧪 Testing

The application was tested across the following areas:

### Navigation

- Dashboard
- Tasks
- Learning
- Analytics
- Browser back/forward navigation

### State

- Progress updates
- Reactive Web Components
- Theme changes

### Persistence

- IndexedDB data storage
- Local theme persistence
- Cached API data

### API

- External API requests
- Retry behavior
- Concurrent requests using `Promise.all()`
- API error handling

### Offline

- Service Worker registration
- Application shell caching
- Cached API responses
- Offline navigation
- Offline connection indicator

### Responsive UI

- Desktop layout
- Tablet layout
- Mobile layout
- Light theme
- Dark theme

---

# 🔐 Data & Privacy

Nexora stores application-related information locally in the browser using IndexedDB and Local Storage.

The project does not require a user account or server-side database.

External demonstration data is retrieved from the JSONPlaceholder API.

No sensitive personal information is required for the application to function.

---

# 🚀 Future Improvements

Possible future enhancements include:

- User authentication
- Real student profiles
- Persistent task creation and editing
- Calendar integration
- Real learning-resource APIs
- Advanced analytics
- Notifications and reminders
- Cloud synchronization
- More sophisticated offline synchronization
- Installable application support with a web app manifest

---

# 🎓 Learning Outcomes

Building Nexora provided practical experience with:

- Semantic HTML
- Responsive CSS
- CSS custom properties
- JavaScript modules
- Web Components
- Shadow DOM
- Template API
- Component lifecycle methods
- Pub/Sub architecture
- State management
- IndexedDB
- Fetch API
- Promise-based asynchronous programming
- `Promise.all()`
- Retry mechanisms
- SPA routing
- History API
- Service Workers
- Cache Storage
- Offline-first techniques
- Error handling
- Loading states
- Responsive UI development
- Git and GitHub
- Deployment

---

# 🗓️ 50 Days Web Development Challenge

Nexora was developed as the final capstone project for the **50 Days Web Development Challenge with Synexus**.

The final five days focused on integrating concepts learned throughout the challenge into one complete application.

### Phase 5 — Capstone Integration

**Day 46 — Core UI Shell**

Built the foundational Nexora interface with responsive layouts and a CSS variable-based theme system.

**Day 47 — Component Library**

Introduced reusable native Web Components using Shadow DOM and the HTML Template API.

**Day 48 — State & Memory Management**

Implemented centralized Pub/Sub state management and IndexedDB-based local persistence.

**Day 49 — Data Streams & Routing**

Added Vanilla JavaScript SPA routing, external API integration, retry handling, and concurrent API requests using `Promise.all()`.

**Day 50 — Offline Capabilities & Polish**

Implemented Service Worker caching, offline API fallback, connection status detection, loading states, error handling, and final interface improvements.

---

# 💡 Why Nexora?

Nexora was designed around a simple idea:

> **Learning becomes more effective when progress, planning, and resources are organized in one place.**

The goal was to create a project that was not only visually polished, but also demonstrated practical frontend architecture using native browser technologies.

---

# 👩‍💻 Author

**Kumudhanjali**

Built as part of the **50 Days Web Development Challenge with Synexus**.

---

# 📜 License

This project was created for educational and portfolio purposes as part of the 50 Days Web Development Challenge.