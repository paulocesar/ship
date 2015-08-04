(function (scope) {
    var ship = scope.ship;
    var money = ship.money;
    var rgxNotBankDigit = /[^\dx]/g;
    var rgxNotDigit = /[^\d]/g;


    var setDateInterval = function () {
        $el.each(function () {
            var f = $(this);

            if (f.hasClass('only-date-future')) {
                f.data("DateTimePicker").minDate(moment());
            }

            if (f.hasClass('only-date-past')) {
                f.data("DateTimePicker").maxDate(moment());
            }
        });
    };

    var masks = {
        'mask-money': function ($el) {
            money.applyMask($el);
        },

        'mask-money-positive': function ($el) {
            money.applyMask($el, { allowNegative: false });
        },

        'mask-money-negative': function ($el) {
            money.applyMask($el, { allowNegative: true });

            var onChange = function () {
                var val = $el.maskMoney('unmasked')[0];
                if (val > 0) {
                    val = 0 - val;
                    $el.maskMoney('mask', val);
                }
            };

            $el.on('keyup', onChange).on('change', onChange);
        },

        'mask-number-bank': function ($el) {
            var func = function () {
                var f = $(this);
                var val = String(f.val());
                var l = null;

                val = val.replace(rgxNotBankDigit, '');

                if (val.length > 3) {
                    l = val.length - 1;
                    val = val.slice(0, -1) + "-" + val.slice(l, l+1);
                }

                f.val(val);
            };

            $el.on('keyup', func).on('change', func).on('focusout', func);
        },

        'mask-only-number': function ($el) {
            var func = function () {
                var f = $(this);
                f.val(String(f.val()).replace(rgxNotDigit, ""));
            };

            $el.on('keyup', func).on('change', func).on('focusout', func);
        },
        /*
        'mask-date-day': function ($el) {
            $el.datetimepicker({
                viewMode: 'days',
                format: 'DD/MM/YYYY'
            });

            setDateInterval($el);
        },

        'mask-date-month': function ($el) {
            $el.datetimepicker({
                viewMode: 'months',
                format: 'MM/YYYY'
            });

            setDateInterval($el);
        }
       */
    };

    ship.fieldMask = {
        masks: masks,

        apply: function (el) {
            var $el = $(el);

            _.each(masks, function (applyFunc, cls) {
                var f = $el.find('.' + cls);
                if (!_.isEmpty(f)) { applyFunc(f); }
            });
        }
    };
})(window);
