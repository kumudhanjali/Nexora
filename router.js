export class Router {
    constructor(routes, rootElement) {
        this.routes = routes;
        this.rootElement = rootElement;

        this.handleNavigation = this.handleNavigation.bind(this);
        this.handleLinkClick = this.handleLinkClick.bind(this);
    }

    init() {
        document.addEventListener(
            "click",
            this.handleLinkClick
        );

        window.addEventListener(
            "popstate",
            this.handleNavigation
        );

        this.handleNavigation();
    }

    handleLinkClick(event) {
        const link = event.target.closest("a[data-route]");

        if (!link) {
            return;
        }

        event.preventDefault();

        const path = link.getAttribute("href");

        if (path) {
            history.pushState({}, "", path);
            this.handleNavigation();
        }
    }

    async handleNavigation() {
        const path = window.location.pathname;

        const route =
            this.routes[path] ||
            this.routes["/"];

        await route();
    }

    navigate(path) {
        history.pushState({}, "", path);
        this.handleNavigation();
    }
}