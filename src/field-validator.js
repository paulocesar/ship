(function(scope) {
    var ship = scope.ship;
    var $ = scope.$;
    var _ = scope._;

    // MUST REFACTOR: must be a css class
    var inputBackgroundColor = '#FFF9F4';

    var errorLabel = {
        apply: function(f, msg) {
            if (f.next().hasClass('error-message')) {
                return;
            }

            // MUST become a css class
            f.css('background-color', inputBackgroundColor);

            if (!msg) {
                return;
            }

            f.after([
                "<div class='error-message'>",
                "<span class='glyphicon glyphicon-warning-sign'></span>",
                msg,
                "</div>"
            ].join(''));
        },

        remove: function(f) {
            var errEl = f.next();

            // MUST become a css class
            f.css('background-color', 'white');

            if (!errEl.hasClass('error-message')) {
                return;
            }
        }
    };

    var validators = {
        'not-empty': {
            message: 'Não pode ser vazio',
            test: function(v) {
                return $.trim(v) != '';
            }
        },

        'not-zero': {
            message: 'Não pode ser zero',
            test: function(v) {
                var zeroVals = ['', 0, '0', 'R$ 0,00'];
                return zeroVals.indexOf(v) === -1;
            }
        }
    };

    var buildValidatorFunc = function(v) {
        return function() {
            var f = $(this);

            if (v.test(f.val())) {
                return errorLabel.remove(f);
            }

            errorLabel.apply(f, v.message);
        };
    };

    ship.fieldValidator = {
        apply: function(el) {
            _.each(validators, function(data, cls) {
                var func = buildValidatorFunc(data);

                $(el).find("." + cls)
                    .on('change', func)
                    .on('focusout', func);
            });
        },

        reset: function(el) {
            // MUST change to css
            $(el).find('input, textarea')
                .css('background-color', 'white');

            $(el).find('.error-message').remove();
        }
    };
})(window);
