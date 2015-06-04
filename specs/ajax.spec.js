describe("ship ajax", function () {
    it("check 'should' lib", function () {
        (true).should.true;
    });

    it("get data from server", function () {
        return ship.get('/')
            .success(function (res) {
                res.should.be.string;
            });
    });

    it("eval data", function () {
        ship.eval("{sample: 'hello'}").sample.should.eql('hello');
    });
});
