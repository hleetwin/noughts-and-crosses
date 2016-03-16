angular.module('ticTacToe')
.factory('Board', function() {
 
var Board = (function() {
  var Cell, cross, empty, nought, playerMarkers, size;
  size = size||3;
  empty = ' ';
  nought = 'O';
  cross = '✖';
  playerMarkers = [nought, cross];
  function Board() {
    this.reset();
  }

  Board.prototype.reset = function() {
    var i, results;
    //no wins since reset
    this.won = false;
    //always begins with 'o'
    this.currentPlayer = 0;
    return this.grid = (function() {
      results = [];
      for (i = 1; 1 <= size ? i <= size : i >= size; 1 <= size ? i++ : i--){ results.push(i); }
      return results;
      //add rows
    }).apply(this).map(function() {
      var i, results;
      return (function() {
        results = [];
        for (var i = 1; 1 <= size ? i <= size : i >= size; 1 <= size ? i++ : i--){ results.push(i); }
        return results;
      //add cell{marker: ' ', winning: undefined}
      }).apply(this).map(function() {
        return new Cell(empty);
      });
    });
  };

  Board.prototype.playCell = function(cell) {
    var i, len, results;
    if (cell.hasBeenPlayed()) {
      return;
    }
    if (this.won) {
      return;
    }
    cell.mark(this.currentPlayerMarker());
    if(move = this.winningMove(this.currentPlayerMarker())) {
      this.won = true;
      this.winningMarker = this.currentPlayerMarker();
      results = [];
      for (i = 0, len = move.length; i < len; i++) {
        cell = move[i];
        results.push(cell.winning = true);
      }
      return results;
    } else {
      return this.switchPlayer();
    }
  };

  Board.prototype.currentPlayerMarker = function() {
    return playerMarkers[this.currentPlayer];
  };

  Board.prototype.switchPlayer = function() {
    return this.currentPlayer ^= 1;
  };

  Board.prototype.winningMove = function(marker) {
    return this.winningRow(this.grid, marker) || this.winningColumn(this.grid, marker) || this.winningDiagonal(this.grid, marker);
  };

  Board.prototype.winningRow = function(grid, marker) {
    return grid.find(function(row) {
      return (row).every(function(cell) {
        return cell.marker === marker;
      });
    });
  };

  //brilliant!  zip up, then use winningRow to find matches.  reuse former formula.
  Board.prototype.winningColumn = function(grid, marker) {
    return this.winningRow(_.zip.apply(null, grid), marker);
  };

  Board.prototype.winningDiagonal = function(grid, marker) {
    var antiDiagonal, diagonal, n, cellMatches;
    cellMatches = function(cell) {
      return cell.marker === marker;
    };
    diagonal = (function() {
      var ref, results;
      results = [];
      for (n = 0, ref = size - 1; 0 <= ref ? n <= ref : n >= ref; 0 <= ref ? n++ : n--) {
        results.push(grid[n][n]);
      }
      return results;
    })();
    if ((diagonal).every(cellMatches)) {
      return diagonal;
    }
    antiDiagonal = (function() {
      var ref, results;
      results = [];
      for (n = 0, ref = size - 1; 0 <= ref ? n <= ref : n >= ref; 0 <= ref ? n++ : n--) {
        results.push(grid[n][size - 1 - n]);
      }
      return results;
    })();
    if ((antiDiagonal).every(cellMatches)) {
      return antiDiagonal;
    }
    return;
  };

  Cell = (function() {
    function Cell(marker, winning) {
      this.marker = marker;
      this.winning = winning !== null ? winning : false;
    }

    Cell.prototype.mark = function(marker) {
      this.marker = marker;
    };

    Cell.prototype.hasBeenPlayed = function() {
      return this.marker !== empty;
    };
    return Cell;
  })();
  return Board;
})();
return Board;
});





