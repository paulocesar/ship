(function (scope) {
    var ship = scope.ship;

    var masks = {
        'mask-money': function ($el) {
            money.applyMask($el);
        },

        'mask-money-positive': function ($el) {
            money.applyMask($el, { allowNegative: false });
        },

        'mask-money-negative': function ($el) {
            money.applyMask($el, { allowNegative: true });
        }
    };

    ship.fieldMask = {
        apply: function (el) {
            var $el = $(el);

            _.each(masks, function (applyFunc, cls) {
                applyFunc($el.find('.' + cls));
            });
        }
    };
})(window);
