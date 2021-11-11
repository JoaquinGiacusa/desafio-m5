import { initWelcomePage } from "./pages/welcome";
import { initRulesPage } from "./pages/reglas";
import { initJugarPage } from "./pages/jugar";
import { initResultsPage } from "./pages/results";

const routes = [
  {
    path: /\// || /\/welcome/ || /\/desafio-m5/,
    component: initWelcomePage,
  },
  {
    path: /\/rules/,
    component: initRulesPage,
  },
  {
    path: /\/jugar/,
    component: initJugarPage,
  },
  {
    path: /\/results/,
    component: initResultsPage,
  },
];

export function initRouter(container: Element) {
  function goTo(path) {
    history.pushState({}, "", path);
    handleRoute(path);
  }

  function handleRoute(route) {
    for (const r of routes) {
      if (r.path.test(route)) {
        const el = r.component({ goTo: goTo });

        if (container.firstChild) {
          container.firstChild.remove();
        }
        container.appendChild(el);
      }
    }
  }

  handleRoute(location.pathname);

  window.onpopstate = function () {
    handleRoute(location.pathname);
  };
}
