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

    var rowIdx = (Math.floor(Math.random()* 10) %rowArr.length);
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
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n){
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
