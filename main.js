function createPlayer(marker) {
  const player = {};

  player.marker = marker;

  return player;
}

// Manages the game board state
const gameboard = (function () {
  // Private memebers
  const gameGridElement = document.querySelector(".game-grid");
  const gameboardState = ["", "x", "o", "", "x", "", "", "o", ""];

  function resetGameboard() {
    gameGridElement.innerHTML = "";
  }

  // Public members
  return {
    renderGameboard: function () {
      resetGameboard();
      gameboardState.forEach((item) => {
        const gameItemElement = `<button>${item}</button>`;
        gameGridElement.innerHTML += gameItemElement;
      });
    },

    isMoveValid: function(index) {
        return gameboardState[index] === '';
    },

    placeMarker: function (marker, index) {
      // check if index not already occupied
      gameboardState[index] = marker;
    },

    checkGameOver: function () {
      return null;
    },

    getState: function () {
      return gameboardState;
    },
  };
})();

//
const gameManager = (function () {
  let gameOver = false;
  let turn = "x";

  return {
    getTurn: function () {
      const curTurn = turn;
      turn = turn === "x" ? "o" : "x";
      return curTurn;
    },

    makeMove: function (move) {

    },

    isGameOver: function () {
      return gameOver;
    },
  };
})(); // add parentheiss to invoke it on creation

// Allows player interaction with the game
const main = (function () {
  // get all game grid buttons
  const gridCells = document.querySelectorAll('.game-grid button');

  gridCells.forEach((cell, index) => {
    cell.addEventListener('click', () => console.log(index))
  })

  return {
    playTurn: function () {
      // Get player input
      const playerInput = prompt("Enter your move: ");

      // palce mareker on the board
      gameboard.placeMarker(gameManager.getTurn(), playerInput);

      // render the board
      gameboard.renderGameboard();
    },
  };
})();

// main.playTurn();
