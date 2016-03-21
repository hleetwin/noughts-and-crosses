require('./board.js')(ngModule);

module.exports = function(ngModule) {
  describe('board', function() {
    beforeEach(window.module(ngModule.name));

      //testing whether karma set up properly
      it('should test properly', function() {
        expect(true).to.be.true;
      });
  });
};

