const isLocalhost = Boolean(
  window.location.hostname === "localhost" ||
    // [::1] est l'IPv6 localhost
    window.location.hostname === "[::1]" ||
    // 127.0.0.0/8 sont des adresses localhost
    window.location.hostname.match(/^127(?:\.\d+){0,2}\.\d+$/)
);

export function register(config) {
  if ("serviceWorker" in navigator) {
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
    if (publicUrl.origin !== window.location.origin) {
      return;
    }

    window.addEventListener("load", () => {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

      if (isLocalhost) {
        // Cela devrait faire apparaître des messages dans la console.
        checkValidServiceWorker(swUrl, config);
      } else {
        // Enregistrez le service worker
        registerValidSW(swUrl, config);
      }
    });
  }
}

function registerValidSW(swUrl, config) {
  navigator.serviceWorker
    .register(swUrl)
    .then((registration) => {
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (installingWorker == null) {
          return;
        }
        installingWorker.onstatechange = () => {
          if (installingWorker.state === "installed") {
            if (navigator.serviceWorker.controller) {
              // À ce stade, il y a un nouveau service worker.
              console.log("Nouvelle version disponible ! Veuillez recharger.");
            } else {
              // À ce stade, l'application a été mise en cache pour une utilisation hors ligne.
              console.log(
                "Application est en cache pour une utilisation hors ligne."
              );
            }
          }
        };
      };
    })
    .catch((error) => {
      console.error(
        "Erreur lors de l'enregistrement du service worker :",
        error
      );
    });
}

function checkValidServiceWorker(swUrl, config) {
  fetch(swUrl, {
    headers: { "Service-Worker": "script" },
  })
    .then((response) => {
      // Assurez-vous que nous avons un fichier valide.
      const contentType = response.headers.get("content-type");
      if (
        response.status === 404 ||
        (contentType != null && contentType.indexOf("javascript") === -1)
      ) {
        // Avertir l'utilisateur que le service worker n'est pas trouvé.
        navigator.serviceWorker.ready.then((registration) => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        // Enregistrer le service worker
        registerValidSW(swUrl, config);
      }
    })
    .catch(() => {
      console.log(
        "Pas de connexion Internet. Le service worker est probablement pas encore disponible."
      );
    });
}
