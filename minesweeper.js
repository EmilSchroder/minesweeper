document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!

//Generate Board

  //var opt = sel.options[sel.selectedIndex];

  var gridHeight = "med";


  var board = {
  cells:[]
  }
  /*var board = {
    cells: [
      {row:0,col:0,isMine:false,hidden:true},
      {row:0,col:1,isMine:false,hidden:true},
      {row:0,col:2,isMine:true,hidden:true},
      {row:1,col:0,isMine:false,hidden:true},
      {row:1,col:1,isMine:false,hidden:true},
      {row:1,col:2,isMine:true,hidden:true},
      {row:2,col:0,isMine:false,hidden:true},
      {row:2,col:1,isMine:true,hidden:true},
      {row:2,col:2,isMine:false,hidden:true}
    ]
  };*/


function startGame () {
  
  
  gridHeight = getSelectValue();
  console.log(gridHeight);

  switch(gridHeight){
  case 'easy':
    gridHeight = 3;
    break;
  case 'med':
    gridHeight = 4;
    break;
  case 'hard':
    gridHeight = 5;
    break;
  case 'mega':
    gridHeight = 6;
}

console.log("gridheight = " + gridHeight);


  board = createBoard(gridHeight);
  console.log("baord: " + board);

  for (var i=0; i<board.cells.length;i++){

    var number = countSurroundingMines(board.cells[i]);
    board.cells[i].surroundingMines = number;

  }
  // Don't remove this function call: it makes the game work!
  lib.initBoard()

  //Win conditions
  document.addEventListener("click", checkForWin);
  document.addEventListener("contextmenu", checkForWin);
}

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin () {

    var cellNum = gridHeight*gridHeight;

  for (var k=0; k<board.cells.length;k++){


    var t = board.cells[k];


     if (t.isMine==true && t.isMarked==true){
      cellNum--;
      if (cellNum==0){
      lib.displayMessage('You win!');
      }
    } else if (t.isMine==false && t.hidden==false){
      cellNum--;
      if (cellNum==0){
        var audio = document.getElementsByClassName('winner')[0];
        audio.play();
        lib.displayMessage('You win!');
      }
    }

  }
   //lib.displayMessage('You win!')
  //}

  // You can use this function call to declare a winner (once you've
  // detected that they've won, that is!)
  //   
}

// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`: 
//
//   var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//
// It will return cell objects in an array. You should loop through 
// them, counting the number of times `cell.isMine` is true.
function countSurroundingMines (cell) {
  var count = 0;
  var surrounding = lib.getSurroundingCells(cell.row, cell.col);
  //console.log(surrounding);

  for (var j =0; j<surrounding.length; j++){
    if (surrounding[j].isMine==true){
      count++
    }
  }
  //console.log("bomb count" + count);
return count;
}

//retrieves the selected value from the dropdown
function getSelectValue(){

  var selectValue = document.getElementById("list").value;
  //console.log(selectValue);
  return selectValue;

}

///Creating the board

function createBoard(gridHeight){

  console.log("this is the grid height!!! " + gridHeight)

for (var i=0; i<gridHeight*gridHeight; i++){
  board.cells[i] = {};        
  board.cells[i].row = Math.floor(i/gridHeight);
  board.cells[i].col = i%gridHeight;
  board.cells[i].isMine = Math.floor((Math.random()*1.5)<1 ? false:true);
  board.cells[i].hidden = true;

}

console.log(board);
console.log(board.cells.length);

return board;


}

function restart() {
  document.getElementsByClassName("board")[0].innerHTML = "";
  board = { cells: [] };
  startGame();
}


