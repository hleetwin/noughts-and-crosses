'use strict'
angular.module('ticTacToe', ['ng'])
.controller('BoardCtrl', function($scope, Board) {
  return $scope.board = new Board;
});
