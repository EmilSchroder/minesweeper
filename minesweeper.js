document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!
  var board = {
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
  };


function startGame () {
  for (var i=0; i<board.cells.length;i++){
    //console.log(board.cells[i].row + " and " + board.cells[i].col);
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

    var cellNum = 9;

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
  var count =0;
  var surrounding = lib.getSurroundingCells(cell.row, cell.col);
  //console.log(surrounding);

  for (var j =0; j<surrounding.length; j++){
    if (surrounding[j].isMine===true){
      count++
    }
  }
  //console.log("bomb count" + count);
return count;
}

