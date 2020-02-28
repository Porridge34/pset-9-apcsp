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
c.addEventListener('click', (e) => {
  const pos = {
    x: e.clientX,
    y: e.clientY
  };
  console.log(pos);
});
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
    let fillColour;
    (mark === "R")? fillColour = "red": (mark === "B")? fillColour = "black": fillColour = "white";
    ctx.beginPath();
    ctx.arc(70*(index%7)+70, (70*Math.floor(index/7))+70, 30, 0, 2 * Math.PI);
    ctx.fillStyle = fillColour;
    ctx.fill();
    ctx.closePath();
    ctx.stroke();
  });
  message.textContent =
    win === "T" ? "It's a tie!" : win ? `${win} wins!` : `Turn: ${turn}`;
}
/*
function takeTurn(e) {
  if (board[index] === "") {
    board[index] = turn.charAt(0);
    turn = turn === "Red" ? "Black" : "Red";
    win = getWinner();
    render();
  }
}
*/
function isIntersect(point, circle) {
  return Math.sqrt((point.x-circle.x) ** 2 + (point.y - circle.y) ** 2) < circle.radius;
}
