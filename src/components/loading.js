(function (scope) {
    var ship = scope.ship;
    var JST = scope.JST;

    ship.components.loading = {
        html: function (src, label) {
            return JST.loading({ src: src, label: label });
        },

        show: function () { $('.ship-loader').show(); },
        hide: function () { $('.ship-loader').hide(); }
    };

})(window);
