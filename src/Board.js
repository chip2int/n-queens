// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function(){

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (typeof params == "undefined" || params == null) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function(){
      return _(_.range(this.get('n'))).map(function(rowIndex){
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex){
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex){
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex){
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function(){
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex){
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function(){
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex){
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _                     
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _ 
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_ 
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)
                                                   
 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    // 
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex){
      var rowArr = this.get(rowIndex);
      var count = 0;
      for (var i = 0; i < rowArr.length; i++) {
        count += rowArr[i];
        if (count > 1) return true;
      }
      return false; // fixme
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function(){
      var retValue = false;
      for (var i = 0; i <this.rows().length; i++) {
        retValue = this.hasRowConflictAt(i);
        if (retValue) return retValue;
      }
      return retValue; // fixme
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    // 
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex){
      var count = 0;
      for (var i = 0; i < this.rows().length; i++) {
        if (this.get(i)[colIndex]) {
          count++;
        }
        if (count > 1) {
          return true;
        }
      }

      return false; // fixme
      
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function(){
      
      for (var i = 0; i < this.rows().length; i++) {
        retValue = this.hasColConflictAt(i);
        if (retValue) return retValue;
      }
      return retValue;

    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    // 
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow){
      
      var count = 0;
      for (var i = 0; i < this.rows().length; i++) {
        for (var j = 0; j < this.get(i).length; j++) {
          if (this._getFirstRowColumnIndexForMajorDiagonalOn(i,j) === majorDiagonalColumnIndexAtFirstRow) {
            if (this.get(i)[j]) {
              count++;
            }
          }
          if (count > 1) return true;
        }
      }
      
      return false; // fixme

    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function(){
      var diagVal = this.rows().length-1;
      var initDiag = diagVal * -1;

      var diag = initDiag;
      while (diag < diagVal) {
        if (this.hasMajorDiagonalConflictAt(diag)) {
          return true;
        }
        diag++;
      }
      
      return false;
    },
    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    // 
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow){
      var count = 0;
      for (var i = 0; i < this.rows().length; i++) {
        for (var j = 0; j < this.get(i).length; j++) {
          if (this._getFirstRowColumnIndexForMinorDiagonalOn(i,j) === minorDiagonalColumnIndexAtFirstRow) {
            if (this.get(i)[j]) {
              // debugger;
              count++;
            }
          }
          if (count > 1) return true;
        }
      }
      return false; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function(){
      var maxDiag = 2 * (this.rows().length - 1);
      var diag = 0;
      while (diag <= maxDiag) {
        if (this.hasMinorDiagonalConflictAt(diag)) {
          return true;
        }
        diag++;
      }
      return false; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n){
    return _(_.range(n)).map(function(){
      return _(_.range(n)).map(function(){
        return 0;
      });
    });
  };

}());
