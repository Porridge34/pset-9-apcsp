///////////////////// CONSTANTS /////////////////////////////////////
//checkers
const squares = Array.from(document.querySelectorAll("#board div"));
const message = document.querySelector("h2");
///////////////////// APP STATE (VARIABLES) /////////////////////////
//checkers
let board;
let turn;
let win;
let pieceSelected = false;
let selectedPiece;
///////////////////// CACHED ELEMENT REFERENCES /////////////////////

///////////////////// EVENT LISTENERS ///////////////////////////////
//checkers
window.onload = init;
turnOrSelect();
document.getElementById("reset-button").onclick = init;

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
function selectPiece(e) {
  if (!win) {
    selectedPiece = "";
    console.log("selectPiece is running");
    selectedPiece = squares.findIndex(function(square){
      return square === e.target;
    });
    if(board[selectedPiece] === turn.charAt(0)){
      pieceSelected = true;
      console.log("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF")
      squares[selectedPiece].classList.toggle('selected-piece');
    }
    turnOrSelect();
  }
}
function takeTurn(e){
  console.log("why not work");
  let index = squares.findIndex(function(square) {
    return square === e.target;
  });
  if (board[index] === "" && index !== selectedPiece && checkValidMove) {
    console.log("this piece of crap still doesnt work");
    (turn === "Black")? board[index] = "B": board[index] = "W";
    board[selectedPiece] = "";
    squares[selectedPiece].classList.toggle('selected-piece');
    turn = turn === "Black" ? "White" : "Black";
    win = getWinner();
    render();
    pieceSelected = false;
  }else if(index === selectedPiece){
    squares[selectedPiece].classList.toggle('selected-piece');
    pieceSelected = false;
  }
  turnOrSelect();
}
function turnOrSelect(){
  if (pieceSelected === true){
    document.getElementById("board").removeEventListener("click", selectPiece);
    document.getElementById("board").addEventListener("click", takeTurn);
    console.log("piece is selected");
  }else{
    document.getElementById("board").removeEventListener("click", takeTurn);
    document.getElementById("board").addEventListener("click", selectPiece);
    console.log("piece not selected");
  }
}
function checkValidMove(){
  if (turn === "Black" && selectedPiece !== ""){
    board.forEach(function(mark, index){
      if (mark === ""){
        if (index > selectedPiece){
          if (selectedPiece%8 !== 0 && index = selectedPiece - 1){ // is not workingi reeeeeeeeeeeeeeeeeeeeeeeeeeeee
            squares[index].classList.toggle('available-move');
          }
          if (selectedPiece%8 !== 7 && index = selectedPiece + 1){
            squares[index].classList.toggle('available-move');
          }
        }
      }
    });
  }
}
