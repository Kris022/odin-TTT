function createPlayer(marker) {
  const player = {};

  player.marker = marker;

  return player;
}

// Manages the game board state
const gameboard = (function () {
  // Private memebers
  const gameGridElement = document.querySelector(".game-grid");
  const gameButtons = document.querySelector('.game-grid');
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

    isMoveValid: function (index) {
      return gameboardState[index] === "";
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

    makeMove: function (move) {},

    isGameOver: function () {
      return gameOver;
    },
  };
})(); // add parentheiss to invoke it on creation

const displayManager = (function () {
  return {
    getCells: function () {
      return document.querySelectorAll(".game-grid button");
    },
  };
})();

// Allows player interaction with the game
const main = (function () {
  // get all game grid buttons
  let gridCells = document.querySelectorAll(".game-grid button");

  function playTurn(cell) {
    // palce mareker on the board
    gameboard.placeMarker(gameManager.getTurn(), cell);

    // render the board
    console.log(gameboard.getState());
    gameboard.renderGameboard();
  }

  gridCells.forEach((cell, index) => {
    cell.addEventListener("click", () => playTurn(index));
  });

  return {};
})();

// main.playTurn();

// get dont remove all grid items on rerender in order to keep their event listeners
// instead remove innertext of each button

