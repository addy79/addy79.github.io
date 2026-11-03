/*! coi-serviceworker v0.1.7 - Guido Zuidhof, licensed under MIT */
let coepCredentialless = false;
if (typeof window === 'undefined') {
    self.addEventListener("install", () => self.skipWaiting());
    self.addEventListener("activate", (event) => event.waitUntil(self.clients.claim()));

    self.addEventListener("message", (ev) => {
        if (!ev.data) {
            return;
        } else if (ev.data.type === "deregister") {
            self.registration
                .unregister()
                .then(() => self.clients.matchAll())
                .then(clients => clients.forEach(client => client.navigate(client.url)));
        } else if (ev.data.type === "coepCredentialless") {
            coepCredentialless = ev.data.value;
        }
    });

    self.addEventListener("fetch", function (event) {
        const r = event.request;
        if (r.cache === "only-if-cached" && r.mode !== "same-origin") return;

        const request = (coepCredentialless && r.mode === "no-cors")
            ? new Request(r, { credentials: "omit" })
            : r;
        event.respondWith(
            fetch(request)
                .then((response) => {
                    if (response.status === 0) return response;
                    const newHeaders = new Headers(response.headers);
                    newHeaders.set("Cross-Origin-Opener-Policy", "same-origin");
                    newHeaders.set("Cross-Origin-Embedder-Policy", coepCredentialless ? "credentialless" : "require-corp");
                    return new Response(response.body, {
                        status: response.status,
                        statusText: response.statusText,
                        headers: newHeaders,
                    });
                })
                .catch((e) => console.error(e))
        );
    });
} else {
    (() => {
        const reloadedBySelf = window.sessionStorage.getItem("coiReloadedBySelf");
        window.sessionStorage.removeItem("coiReloadedBySelf");
        const coi = {
            shouldRegister: () => !reloadedBySelf,
            shouldDeregister: () => false,
            coepCredentialless: () => false,
            doReload: () => window.location.reload(),
            quiet: false,
            ...window.coi
        };
        const n = navigator;
        if (n.serviceWorker && n.serviceWorker.controller) {
            n.serviceWorker.controller.postMessage({ type: "coepCredentialless", value: coi.coepCredentialless() });
            if (coi.shouldDeregister()) n.serviceWorker.controller.postMessage({ type: "deregister" });
        }
        if (window.crossOriginIsolated !== false) return;
        const currentScript = document.currentScript;
        const src = currentScript ? currentScript.src : "coi-serviceworker.js";
        if (coi.shouldRegister()) {
            n.serviceWorker.register(src).then(
                (registration) => {
                    registration.addEventListener("updatefound", () => {
                        window.sessionStorage.setItem("coiReloadedBySelf", "true");
                        coi.doReload();
                    });
                    if (registration.active) {
                        window.sessionStorage.setItem("coiReloadedBySelf", "true");
                        coi.doReload();
                    }
                },
                (err) => console.error("COI Error:", err)
            );
        }
    })();
}
