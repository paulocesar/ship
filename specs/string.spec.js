describe('ship string', function () {
    //TODO: add tests to applyMask and setValue

    it('first to lower', function () {
        ship.string.firstToLower("ABC").should.eql("aBC");
    });

    it('sanitize', function () {
        ship.string.sanitize("  A   b C $,").should.eql("A b C");
    })
});
