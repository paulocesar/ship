describe('ship money', function () {
    //TODO: add tests to applyMask and setValue

    it('get color cls', function () {
        ship.money.getColorCls(-1).should.eql('red-money');
        ship.money.getColorCls(1).should.eql('green-money');
        ship.money.getColorCls(0).should.eql('');
    });

    it('return html money', function () {
        var expected = "<font class='green-money'>R$ 10,50</font>"
        ship.money.html(10.5).should.eql(expected);
    })
});
