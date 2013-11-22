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
   var solutionArray = [];
   var solution = []; //fixme
   var rowArr = [];
   var colArr = [];
   var qExpected = 1;

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

   if (n > 1) {
     qExpected = (n>=4)?n:(n-1);
   }

   var diagToggler = function (isRevert, majDVal, minDVal) {

      var majValue = (isRevert)?2:-2;
      var minValue = (isRevert)?1:-1;
      var checkCond = (isRevert)?0:1;
      var tot = majValue + minValue;

      for (var i = 0; i < solution.length; i++) {
        for (var j = 0; j <solution.length; j++) {
          // Checking for major diagonal

          if ((j - i) === majDVal && solution[i][j] !== checkCond) {
            solution[i][j] += majValue;
            if (!isRevert) {
              if(solution[i][j] < tot) {
                solution[i][j] -= majValue;
              }
            }
            else {
               if(solution[i][j] > tot) {
                solution[i][j] -= majValue;
              }
            }
          } 
          else if ((j + i) === minDVal && solution[i][j] !== checkCond) {
            solution[i][j] += minValue;
            if (!isRevert) {
              if(solution[i][j] < tot) {
                solution[i][j] -= minValue;
              }
            }
            else {
               if(solution[i][j] > tot) {
                solution[i][j] -= minValue;
              }
            }

          }
        }
      }
   };

  var placeQueens = function(rowArrOrig, colArrOrig, qCount) {
    var rowArr = rowArrOrig.slice(0);
    var colArr = colArrOrig.slice(0);
    var retValue = 0;
    var placed = false;

    if (rowArr.length === 1 && colArr.length === 1) {
      var majDiagVal = colArr[0] - rowArr[0];
      var minDiagVal = colArr[0] + rowArr[0];

      if (solution[rowArr[0]][colArr[0]] === 0){
        solution[rowArr[0]][colArr[0]]=1;
        diagToggler(false, majDiagVal, minDiagVal);

        qCount++;
        placed = true;
        if (n === 1) {
          solutionArray.push(solution);
        }
      }

      if (placed) {
        if (qCount == qExpected) {
          var solutionCopy = solution.slice(0);
          for (var ii = 0; ii < solutionCopy.length; ii++){
            solutionCopy[ii] = solution[ii].slice(0);
          }
          for (var iii = 0; iii < solutionCopy.length; iii++) {
           for (var jjj = 0; jjj < solutionCopy.length; jjj++){
            if (solutionCopy[iii][jjj] < 0){
              solutionCopy[iii][jjj] = 0;
            }
           }
          }
          solutionArray.push(solutionCopy);
          retValue = 1;
          solution[rowArr[0]][colArr[0]]=0;
          qCount--;
          diagToggler(true, majDiagVal, minDiagVal);
        }
        else {
          solution[rowArr[0]][colArr[0]]=0;
          qCount--;
          diagToggler(true, majDiagVal, minDiagVal);
          retValue = 0;
        }
      }
      return retValue;
    }

    // Construct a pair

    var rowColArr = [];
    var rowIdx;
    var colIdx;
    var idx;
    var rowVal;
    var colVal;
    var queenCount = qCount;

    for (var i = 0; i < rowArr.length; i++) {
      for (var j = 0; j < colArr.length; j++) {
        rowColArr.push([i,j]);
      }
    }

    var len = rowColArr.length;
    for (var k = 0; k < len ; k++) {
      rowIdx = rowColArr[k][0];
      colIdx = rowColArr[k][1];
      rowVal = rowArr[rowIdx];
      colVal = colArr[colIdx];

      if (solution[rowVal][colVal] < 0) {
        rowColArr.splice(k,1);
        k--;
        len--;
      }
    }

    if (rowColArr.length === 0) return;

    var foundSolution = 0;
    var solValue = 0;

    rowArr = rowArrOrig.slice(0);
    colArr = colArrOrig.slice(0);
    var rowArrCopy = [];
    var colArrCopy = [];

    len = rowColArr.length;
    for (var i = 0; i < len; i++) {
    rowArr = rowArrOrig.slice(0);
    colArr = colArrOrig.slice(0);
/*
      if (rowArrCopy.length > 0) {
        rowArr = rowArrCopy;
      }
      
      if (colArrCopy.length > 0) {
        colArr = colArrCopy;
      }
*/
      rowIdx = rowColArr[i][0];
      colIdx = rowColArr[i][1];

      rowVal = rowArr[rowIdx];
      if (rowVal === undefined) {
        rowColArr.splice(i,1);
        len--;
        i--;
        continue;
      }

      colVal = colArr[colIdx];
      if (colVal === undefined) {
        rowColArr.splice(i,1);
        len --;
        i--;
        continue;
      }

      if (solution[rowVal][colVal] !== 0) {
        continue;
      }  
      solution[rowVal][colVal] = 1;
      queenCount++;

      var solutionCopy;

      if (queenCount == qExpected) {
        // Make a new copy of the solution
        solutionCopy = solution.slice(0);
        for (var ii = 0; ii < solutionCopy.length; ii++){
          solutionCopy[ii] = solution[ii].slice(0);
        }
        for (var iii = 0; iii < solutionCopy.length; iii++) {
         for (var jjj = 0; jjj < solutionCopy.length; jjj++){
          if (solutionCopy[iii][jjj] < 0){
           solutionCopy[iii][jjj] = 0;
          }
         }
        }
        //console.log(solutionCopy)
        solutionArray.push(solutionCopy);
        //solution[rowVal][colVal] = 0;
        //queenCount--;
        // and push it into a solution array
        foundSolution = 1;
        continue;
      }

      rowArr.splice(rowIdx, 1);
      colArr.splice(colIdx, 1);
      majDiagVal = colVal - rowVal;
      minDiagVal = colVal + rowVal;
    
      diagToggler(false, majDiagVal, minDiagVal);
      //rowArrCopy = rowArr.slice(0);
      //colArrCopy = colArr.slice(0);
           
      solValue = placeQueens(rowArr, colArr, queenCount);
      foundSolution = foundSolution || solValue;
  
      if (!solValue) {
        diagToggler(true, majDiagVal, minDiagVal);
        solution[rowVal][colVal] = 0;
        queenCount--;
      }
    }
    console.log("RowVal ==>", rowVal);
    console.log("ColVal ==>", colVal);
    console.log("rowArr ==>", rowArr);
    console.log("colArr ==  >", colArr);
    
   return foundSolution;
  };

  placeQueens(rowArr, colArr, 0);

  // for (var i = 0; i < solution.length; i++) {
  //   for (var j = 0; j < solution.length; j++){
  //     if (solution[i][j] === -1){
  //       solution[i][j] = 0;
  //     }
  //   }
  // }

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solutionArray[0]));

  return solutionArray[0];
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n){
  var solutionCount = undefined; //fixme


  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
}
