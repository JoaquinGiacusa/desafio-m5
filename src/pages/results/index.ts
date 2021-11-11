import { state } from "../../state";

export function initResultsPage(params) {
  const div = document.createElement("div");
  const imageURL = require("url:../../img/fondo-full.png");

  div.innerHTML = `
  <div class="resutls">
    <div class="container"></div>
  </div>
  `;

  const style = document.createElement("style");
  style.innerHTML = `
  .resutls {
    background-image: url(${imageURL});
    height: 100vh;
    width: 100%;
  
  }
  .score{
    background: #ffffff;
    border: 10px solid #000000;
    box-sizing: border-box;
    border-radius: 10px;
    padding: 20px;
    max-width:350px;
  }
  .container{
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    flex-direction: column;
    align-items: center;
  }
  `;
  function showWhoWin() {
    const container = div.querySelector(".container");
    const currentState = state.getState();

    const resultado = state.whoWins(
      currentState.currentGame.myPlay,
      currentState.currentGame.computerPlay
    );

    const historial = state.winsResults(currentState.history);
    container.innerHTML = `
    <div class="img-container">
    <estrella-el result=${resultado}></estrella-el>
    </div>
    <div class="score">
    <custom-text text="body">Score</custom-text>
    <custom-text text="body">Ganadas:${historial[0]}</custom-text>
    <custom-text text="body">Perdidas:${historial[1]}</custom-text>
    </div>
    <boton-el class="boton">Volver a jugar</boton-el>
    `;
    container.querySelector(".boton").addEventListener("click", () => {
      params.goTo("/rules");
    });
  }

  showWhoWin();
  div.append(style);
  return div;
}
