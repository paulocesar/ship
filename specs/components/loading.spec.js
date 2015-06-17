var $loading = null;

var createLoading = function (label, src) {
    removeLoading();

    var loading = ship.components.loading;

    src = src || ''

    $('body').append(loading.html(src, label));
    $loading = $('.ship-loader');
}

var removeLoading = function () {
    if (!$loading) { return; }

    $loading.remove();
    $loading = null;
}

describe('ship component loading', function () {
    after(function () { removeLoading(); });


    it('should create a loading', function () {
        createLoading('exemplo');

        var expected = '<img src=""> <div>exemplo</div>'
        $.trim($loading.html()).should.eql(expected);

        removeLoading();
    });

    it('should hide loading', function () {
        createLoading('exemplo');

        ship.components.loading.hide();
        $.trim($loading.css('display')).should.eql('none');

        removeLoading();
    });

    it('should show loading', function () {
        createLoading('exemplo');

        ship.components.loading.hide();
        ship.components.loading.show();
        $.trim($loading.css('display')).should.eql('block');

        removeLoading();
    });


});
