require('./board.js')(ngModule);

module.exports = function(ngModule) {
  describe('board', function() {
    beforeEach(window.module(ngModule.name));

      it('should test properly', function() {
        expect(true).to.be.true;
      });
  });
};

