const angular = require('angular');

if(ON_TEST){
  require('angular-mocks/angular-mocks');
}

const ngModule = angular.module('ticTacToe', ['ng']);
ngModule.controller('BoardCtrl', function($scope, Board) {
  return $scope.board = new Board;
});

require('./board.js')(ngModule);
