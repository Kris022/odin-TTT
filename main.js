function createPlayer(marker) {
  const player = {};

  player.marker = marker;

  return player;
}

// Module to manage game board state
const gameboard = (function () {
  // Priv members

  // game buttons
  const gameButtons = document.querySelectorAll(".game-grid button");
  const gameboardState = ["", "x", "o", "", "x", "", "", "o", ""];

  function resetGameboard() {
    gameButtons.forEach((button) => {
      button.innerHTML = "";
    });
  }

  function renderGameboard() {
    // gameButtons.forEach((button, index) => {
    //   button.innerHTML = gameboardState[index];
    // })

    for (let i = 0; i < gameButtons.length; i++) {
      gameButtons[i].innerHTML = gameboardState[i];
    }
  }

  function placeMarker(marker, index) {
    gameboardState[index] = marker;
  }

  return {
    gameButtons,
    placeMarker,
    renderGameboard,
  };
})();

const game = (function () {
  const playerOne = createPlayer("x");
  const playerTwo = createPlayer("o");

  let currentPlayer = playerOne;

  function playTurn(btnIndex) {

    // Get current player
    currentPlayer =
      currentPlayer.marker === playerOne.marker ? playerTwo : playerOne;

    // Place marker
    gameboard.placeMarker(currentPlayer.marker, btnIndex);

    // Render gameboard
    gameboard.renderGameboard();
    
    // Check win

    // Score
  }

  function init() {
    gameboard.gameButtons.forEach((button, index) => {
      button.addEventListener("click", () => playTurn(index));
    });
  }

  return {
    init,
  };
})();

game.init();
