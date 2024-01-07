
const playerStatus = document.querySelector('.gameStatus'); //displays whose turn it is
let gameActive = true; 
let currentPlayer = "X";
let playedSquares = ["", "", "", "", "", "", "", "", ""]; //to help keep track of which square have been played
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;
playerStatus.innerHTML = currentPlayerTurn(); //changes text for players turns
document.querySelectorAll('.square').forEach(square => square.addEventListener('click', squareClicked));
document.querySelector('.gameRestart').addEventListener('click', restartGame);

//puts either 'x' or 'o' in a square when clicked, records the index of the square
function squarePlayed(clickedSquare, clickedSquareIndex) {
  playedSquares[clickedSquareIndex] = currentPlayer;
  clickedSquare.innerHTML = currentPlayer;
}

//switches players each round
function switchPlayerTurn() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  playerStatus.innerHTML = currentPlayerTurn();
}

//which squares need to be filled to win, kept as arrays
const winningCombos = [
  [0, 1, 2], 
  [3, 4, 5], 
  [6, 7, 8], 
  [0, 3, 6], 
  [1, 4, 7], 
  [2, 5, 8], 
  [0, 4, 8],
  [2, 4, 6]
];

//checks to see if a player wins, there's a draw, or if the game can keep going
function checkForWin() {
  let roundWon = false; 
  for (let i = 0; i <= 7; i++) {
    const winCondition = winningCombos[i];
    let a = playedSquares[winCondition[0]];
    let b = playedSquares[winCondition[1]];
    let c = playedSquares[winCondition[2]];
    if (a === '' || b === '' || c === '') {
      continue;
    } 
    if (a === b && b === c) {
      roundWon = true; 
      break
    }
  }
  
  if (roundWon) {
    alert(`Player ${currentPlayer} has won!`);
    gameActive = false;
    return;
  }
  let roundDraw = !playedSquares.includes("");
  if (roundDraw) {
    alert('Draw!');
    gameActive = false; 
    return;
  }
  switchPlayerTurn(); //if the game has not been won yet or there is no draw
}

//what happens when a square is clicked, check to make sure it's available 
function squareClicked (clickedSquareEvent) {
  const clickedSquare = clickedSquareEvent.target;
  const clickedSquareIndex = parseInt(
    clickedSquare.getAttribute('data-square-index')
  );
  if (playedSquares[clickedSquareIndex] !== "" || !gameActive) {
    return;
  }
  squarePlayed(clickedSquare, clickedSquareIndex);
  checkForWin();
}

//what happens when the reset button is activated
function restartGame() {
  gameActive = true;
  currentPlayer = 'X';
  playedSquares = ["", "", "", "", "", "", "", "", ""];
  playerStatus.innerHTML = currentPlayerTurn();
  document.querySelectorAll('.square').forEach(square => square.innerHTML = "");
}