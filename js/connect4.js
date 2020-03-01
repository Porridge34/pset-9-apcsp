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
c.addEventListener('click', (e) => { //use math to determine which circle was clicked
  const pos = {
    x: e.clientX,
    y: e.clientY
  };
  console.log(pos.x +" is the x" + pos.y + " is the y");
  board.forEach(function(circle, index){
    if (isIntersect(pos, circle)){
      takeTurn(index);
      console.log(index + " is the index");
    }
  });
});
document.getElementById("reset-button").onclick = init;
///////////////////// FUNCTIONS /////////////////////////////////////
function getWinner() {
  let winner = null;
  board.forEach(function(mark, index) {

  });
  return winner ? winner : board.includes("") ? null : "T";
}
function init() {
  board = [];
  for (let i = 0; i < 42; i++){
    let circle = {
      colour: "",
      x: 70*(i%7)+70,
      y: 70*Math.floor(i/7)+70
    }
    board.push(circle);
  }
  turn = "Red";
  win = null;
  render();
}
function render() {
  board.forEach(function(mark, index) {
    let fillColour;
    (mark.colour === "R")? fillColour = "red": (mark.colour === "B")? fillColour = "black": fillColour = "white";
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

function takeTurn(index) {
  if (board[index].colour === "") {
    board[index].colour = turn.charAt(0);
    turn = turn === "Red" ? "Black" : "Red";
    win = getWinner();
    render();
  }
}

function isIntersect(point, circle) {
  return Math.sqrt((point.x-circle.x) ** 2 + (point.y - circle.y) ** 2) < 30;
}
