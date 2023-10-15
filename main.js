const gameboard = (function () {
  // 0=' ', 1='x', 2='o'
  // change name gameBoard to state?

  // Private memebers
  const gameboardElement = document.querySelector(".game-grid");
  const gameboardState = ["", "x", "o", "", "x", "", "", "o", ""];

  function resetGameboard() {
    gameboardElement.innerHTML = "";
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
  };
})();

// get each of the buttons querySelectorAll
//

gameboard.renderGameboard();

const gameState = (function () {
  let turn = "x";

  return {
    getTurn: function () {
      const curTurn = turn;
      turn = turn === "x" ? "o" : "x";
      return curTurn;
    },
  };
})(); // add parentheiss to invoke it on creation

console.log(gameState.getTurn());
