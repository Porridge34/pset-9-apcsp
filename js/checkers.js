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
    (squares[index].classList.contains("available-move"))?
      squares[index].classList.toggle('available-move'): squares[index];
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
  let index = squares.findIndex(function(square) {
    return square === e.target;
  });
  checkValidMove(index);
  if (board[index] === "" && index !== selectedPiece &&
  squares[index].classList.contains("available-move")) {
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
function checkValidMove(index){
  if (turn === "Black" && selectedPiece !== "" && board[index] == ""){
    (selectedPiece%8!==0 && board[selectedPiece+7]==="")?
      squares[selectedPiece+7].classList.toggle('available-move') : selectedPiece;
    (selectedPiece%8!==7 && board[selectedPiece+9]==="")?
      squares[selectedPiece+9].classList.toggle('available-move') : selectedPiece;
    (selectedPiece%8!==6 && board[selectedPiece + 18] == "" && board[selectedPiece+7] == "W")?
      squares[selectedPiece+18].classList.toggle('available-move') : selectedPiece;
    (selectedPiece%8!==1 && board[selectedPiece + 14] == "" && board[selectedPiece+9] == "W")?
      squares[selectedPiece+14].classList.toggle('available-move') : selectedPiece;
  }
  if (turn === "White" && selectedPiece !== "" && board[index] == ""){
    (selectedPiece%8!==7 && board[selectedPiece-7] == "")?
      squares[selectedPiece-7].classList.toggle('available-move') : selectedPiece;
    (selectedPiece%8!==0 && board[selectedPiece-9] == "")?
      squares[selectedPiece-9].classList.toggle('available-move') : selectedPiece;
    (selectedPiece%8!==6 && board[selectedPiece-18] == "" && board[selectedPiece-9] == "B")?
      squares[selectedPiece-18].classList.toggle('available-move') : selectedPiece;
    (selectedPiece%8!==1 && board[selectedPiece-14] == "" && board[selectedPiece-7] == "B")?
      squares[selectedPiece-14].classList.toggle('available-move') : selectedPiece;
  }
}
