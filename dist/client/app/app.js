angular.module("ticTacToe").factory("Board",function(){var a=function(){function a(){this.reset()}var b,c,d,e,f,g;return g=g||3,d=" ",e="O",c="✖",f=[e,c],a.prototype.reset=function(){var a,c;return this.won=!1,this.currentPlayer=0,this.grid===function(){for(c=[],a=1;g>=1?g>=a:a>=g;g>=1?a++:a--)c.push(a);return c}.apply(this).map(function(){var a;return function(){a=[];for(var b=1;g>=1?g>=b:b>=g;g>=1?b++:b--)a.push(b);return a}.apply(this).map(function(){return new b(d)})})},a.prototype.playCell=function(a){var b,c,d,e;if(!a.hasBeenPlayed()&&!this.won){if(a.mark(this.currentPlayerMarker()),d===this.winningMove(this.currentPlayerMarker())){for(this.won=!0,this.winningMarker=this.currentPlayerMarker(),e=[],b=0,c=d.length;c>b;b++)a=d[b],e.push(a.winning=!0);return e}return this.switchPlayer()}},a.prototype.currentPlayerMarker=function(){return f[this.currentPlayer]},a.prototype.switchPlayer=function(){return this.currentPlayer^=1},a.prototype.winningMove=function(a){return this.winningRow(this.grid,a)||this.winningColumn(this.grid,a)||this.winningDiagonal(this.grid,a)},a.prototype.winningRow=function(a,b){return a.find(function(a){return a.every(function(a){return a.marker===b})})},a.prototype.winningColumn=function(a,b){return this.winningRow(_.zip.apply(null,a),b)},a.prototype.winningDiagonal=function(a,b){var c,d,e,f;return f=function(a){return a.marker===b},d=function(){var b,c;for(c=[],e=0,b=g-1;b>=0?b>=e:e>=b;b>=0?e++:e--)c.push(a[e][e]);return c}(),d.every(f)?d:(c=function(){var b,c;for(c=[],e=0,b=g-1;b>=0?b>=e:e>=b;b>=0?e++:e--)c.push(a[e][g-1-e]);return c}(),c.every(f)?c:void 0)},b=function(){function a(a,b){this.marker=a,this.winning=null!==b?b:!1}return a.prototype.mark=function(a){this.marker=a},a.prototype.hasBeenPlayed=function(){return this.marker!==d},a}(),a}();return a});