function createPlayer(marker) {
  const player = {};

  player.marker = marker;

  return player;
}

// Module to manage game board state
const gameboard = (function () {
  // Private members
  let gameboardState = ["", "x", "o", "", "x", "", "", "o", ""];
  const gameButtons = document.querySelectorAll(".game-grid button"); // change to gameboardSquares?
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
    gameboardState = new Array(9).fill("");
  }

  function renderGameboard() {
    gameButtons.forEach((button, index) => {
      button.innerHTML = gameboardState[index];
    });
  }

  function isValidMove(index) {
    return gameboardState[index] === "";
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

  function checkTie() {
    // check if all game square occupied
    // if so return tie
  }

  return {
    gameButtons,
    placeMarker,
    renderGameboard,
    checkWinner,
    isValidMove,
    resetGameboard,
  };
})();

const game = (function () {
  // Private members
  const playerOne = createPlayer("x");
  const playerTwo = createPlayer("o");

  let currentPlayer = playerOne;

  function playTurn(btnIndex) {
    if (gameboard.isValidMove(btnIndex)) {
      // Get current player
      currentPlayer =
        currentPlayer.marker === playerOne.marker ? playerTwo : playerOne;

      // Place marker
      gameboard.placeMarker(currentPlayer.marker, btnIndex);

      // Render gameboard
      gameboard.renderGameboard();

      // Check win
      console.log(gameboard.checkWinner());
      // Update and Render Score
    }
  }

  // Public Members
  return {
    init: function () {
      gameboard.resetGameboard();
      gameboard.renderGameboard();

      gameboard.gameButtons.forEach((button, index) => {
        button.addEventListener("click", () => playTurn(index));
      });
    },
  };
})();

// Modal handler
const modalController = (function () {
  const modal = document.querySelector(".modal");
  const button = document.querySelector(".modal-content button");
  
  button.addEventListener('click', () => closeModal());

  function closeModal() {
    modal.style.display = "none";
  }

  return {
    openModal: function () {
      modal.style.display = "block";
    },
  };
})();

game.init();
