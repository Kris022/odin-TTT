function createPlayer(marker) {
  const player = {};

  player.marker = marker;
  player.score = 0;

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
    // if so it's a tie return true
    return !gameboardState.includes("");
  }

  return {
    gameButtons,
    placeMarker,
    renderGameboard,
    checkWinner,
    isValidMove,
    resetGameboard,
    checkTie,
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
      if (gameboard.checkWinner()) {
        const heading = "🎉 Congratulations! 🥳";
        const subheading = `Player ${currentPlayer.marker} You Win!`;
        modalController.displayGameOver(heading, subheading);
      }

      if (gameboard.checkTie()) {
        const heading = "😔 It's a tie... 👔";
        const subheading = `Well done both of you! 😄`;
        modalController.displayGameOver(heading, subheading);
      }
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

    resetGame: function () {
      gameboard.resetGameboard();
      gameboard.renderGameboard();
    },
  };
})();

// Modal handler
const modalController = (function () {
  const modal = document.querySelector(".modal");
  const modalHeading = document.querySelector(".modal-content h1");
  const modalMessage = document.querySelector(".modal-content h2");

  const button = document.querySelector(".modal-content button");

  button.addEventListener("click", () => handleClick());

  function displayGameOver(title, message) {
    modalHeading.innerHTML = title;
    modalMessage.innerHTML = message;
    openModal();
  }

  function openModal() {
    modal.style.display = "block";
  }

  function closeModal() {
    modal.style.display = "none";
  }

  function handleClick() {
    game.resetGame();
    closeModal();
  }

  return {
    displayGameOver,
  };
})();

game.init();
