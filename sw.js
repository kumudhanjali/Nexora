const CACHE_NAME = "nexora-v1";

const CORE_FILES = [
    "./",
    "./index.html",
    "./style.css",
    "./main.js",
    "./router.js",
    "./api.js",
    "./fetchWithRetry.js",
    "./store.js",
    "./db.js",

    "./components/user-card.js",
    "./components/data-feed.js",
    "./components/custom-modal.js",

    "./views/views.js"
];


/* =================================
   INSTALL
================================= */

self.addEventListener("install", event => {

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(CORE_FILES))
            .then(() => self.skipWaiting())
    );

});


/* =================================
   ACTIVATE
================================= */

self.addEventListener("activate", event => {

    event.waitUntil(

        caches.keys()
            .then(cacheNames => {

                return Promise.all(

                    cacheNames
                        .filter(name => name !== CACHE_NAME)
                        .map(name => caches.delete(name))

                );

            })
            .then(() => self.clients.claim())

    );

});


/* =================================
   FETCH
================================= */

self.addEventListener("fetch", event => {

    const request = event.request;

    if (request.method !== "GET") {
        return;
    }


    const url = new URL(request.url);


    /*
       API requests:
       Network first → Cache fallback
    */

    if (
        url.hostname === "jsonplaceholder.typicode.com"
    ) {

        event.respondWith(

            fetch(request)
                .then(response => {

                    if (response && response.ok) {

                        const responseClone =
                            response.clone();

                        caches.open(CACHE_NAME)
                            .then(cache => {
                                cache.put(
                                    request,
                                    responseClone
                                );
                            });

                    }

                    return response;

                })
                .catch(() => {

                    return caches.match(request)
                        .then(cachedResponse => {

                            if (cachedResponse) {
                                return cachedResponse;
                            }

                            return new Response(
                                JSON.stringify({
                                    error:
                                        "Offline and no cached data is available."
                                }),
                                {
                                    status: 503,
                                    headers: {
                                        "Content-Type":
                                            "application/json"
                                    }
                                }
                            );

                        });

                })

        );

        return;
    }


    /*
       Application files:
       Cache first → Network fallback
    */

    event.respondWith(

        caches.match(request)
            .then(cachedResponse => {

                if (cachedResponse) {
                    return cachedResponse;
                }

                return fetch(request)
                    .then(response => {

                        if (
                            response &&
                            response.ok
                        ) {

                            const responseClone =
                                response.clone();

                            caches.open(CACHE_NAME)
                                .then(cache => {
                                    cache.put(
                                        request,
                                        responseClone
                                    );
                                });

                        }

                        return response;

                    });

            })
            .catch(() => {

                /*
                   If the user navigates while offline,
                   return the cached application shell.
                */

                if (
                    request.mode === "navigate"
                ) {

                    return caches.match(
                        "./index.html"
                    );

                }

            })

    );

});