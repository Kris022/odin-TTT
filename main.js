const gameBoard = (function() {
    // 0=' ', 1='x', 2='o'
    const gameBoard = ['', 'x', 'o', '', 'x', '', '', 'o', ''];
    return { gameBoard };
}) 

const renderGameboard = () => {
    const gameGridElement = document.querySelector('.game-grid');
    gameGridElement.innerHTML = '';
    gameBoard().gameBoard.forEach((item) => {
        const gameItemElement = `<button>${item}</button>`;
        gameGridElement.innerHTML += gameItemElement;
    })
}

renderGameboard();