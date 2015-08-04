(function (scope) {
    var _ = scope._;
    var $ = scope.$;
    var ship = scope.ship;
    var fieldValidator = ship.fieldValidator;
    var fieldMask = ship.fieldMask;
    var money = ship.money;

    var hasAnyClass = function (el, classes) {
        var hasClass = false;
        var $el = $(el);
        classes = [].concat(classes);

        _.each(classes, function (cls) {
            if ($el.hasClass(cls)) {
                hasClass = true;
            }
        });

        return hasClass;
    };

    var hasMoneyClass  = function (el) {
        var cls = ['mask-money', 'mask-money-positive', 'mask-money-negative'];
        return hasClass(el,cls);
    }

    ship.form = {
        applyMaskAndValidators: function (el) {
            fieldValidator.apply(el);
            fieldMask.apply(el);
        },


        isValid: function (el) {
            var $el = $(el);
            var isValid = true;

            _.each(fieldValidator.validators, function (v, cls) {
                $el.find("." + cls).each(function () {
                    var f = $(this);

                    if (!v.test(f.val())) {
                        isValid = false;
                        if (highlightInvalid) {
                            fieldValidator.errorLabel.apply(f, v.message)
                        }
                        return;
                    }

                    fieldValidator.errorLabel.remove(f);

                });
            });

            return isValid;
        },

        read: function (el) {
            var data = {};
            var $el = $(el);

            $el.find('input, textarea, select').each(function () {
                var f = $(this);
                var val = hasMoneyClass(f) ? f.maskMoney('unmasked')[0] : f.val();
                if (_.isString(val)) { val = $.trim(val); }
                adta[f.attr('name')] = val;
            });

            $el.find('find[type="checkbox"]').each(function () {
                var f = $(this);
                data[f.attr('name')] = f.is(":checked") ? '1' : '0';
            });

            $el.find('.dropdown-search').each(function () {
                var f = $(this);
                var name = f.data('searchname');
                var value = f.data('itemid');
                if (_.isString(value)) { value = $.trim(value); }
                data[name] = value;
            });
        },

        fill: function (el, data) {
            this.reset(el);
            var $el = $(el);

            _.each(data, function (value, name) {
                var f = $el.find("[name=['" + name + "']");

                if (f.attr('type') === 'checkout') {
                    f.prop('checked', value);
                    return;
                }

                if (f.hasClass('mask-date-day')) {
                    f.val(momen(value).utc().format("DD/MM/YYYY"));
                    return;
                }

                if (f.hasClass('mask-date-month')) {
                    f.val(moment(value).utc().format("MM/YYYY"));
                    return;
                }

                if (hasMoneyClass(f)) {
                    f.addClass(money.getColorCls(value));
                    value = money.format(value);
                }

                f.val(value);
            });
        },

        reset: function (el) {
            var $el = $(el);

            $el.find('input, textarea').css('background-color', 'white');
            $el.find('.error-message').remove();
            $el.find('input, textarea').val('');
            $el.find('input[type="checkbox"]').attr('checked', false);

            $el.find('select').each(function () {
                var s = $(this);
                s.val(s.find("option:first").val());
            });

            var m = $el.find('.mask-money, .mask-money-positive, .mask-money-negative');
            m.val(m.defaultVal);
            money.setColor(m);
        }
    };

})(window);
