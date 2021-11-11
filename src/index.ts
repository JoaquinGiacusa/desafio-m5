import "./components/text";
import "./components/boton";
import "./components/jugada";
import "./components/estrella-results";
import { initRouter } from "./router";
import { state } from "./state";

(function () {
  state.init();
  const root = document.querySelector(".root");
  initRouter(root);
})();
