var _ = require('underscore');

var Board = (function() {
  var size = size||3;
  var empty = ' ';
  var nought = '◯';
  var cross = '✖';
  var playerMarkers = [nought, cross];

  function Board() {
    this.reset();

}

Board.prototype.reset = function() {
  this.won = false;
  //Begin game with player ◯
  this.currentPlayer = 0;
  this.grid = (function() {
    var results = [];
    for (var i = 1; i<= size; i++) {
      results.push(i);
    }
    return results;
    //Create 
  }).apply(this).map(function() {
    return (function() {
      var results = [];
      for (var i = 1; i <= size; i++) {
        results.push(i);
      }
      return results;
    //Iterate over board and output a cell for each position
    }).apply(this).map(function() {
      return new Cell(empty);
    });
  });
  return this.grid;
};

//Marks cell as played and keeps track of plays
Board.prototype.playCell = function(cell) {
  if (cell.hasBeenPlayed() || this.won) {
    return;
  }
  cell.mark(this.currentPlayerMarker());
  var move = this.winningMove(this.currentPlayerMarker());
  if(move) {
    this.won = true;
    this.winningMarker = this.currentPlayerMarker();
    var results = [];
    var len = move.length;
    for (var i = 0; i < len; i++) {
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
  //bitwise XOR assignment that ensures players switched between ◯ and ✖
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
  var results = [];
  var ref = size - 1;
  var cellMatches = function(cell) {
    return cell.marker === marker;
  };

  var diagonal = (function() {
    for (var n = 0; n <= ref; n++) {
      results.push(grid[n][n]);
    }
    return results;
  })();
  if ((diagonal).every(cellMatches)) {
    return diagonal;
  }

  var antiDiagonal = (function() {
    var results = [];
    var ref = size - 1;
    for (n = 0; 0 <= ref ? n <= ref : n >= ref; 0 <=ref ? n++ : n--) {
      results.push(grid[n][size - 1 - n]);
    }
    return results;
  })();
  if ((antiDiagonal).every(cellMatches)) {
    return antiDiagonal;
  }
  return;
};

var Cell = (function() {
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


module.exports = function(ngModule) {

  if(ON_TEST) {
    require('./board.test')(ngModule);
  }

  ngModule.factory("Board", function() {
    require('./app.css');
  return Board;
  });
}












