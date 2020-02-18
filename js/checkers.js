///////////////////// CONSTANTS /////////////////////////////////////
//checkers
const squares = Array.from(document.querySelectorAll("#board div"));
const message = document.querySelector("h2");
///////////////////// APP STATE (VARIABLES) /////////////////////////
//checkers
let board;
let turn;
let win;
let aIXorO;
///////////////////// CACHED ELEMENT REFERENCES /////////////////////

///////////////////// EVENT LISTENERS ///////////////////////////////
//checkers
window.onload = init;
document.getElementById("board").onclick = takeTurn;
document.getElementById("reset-button").onclick = init;
squares.forEach(function(mark){
  mark.addEventListener('click', function(ev) {
  ev.target.classList.toggle('selected-piece');
  }, false)
});
///////////////////// FUNCTIONS /////////////////////////////////////
//checkers
function getWinner() {
  let winner = null;
  let countBlack = 0;
  let countWhite = 0;
  board.forEach(function(mark){
    (mark === "B")? countBlack++: countBlack;
    (mark === "W")? countWhite++: countWhite;
  });
  (countBlack === 0)? winner = "White": winner = null;
  (countWhite === 0)? winner = "Black": winner = null;
  return winner;
}
function init() {
  board = [
    "", "B", "", "B", "", "B", "", "B",
    "B", "", "B", "", "B", "", "B", "",
    "", "B", "", "B", "", "B", "", "B",
    "", "", "", "", "", "", "", "",
    "", "", "", "", "", "", "", "",
    "W", "", "W", "", "W", "", "W", "",
    "", "W", "", "W", "", "W", "", "W",
    "W", "", "W", "", "W", "", "W", ""
  ];
  turn = "Black";
  win = null;
  render();
}
function render() {
  board.forEach(function(mark, index) {
    squares[index].textContent = mark;
  });
  message.textContent =
    (win === "Black" || win === "White")? `${win} wins!` : `Turn: ${turn}`;
}
function takeTurn(e) {
  if (!win) {
    let selectedPiece = squares.findIndex(function(square){
      return square === e.target;
    })
    let index = squares.findIndex(function(square) {
      return square === e.target;
    });
    if (board[index] === "") {
      (turn === "Black")? board[index] = "B": board[index] = "W";
      turn = turn === "Black" ? "White" : "Black";
      win = getWinner();
      render();
    }
  }
}
