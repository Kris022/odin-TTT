function createPlayer(marker) {
  const player = {};

  player.marker = marker;

  return player;
}

// Module to manage game board state
const gameboard = (function () {
  // Private members

  const gameButtons = document.querySelectorAll(".game-grid button"); // change to gameboardSquares?
  const gameboardState = ["", "x", "o", "", "x", "", "", "o", ""];
  const winCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // Public Members
  function resetGameboard() {
    gameButtons.forEach((button) => {
      button.innerHTML = "";
    });
  }

  function renderGameboard() {
    gameButtons.forEach((button, index) => {
      button.innerHTML = gameboardState[index];
    });
  }

  function placeMarker(marker, index) {
    gameboardState[index] = marker;
  }

  function checkWinner() {
    for (let i = 0; i < winCombinations.length; i++) {
      const [a, b, c] = winCombinations[i];

      if (
        gameboardState[a] !== "" &&
        gameboardState[a] === gameboardState[b] &&
        gameboardState[a] === gameboardState[c]
      ) {
        return gameboardState[a];
      }
    }

    return null;
  }

  return {
    gameButtons,
    placeMarker,
    renderGameboard,
  };
})();

const game = (function () {
  // Private members
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

    // Update and Render Score
  }

  // Public Members
  return {
    init: function () {
      gameboard.renderGameboard();

      gameboard.gameButtons.forEach((button, index) => {
        button.addEventListener("click", () => playTurn(index));
      });
    },
  };
})();

game.init();
