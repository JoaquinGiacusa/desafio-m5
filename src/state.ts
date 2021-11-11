type Jugada = "piedra" | "papel" | "tijera";
type Game = {
  computerPlay: Jugada;
  myPlays: Jugada;
};

const state = {
  data: {
    currentGame: { computerPlay: "", myPlay: "" },
    history: [],
  },
  listeners: [],

  init() {
    const localData = localStorage.getItem("saved-state");

    if (localData == null) {
      const currentState = this.getState();
      this.setState(currentState);
    } else this.setState(JSON.parse(localData));
  },

  pushToHistory(play: Game) {
    const currentState = this.getState();
    currentState.history.push(play);
  },

  setMove(move) {
    const lastState = this.getState();
    lastState.currentGame = move;
    this.pushToHistory(move);
  },

  whoWins(myPlay: Jugada, computerPlay: Jugada) {
    const ganeConPiedra = myPlay == "piedra" && computerPlay == "tijera";
    const ganeConPapel = myPlay == "papel" && computerPlay == "piedra";
    const ganeConTijera = myPlay == "tijera" && computerPlay == "papel";

    const empateConPiedra = myPlay == "piedra" && computerPlay == "piedra";
    const empateConPapel = myPlay == "papel" && computerPlay == "papel";
    const empateConTijera = myPlay == "tijera" && computerPlay == "tijera";

    if (empateConPiedra || empateConPapel || empateConTijera) {
      return "Empate";
    } else if ([ganeConPiedra, ganeConPapel, ganeConTijera].includes(true)) {
      return "Ganaste";
    } else {
      return "Perdiste";
    }
  },

  winsResults(history) {
    var ganadas = 0;
    var perdidas = 0;
    for (const jugada of history) {
      const resultado = this.whoWins(jugada.myPlay, jugada.computerPlay);

      if (resultado == "Empate") {
      } else if (resultado == "Ganaste") {
        ganadas++;
      } else {
        perdidas++;
      }
    }
    const currentState = this.getState();
    this.setState(currentState);

    return [ganadas, perdidas];
  },

  getState() {
    return this.data;
  },
  setState(newState) {
    this.data = newState;
    for (const cb of this.listeners) {
      cb(newState);
    }

    localStorage.setItem("saved-state", JSON.stringify(newState));
  },
  suscribe(callback: (any) => any) {
    this.listeners.push(callback);
  },
};

export { state };
