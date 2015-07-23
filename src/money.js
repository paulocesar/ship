(function(scope) {
    var ship = scope.ship;
    var $ = scope.$;
    var _ = scope._;

    var money = ship.money = {};

    var defaultConfig = {
        prefix: 'R$ ',
        thousands: '.',
        decimal: ',',
        allowZero: true,
        allowNegative: true,
        precision: 2
    };

    money.defaultVal = 'R$ 0,00';

    money.applyMask = function($el, config) {
        config = config || {};
        _.defaults(config, defaultConfig);

        var v = parseFloat($el.val()) || 0.00;
        v = this.format(v);

        $el.maskMoney(config);

        this.setColor($el);
        $el.on('keyup', function() {
            money.setColor($(this));
        });
    };

    money.setValue = function(el, value) {
        var $el = $(el);

        $el.maskMoney('mask', value);
        return this.setColor($el);
    };

    money.setColor = function(el) {
        var $el = $(el),
            colorCls = money.getColorCls($el.maskMoney('unmasked')[0]);

        $el.removeClass('green-money red-money');
        return $el.addClass(colorCls);
    };

    money.getColorCls = function(value) {
        if (value > 0) {
            return 'green-money';
        }
        if (value < 0) {
            return 'red-money';
        }
        return '';
    };

    money.html = function(num) {
        return "<font class='" + this.getColorCls(num) + "'>" + this.format(num) + "</font>";
    };

    money.round = function(num, decimalPlaces) {
        var d, f, i, m, n, r;
        if (decimalPlaces == null) {
            decimalPlaces = 2;
        }

        d = decimalPlaces || 0;
        m = Math.pow(10, d);
        n = +(d ? num * m : num).toFixed(8);
        i = Math.floor(n);
        f = n - i;

        if (f === 0.5) {
            r = i % 2 === 0 ? i : i + 1;
        } else {
            r = Math.round(n);
        }

        return d ? r / m : r;
    };

    // http://stackoverflow.com/questions/149055/how-can-i-format-numbers-as-money-in-javascript?answertab=votes#tab-top
    money.format = function(num) {
        var c, d, i, j, s, t;

        num = this.round(num);
        c = defaultConfig.precision;
        d = defaultConfig.decimal;
        t = defaultConfig.thousands;
        s = num < 0 ? "-" : "";
        i = parseInt(num = Math.abs(+num || 0).toFixed(c)) + "";
        j = (j = i.length) > 3 ? j % 3 : 0;

        return s + defaultConfig.prefix + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(num - i).toFixed(c).slice(2) : "");
    };

})(window);
