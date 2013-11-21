/*           _                    
   ___  ___ | |_   _____ _ __ ___ 
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other
window.findNRooksSolution = function(n){
  var solution = []; //fixme
  var rowArr = [];
  var colArr = [];

  for (var row = 0; row < n; row++) {
    var colArrForRow = Array(n);

    for (var i = 0; i < n; i++) {
     colArrForRow[i] = 0;
    }
    solution[row] = colArrForRow;
  }

  for (var i = 0; i < n; i++) {
    rowArr[i] = colArr[i] = i;
  }

  var placeRooks = function(rowArrOrig, colArrOrig) {
    var rowArr = rowArrOrig;
    var colArr = colArrOrig;
    
    if (rowArr.length === 1 && colArr.length === 1) {
      solution[rowArr[0]][colArr[0]]=1;
      return;
    }

    var rowIdx  = (Math.floor(Math.random()* 10) %rowArr.length);
    var colIdx = (Math.floor(Math.random()* 10) %colArr.length);

    var randomRowVal = rowArr[rowIdx];
    var randomColVal = colArr[colIdx];
    solution[randomRowVal][randomColVal] = 1;
    rowArr.splice(rowIdx, 1);
    colArr.splice(colIdx, 1);
    placeRooks(rowArr, colArr);
  };
   
  placeRooks(rowArr, colArr);
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n){
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n){
   var solution = []; //fixme
   var rowArr = [];
   var colArr = [];

   for (var row = 0; row < n; row++) {
    var colArrForRow = Array(n);

    for (var i = 0; i < n; i++) {
     colArrForRow[i] = 0;
    }
    solution[row] = colArrForRow;
   }

   for (var i = 0; i < n; i++) {
    rowArr[i] = colArr[i] = i;
   }
  // debugger;

   var placeQueens = function(rowArrOrig, colArrOrig) {
    var rowArr = rowArrOrig;
    var colArr = colArrOrig;
    
    if (rowArr.length === 1 && colArr.length === 1) {
      if (solution[rowArr[0]][colArr[0]] !== -1){
        solution[rowArr[0]][colArr[0]]=1;
      }
      return;
    }

    // Construct a pair

    var rowColArr = [];
    var rowIdx;
    var colIdx;
    var idx;
    var randomRowVal;
    var randomColVal;

    for (var i = 0; i < rowArr.length; i++) {
      for (var j = 0; j < colArr.length; j++) {
        rowColArr.push([i,j]);
      }
    }

    while (true) {

      if (rowColArr.length === 0) break;
      idx = (Math.floor(Math.random()* 10) %rowColArr.length);

      rowIdx = rowColArr[idx][0];
      colIdx = rowColArr[idx][1];

      randomRowVal = rowArr[rowIdx];
      randomColVal = colArr[colIdx];
    
      if (solution[randomRowVal][randomColVal] === -1) {
        rowColArr.splice(idx,1);
      }
      else {
        break;
      }
    }
     
    //if (solution[randomRowVal][randomColVal] === -1){
      //rowIdx = (Math.floor(Math.random()* 10) %rowArr.length);
      //colIdx = (Math.floor(Math.random()* 10) %colArr.length);
    //} 
    //else {
      if (rowColArr.length === 0) return;
      solution[randomRowVal][randomColVal] = 1;
    //}

    rowArr.splice(rowIdx, 1);
    colArr.splice(colIdx, 1);
    var majDiagVal = randomColVal - randomRowVal;
    var minDiagVal = randomColVal + randomRowVal;

    for (var i = 0; i < solution.length; i++) {
      for (var j = 0; j <solution.length; j++) {
        // Checking for major diagonal
        if ((j - i) === majDiagVal && solution[i][j] !== 1) {
          solution[i][j] = -1;
        }
        if ((j + i) === minDiagVal && solution[i][j] !== 1) {
          solution[i][j] = -1;
        }
      }
    }

    placeQueens(rowArr, colArr);
  };
   
  placeQueens(rowArr, colArr);
  
  for (var i = 0; i < solution.length; i++) {
    for (var j = 0; j < solution.length; j++){
      if (solution[i][j] === -1){
        solution[i][j] = 0;
      }
    }
  }
  
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));

  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n){
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
