///////////////////// CONSTANTS /////////////////////////////////////
const message = document.querySelector("h2");
///////////////////// APP STATE (VARIABLES) /////////////////////////
let board;
let turn;
let win;
let c = document.getElementById("myCanvas");
let ctx = c.getContext("2d");
///////////////////// CACHED ELEMENT REFERENCES /////////////////////

///////////////////// EVENT LISTENERS ///////////////////////////////
window.onload = init;
document.getElementById("board").onclick = takeTurn;
document.getElementById("reset-button").onclick = init;
///////////////////// FUNCTIONS /////////////////////////////////////
function getWinner() {
  let winner = null;
  board.forEach(function(mark, index) {
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
    "", "", "", "", "", "", "",
    "", "", "", "", "", "", "",
    "", "", "", "", "", "", "",
    "", "", "", "", "", "", "",
    "", "", "", "", "", "", "",
    "", "", "", "", "", "", "",
  ];
  turn = "Red";
  win = null;
  stupidAIIsTrue = false;
  render();
}
function render() {
  board.forEach(function(mark, index) {
    switch (mark) {
      case "":
        ctx.beginPath();
        ctx.arc(20*index%7, 20*((index/6)-index%6), 15, 0, 2 * Math.PI);
        ctx.stroke();
    }
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
