export function initWelcomePage(params) {
  const div = document.createElement("div");
  const imageURL = require("url:../../img/fondo-full.png");

  div.innerHTML = `
  <div class=welcome>
    <div class="title__container">
      <custom-text text="title" class="titulo">
          Piedra Papel ó Tijera
      </custom-text>
    </div>
    <div class="boton-container">
      <boton-el class="boton-welcome">Empezar</boton-el>
    </div>
    <div class="jugada-container">
    <my-jugada class="jugada" jugada="piedra"></my-jugada>
    <my-jugada class="jugada" jugada="papel"></my-jugada>
    <my-jugada class="jugada" jugada="tijera"></my-jugada>
    </div>
  </div>
  `;

  const style = document.createElement("style");
  style.innerHTML = `
  .welcome {
    background-image: url(${imageURL});
    height: 100vh;
    width: 100%;
    padding: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
  } 

  .title__container{
    margin: 0 auto;
    text-align: center;
    width:250px;
    margin-top: 40px;
    margin-bottom: 40px;
  }

  @media (min-width: 900px) {
    .title__container {
      
    }
  }

  .boton-container{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .jugada-container{
    width:280px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    position: fixed;
    bottom: -30px;
  }
  @media (min-width: 769px) {
    .jugada-container{
      width:450px;
    }
  }

  .jugada{
  }
  
  @media (min-width: 769px) {
    .jugada {
    height:180px;
   width: 80px;
    }
  }

  `;

  div.querySelector(".boton-welcome").addEventListener("click", () => {
    params.goTo("/rules");
  });

  div.appendChild(style);

  return div;
}
