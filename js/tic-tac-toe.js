///////////////////// CONSTANTS /////////////////////////////////////
//tic tac toe
const squares = Array.from(document.querySelectorAll("#board div"));
const message = document.querySelector("h2");
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
///////////////////// APP STATE (VARIABLES) /////////////////////////
//tic tac toe
let board;
let turn;
let win;
let aIXorO;
///////////////////// CACHED ELEMENT REFERENCES /////////////////////

///////////////////// EVENT LISTENERS ///////////////////////////////
//tic tac toe
window.onload = init;
document.getElementById("board").onclick = takeTurn;
document.getElementById("reset-button").onclick = init;
document.getElementById("ai-button").onclick = stupidAI;
///////////////////// FUNCTIONS /////////////////////////////////////
//tic tac toe
function getWinner() {
  let winner = null;
  winningConditions.forEach(function(condition, index) {
    if (
      board[condition[0]] &&
      board[condition[0]] === board[condition[1]] &&
      board[condition[1]] === board[condition[2]]
    ) {
      winner = board[condition[0]];
    }
  });
  return winner ? winner : board.includes("") ? null : "T";
}
function init() {
  board = [
    "", "", "",
    "", "", "",
    "", "", ""
  ];
  turn = "X";
  win = null;
  stupidAIIsTrue = false;
  render();
}
function render() {
  board.forEach(function(mark, index) {
    squares[index].textContent = mark;
  });
  message.textContent =
    win === "T" ? "It's a tie!" : win ? `${win} wins!` : `Turn: ${turn}`;
}
function takeTurn(e) {
  if (!win && !stupidAIIsTrue) {
    let index = squares.findIndex(function(square) {
      return square === e.target;
    });
    if (board[index] === "") {
      board[index] = turn;
      turn = turn === "X" ? "O" : "X";
      win = getWinner();
      render();
    }
  }else if(!win && stupidAIIsTrue){
    let index = squares.findIndex(function(square) {
      return square === e.target;
    });
    if (board[index] === "" && turn !== aIXorO) {
      board[index] = turn;
      turn = turn === "X" ? "O" : "X";
      win = getWinner();
      render();
      stupidAI();
    }
  }
}
function stupidAI(){
  stupidAIIsTrue = true;
  if (!win) {
    let index = getBestMove();
    board[index] = turn;
    aIXorO = turn;
    turn = turn === "X" ? "O" : "X";
    win = getWinner();
    render();
  }
}
function getBestMove(){
  let index2 = getRandomIndex(board.length);
  while(board[index2] !== ""){
    index2 = getRandomIndex(board.length);
  }
  winningConditions.forEach(function(condition, index) {
    if (board[condition[0]] && board[condition[0]] === board[condition[1]]
    && !board[condition[2]]){
      index2 = condition[2];
    }else if(board[condition[1]] && board[condition[1]] === board[condition[2]]
    && !board[condition[0]]){
      index2 = condition[0];
    }else if(board[condition[0]] && board[condition[0]] === board[condition[2]]
    && !board[condition[1]]){
      index2 = condition[1];
    }
  });
  return index2;
}
function getRandomIndex(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
