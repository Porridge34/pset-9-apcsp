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
  const pos = getCursorPosition(c, e);
  console.log(pos.x +" is the x" + pos.y + " is the y");
  board.forEach(function(circle, index){
    console.log(isIntersect(pos, circle))
    if (isIntersect(pos, circle)){
      takeTurn(index);
      console.log(index + " is the index");
    }
  });
});
document.getElementById("reset-button").onclick = init;
///////////////////// FUNCTIONS /////////////////////////////////////
function init() {
  board = [];
  for (let i = 0; i < 42; i++){
    let circle = {
      colour: "none",
      x: 70*(i%7)+70,
      y: 70*Math.floor(i/7)+70
    }
    board.push(circle);
  }
  turn = "Red";
  win = null;
  render();
}

function getWinner() {
  let winner = null;
  let pieceCount = 0;
  board.forEach(function(mark, index) {
    if(mark.colour !== "none"){
      pieceCount++;
      if(index < 39 && mark.colour === board[index+1].colour && index%7<4){
        (mark.colour === board[index+2].colour && mark.colour === board[index+3].colour)?
        winner = mark.colour : c;
      }else if(index < 18 && mark.colour === board[index+8].colour && index%7<4){
        (mark.colour === board[index+16].colour && mark.colour === board[index+24].colour)?
        winner = mark.colour : c;
      }else if(index < 18 && mark.colour === board[index+6].colour && index%7>3){
        (mark.colour === board[index+12].colour && mark.colour === board[index+18].colour)?
        winner = mark.colour : c;
      }else if(index < 21 && mark.colour === board[index+7].colour && index%7>3){
        (mark.colour === board[index+14].colour && mark.colour === board[index+21].colour)?
        winner = mark.colour : c;
      }
    }
  });
  pieceCount === 42? winner = "T": winner;
  return winner;
}

function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect()
    const xCoord = event.clientX - rect.left
    const yCoord = event.clientY - rect.top
    return {x: xCoord, y: yCoord};
}
//d
function render() {
  board.forEach(function(mark, index) {
    let fillColour;
    (mark.colour === "Red")? fillColour = "red": (mark.colour === "Yellow")? fillColour = "yellow": fillColour = "white";
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
  if (validMove(index) && !win) {
    board[index].colour = turn;
    turn = turn === "Red" ? "Yellow" : "Red";
    win = getWinner();
    render();
  }
}

function isIntersect(point, circle) {
  /*
  console.log(point.x + " point x & " + circle.x + "circle x");
  console.log(point.y + " point y & " + circle.y + "circle y");
  */
  if (point.x >= circle.x - 30 && point.x <= circle.x + 30 &&
  point.y >= circle.y - 30 && point.y <= circle.y + 30){
    return true;
  }else{
    return false;
  }
}

function validMove(index){
  if (board[index].colour === "none"){
    if (index > 34){
      return true;
    }else if (board[index+7].colour !== "none"){
      return true;
    }else{
      return false;
    }
  }else {
    return false;
  }
}
