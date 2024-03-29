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
let turnCount = 0;
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
  (countBlack === 0)? winner = "White": winner;
  (countWhite === 0)? winner = "Black": winner;
  (countBlack === 1 && countWhite === 1)? turnCount++ : turnCount;
  (turnCount>=20)? winner = "tie" : winner;
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
    squares[index].classList.remove('remove-9', 'remove-7', 'remove+9',
    'remove+7', 'available-move', 'available-jump');
    (!squares[index].classList.contains('king') && mark == "B" && index > 55)?
      squares[index].classList.add('king') : index;
    (!squares[index].classList.contains('king') && mark == "W" && index < 8)?
      squares[index].classList.add('king') : index;
  });
  message.textContent =
    win === "tie" ? "It's a tie!" : win ? `${win} wins!` : `Turn: ${turn}`;
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
  (turn === "Black")? checkValidMoveB(index) : checkValidMoveW(index);
  if (board[index] === "" && index !== selectedPiece &&
  squares[index].classList.contains("available-move")) {
    (turn === "Black")? board[index] = "B": board[index] = "W";
    if (squares[selectedPiece].classList.contains('king')){
      squares[index].classList.add('king');
      squares[selectedPiece].classList.remove('king');
    }
    board[selectedPiece] = "";
    squares[selectedPiece].classList.toggle('selected-piece');
    turn = turn === "Black" ? "White" : "Black";
    win = getWinner();
    pieceSelected = false;
    render();
  }else if(index === selectedPiece){
    squares[selectedPiece].classList.toggle('selected-piece');
    pieceSelected = false;
    render();
  }else if (board[index] === "" && index !== selectedPiece &&
  squares[index].classList.contains("available-jump")){
    if (squares[selectedPiece].classList.contains('king')){
      squares[index].classList.add('king');
      squares[selectedPiece].classList.remove('king');
    }
    (turn === "Black")? board[index] = "B": board[index] = "W";
    board[selectedPiece] = "";
    squares[selectedPiece].classList.toggle('selected-piece');
    turn = turn === "Black" ? "White" : "Black";
    if(squares[index].classList.contains("remove-9")){
      board[selectedPiece-9] = "";
    }else if(squares[index].classList.contains("remove+9")){
      board[selectedPiece+9] = "";
    }else if(squares[index].classList.contains("remove-7")){
      board[selectedPiece-7] = "";
    }else if(squares[index].classList.contains("remove+7")){
      board[selectedPiece+7] = "";
    }
    win = getWinner();
    pieceSelected = false;
    render();
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
function checkValidMoveB(index){
  if (selectedPiece !== "" && board[index] == ""){
    console.log("checking black moves");
    (selectedPiece%8!==0 && board[selectedPiece+7]==="")?
      squares[selectedPiece+7].classList.add('available-move') : selectedPiece;
    (selectedPiece%8!==7 && board[selectedPiece+9]==="")?
      squares[selectedPiece+9].classList.add('available-move') : selectedPiece;
    (selectedPiece%8!==0 && selectedPiece%8 !== 1 && board[selectedPiece + 14] === "" && board[selectedPiece+7] === "W")?
      squares[selectedPiece+14].classList.add('available-jump', 'remove+7') : selectedPiece;
    (selectedPiece%8!==7 && selectedPiece%8 !== 6 && board[selectedPiece + 18] === "" && board[selectedPiece+9] === "W")?
      squares[selectedPiece+18].classList.add('available-jump', 'remove+9') : selectedPiece;
    if (squares[selectedPiece].classList.contains('king')){
      (selectedPiece%8!==7 && board[selectedPiece-7] === "")?
        squares[selectedPiece-7].classList.add('available-move') : selectedPiece;
      (selectedPiece%8!==0 && board[selectedPiece-9] === "")?
        squares[selectedPiece-9].classList.add('available-move') : selectedPiece;
      (selectedPiece%8!==1 && selectedPiece%8 !== 0 && board[selectedPiece-18] === "" && board[selectedPiece-9] === "W")?
        squares[selectedPiece-18].classList.add('available-jump', 'remove-9') : selectedPiece;
      (selectedPiece%8!==6 && selectedPiece%8 !== 7 && board[selectedPiece-14] === "" && board[selectedPiece-7] === "W")?
        squares[selectedPiece-14].classList.add('available-jump', 'remove-7') : selectedPiece;
    }
  }
}
function checkValidMoveW(index){
  if (selectedPiece !== "" && board[index] === ""){
    console.log("checking white moves");
    (selectedPiece%8!==7 && board[selectedPiece-7] === "")?
      squares[selectedPiece-7].classList.add('available-move') : selectedPiece;
    (selectedPiece%8!==0 && board[selectedPiece-9] === "")?
      squares[selectedPiece-9].classList.add('available-move') : selectedPiece;
    (selectedPiece%8!==1 && selectedPiece%8 !== 0 && board[selectedPiece-18] === "" && board[selectedPiece-9] === "B")?
      squares[selectedPiece-18].classList.add('available-jump', 'remove-9') : selectedPiece;
    (selectedPiece%8!==6 && selectedPiece%8 !== 7 && board[selectedPiece-14] === "" && board[selectedPiece-7] === "B")?
      squares[selectedPiece-14].classList.add('available-jump', 'remove-7') : selectedPiece;
    if (squares[selectedPiece].classList.contains('king')){
      (selectedPiece%8!==0 && board[selectedPiece+7]==="")?
        squares[selectedPiece+7].classList.add('available-move') : selectedPiece;
      (selectedPiece%8!==7 && board[selectedPiece+9]==="")?
        squares[selectedPiece+9].classList.add('available-move') : selectedPiece;
        (selectedPiece%8!==1 && selectedPiece%8 !== 0 && board[selectedPiece + 14] === "" && board[selectedPiece+7] === "B")?
          squares[selectedPiece+14].classList.add('available-jump', 'remove+7') : selectedPiece;
        (selectedPiece%8!==6 && selectedPiece%8 !== 7 && board[selectedPiece + 18] === "" && board[selectedPiece+9] === "B")?
          squares[selectedPiece+18].classList.add('available-jump', 'remove+9') : selectedPiece;
    }
  }
}
