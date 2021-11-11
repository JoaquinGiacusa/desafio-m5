import { state } from "../../state";

export function initJugarPage(params) {
  const div = document.createElement("div");
  const imageURL = require("url:../../img/fondo-full.png");

  div.innerHTML = `
  <div class="jugar">
    <div class="contaier-contador">
      <h3 class="h3">¡Elíge solo una!</h3>
      <div class="contador"></div>
    </div>
    <div class="move-container"></div>
  </div>
  `;
  const style = document.createElement("style");
  style.innerHTML = `
  .jugar {
    background-image: url(${imageURL});
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }

  .contaier-contador{
    height: 100%;
    width: 100%;
  }
  
  .move-container{
    height: 250px;
    width:80%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    position: absolute;
    bottom: 0px;
    align-items: end;
  }

  .contador{
    font-size: 120px;
    font-family: 'Odibee Sans', cursive;
    font-weight: 700;
    color: #009048;
    margin-top: 130px;
    text-align: center;

  }

  .h3{
    font-size: 40px;
    font-family: 'Odibee Sans', cursive;
    font-weight: 700;
    color: black;
    text-align: center;
  }
  `;

  function timeCounter() {
    const contador = div.querySelector(".contador");
    const contaierContador = div.querySelector(".contaier-contador");
    const moveContainer = div.querySelector(".move-container");
    const moves = moveContainer.querySelectorAll("my-jugada");

    let counter = 4;
    const intervalId = setInterval(() => {
      counter--;
      console.log(counter);

      for (const m of moves) {
        if (m.hasAttribute("selected") && counter == 0) {
          clearInterval(intervalId);
          seeElection();
        } else if (counter == -1) {
          clearInterval(intervalId);
          contaierContador.textContent = "";
          const buttom = document.createElement("boton-el");
          buttom.textContent = "Volver a jugar";

          buttom.addEventListener("click", () => {
            params.goTo("./rules");
          });

          const style = document.createElement("style");
          style.innerText = `
          .contaier-contador {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items:center;
            height: 100vh;
            width: 100%;
          }`;
          contaierContador.classList.add("contaier-contador");
          contaierContador.appendChild(style);
          contaierContador.appendChild(buttom);
          moveContainer.textContent = "";
        }
      }

      contador.textContent = `${counter}`;
    }, 1000);
  }

  function randomMove() {
    var myNumeroAleatorio = Math.floor(Math.random() * (4 - 1)) + 1;
    var move = "";
    if (myNumeroAleatorio == 1) {
      move = "piedra";
    } else if (myNumeroAleatorio == 2) {
      move = "papel";
    } else if (myNumeroAleatorio == 3) {
      move = "tijera";
    }
    return move;
  }

  //function que crea las opciones de PPT, selecctiona una al hacerle click,
  //setela el current game, y le asigna una propiedad selected="true"
  function createMoveSelector() {
    const moveContainer = div.querySelector(".move-container");
    moveContainer.innerHTML = `
    <my-jugada jugada="piedra"></my-jugada>
    <my-jugada jugada="papel"></my-jugada>
    <my-jugada jugada="tijera"></my-jugada>
    `;

    const moves = moveContainer.querySelectorAll("my-jugada");

    for (const m of moves) {
      m.addEventListener("mouseover", () => {
        const style = m.shadowRoot.querySelector("style");
        style.textContent = `.jugada{
            max-height: 200px;
            max-width: 100px;
            opacity: 1;
  
          }`;
      });

      m.addEventListener("click", (e) => {
        m.shadowRoot.querySelector("style").textContent = `.jugada{
            max-height: 200px;
            max-width: 100px;
            opacity: 1;
            border:solid 3px;
            margin-bottom: 40px;
          }`;

        m.setAttribute("selected", "true");

        state.setMove({
          computerPlay: randomMove(),
          myPlay: m.getAttribute("jugada"),
        });
      });
    }
  }

  function seeElection() {
    const currentState = state.getState();

    const election = div.querySelector(".jugar");

    const myPlay = currentState.currentGame.myPlay;
    const computerPlay = currentState.currentGame.computerPlay;

    election.innerHTML = `
    <my-jugada jugada="${computerPlay}"></my-jugada>
    <my-jugada jugada="${myPlay}"></my-jugada>
    `;

    const moves = election.querySelectorAll("my-jugada");

    moves[0].shadowRoot.querySelector("style").textContent = `
    .jugada{
      height: 200px;
      width: 100px;
      opacity: 1;
      transform:rotate(180deg);
 
    }
   `;

    moves[1].shadowRoot.querySelector("style").textContent = `
   .jugada{
    height: 200px;
    width: 100px;
     opacity: 1;
   }
  `;

    setTimeout(() => {
      params.goTo("/results");
    }, 2000);
  }

  div.appendChild(style);
  createMoveSelector();
  timeCounter();
  return div;
}
