/*! ship - v0.0.1 - 2015-07-03 */
this["JST"] = this["JST"] || {};

this["JST"]["image-cropper"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="cropper-container"><img src="/images/image-cropper.jpg" /></div>\n';

}
return __p
};

this["JST"]["loading"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="ship-loader">\n    <img src=\'' +
((__t = ( src )) == null ? '' : __t) +
'\'> <div>' +
((__t = ( label )) == null ? '' : __t) +
'</div>\n</div>\n';

}
return __p
};
(function(scope) {

    var ship = scope.ship = {
        components: {}
    };

})(window);

(function (scope) {
    var ship = scope.ship;
    var $ = scope.$;

    var str = ship.string = {};

    str.firstToLower = function(str) {
        return str.charAt(0).toLowerCase() + str.slice(1);
    };

    var rgxWhitespace = /[\s]+/g
    var rgxTag = /\<[^>]*\>/g
    var rgxUnwatedChars = /[,.$-]/g

    str.sanitize = function (str) {
        return $.trim(
            str.replace(rgxWhitespace, ' ')
                .replace(rgxTag, '')
                .replace(rgxUnwatedChars, '')
        );
    };

})(window);

(function(scope) {
    var ship = scope.ship;
    var $ = scope.$;

    $.ajaxSetup({ cache: false });

    ship.ajax = function (method, url, data) {
        return $.ajax(url, {
            method: method,
            data: JSON.stringify(data),
            cache: false
        });
    };

    ship.get = function (url, data) {
        return this.ajax('get', url, data);
    };

    ship.post = function (url, data) {
        return this.ajax('post', url, data);
    };

    ship.eval = function (data) {
        return (new Function("return " + data + ";"))();
    };


})(window);

(function (scope) {
    var ship =  scope.ship;
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

    money.applyMask = function ($el, config) {
        config = config || {};
        _.defaults(config, defaultConfig);

        var v = parseFloat($el.val()) || 0.00;
        v = this.format(v);

        $el.maskMoney(config);

        this.setColor($el);
        $el.on('keyup', function () {
            money.setColor($(this));
        });
    };

    money.setValue = function (el, value) {
        var $el = $(el);

        $el.maskMoney('mask', value);
        return this.setColor($el);
    };

    money.setColor = function (el) {
        var $el = $(el),
            colorCls = money.getColorCls($el.maskMoney('unmasked')[0]);

        $el.removeClass('green-money red-money');
        return $el.addClass(colorCls);
    };

    money.getColorCls = function(value) {
        if (value > 0) { return 'green-money'; }
        if (value < 0) { return 'red-money'; }
        return '';
    };

    money.html = function(num) {
        return "<font class='"+ this.getColorCls(num)+ "'>"
            + this.format(num)
            + "</font>";
    };

    money.round = function(num, decimalPlaces) {
        var d, f, i, m, n, r;
        if (decimalPlaces == null) { decimalPlaces = 2; }

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

        return d ? r/m : r;
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

(function (scope) {
	var ship = scope.ship;
	var $ = scope.$;
	var _ = scope._;

	// MUST REFACTOR: must be a css class
	var inputBackgroundColor = '#FFF9F4';

	var errorLabel = {
		apply: function (f, msg) {
			if (f.next().hasClass('error-message')) { return; }

			// MUST become a css class
			f.css('background-color', inputBackgroundColor);

			if (!msg) { return; }

			f.after([
				"<div class='error-message'>",
				"<span class='glyphicon glyphicon-warning-sign'></span>",
				msg,
				"</div>"
			].join(''));
		},

		remove: function (f) {
			var errEl = f.next();

			// MUST become a css class
			f.css('background-color', 'white');

			if (!errEl.hasClass('error-message')) { return; }
		}
	};

	var validators = {
		'not-empty': {
			message: 'Não pode ser vazio',
			test: function (v) { return $.trim(v) != ''; }
		},

		'not-zero': {
			message: 'Não pode ser zero',
			test: function (v) {
				var zeroVals = [ '', 0, '0', 'R$ 0,00' ];
				return zeroVals.indexOf(v) === -1;
			}
		}
	};

	var buildValidatorFunc = function (v) {
		return function () {
			var f = $(this);

			if (v.test(f.val())) {
				return errorLabel.remove(f);
			}

			errorLabel.apply(f, v.message);
		};
	};

	ship.fieldValidator = {
		apply: function (el) {
			_.each(validators, function (data, cls) {
				var func = buildValidatorFunc(data);

				$(el).find("." + cls)
					.on('change', func)
					.on('focusout', func);
			});
		},

		reset: function (el) {
			// MUST change to css
			$(el).find('input, textarea')
				.css('background-color', 'white');

			$(el).find('.error-message').remove();
		}
	};
})(window);
(function (scope) {
	var ship = scope.ship;

	var Backbone = scope.Backbone;
	var $ = scope.$;
	var _ = scope._;

	var displaysByName = {};
	var previousPage = '';

	var Router = Backbone.Router.extend({
		routes: {
			"/:name/:id": "goToPage"
		},

		goToPage: function (name, id) {
			if (previousPage === name) {
				return;
			}

			if (!displaysByName[name]) {
				throw new Error("'" + name + "' display is missing");
			}

			if (previousPage) {
				displaysByName[previousPage].onHide();
			}

			$('.display').hide();
			$('#display-' + name).show();

			displaysByName[name].onShow(id);

			previousPage = name;
		}
	});

	var Display = Backbone.View.extend({
		tpls: {},
		subTpls: { },

		constructor: function () {
			if (typeof this.name !== 'string') {
				throw new Error("You must set a name to display class");
			}

			this.name = $.trim(this.name);

			var name = this.name,
				displayId = "#display-" + name,
				tplPath = "tpl-display-" + name + '-',
				subTplPath = "subTpl-display-" + name + '-',
				tpls = this.tpls,
				subTpls = this.subTpls;

			$("[id^='" + tplPath + "']").each(function () {
				var subName = $(this).attr('id').replace(tplPath, '');
				tpls[subName] = _.template($(this).html());
			});

			Backbone.View.apply(this, arguments);

			this.setElement(displayId);

			ship.fieldValidator.apply(this.$el);
		},

		$f: function (name) {
			return this.$("[name='" + name + "']");
		},

		onShow: function () {

		},

		onHide: function () {

		},

		show: function () { this.$el.show(); },
		hide: function () { this.$el.hide(); }
	});

	ship.navigator = {
		Display: Display,
		displaysByName: displaysByName,

		go: function (name) {
			this.router.navigate(name);
			this.router.goToPage(name);
		},

		getDisplay: function (name) {
			return displaysByName[name];
		},

		addDisplay: function (DisplayClass) {
			var d = new DisplayClass();
			displaysByName[d.name] = d;
		},

		addDisplays: function(displays) {
			_.each(displays, function (DisplayClass) {
				ship.navigator.addDisplay(DisplayClass);
			});
		},

		start: function (displays) {
			displays = displays || [];
			this.addDisplays(displays);

			Backbone.history.start();
			this.router = new Router();
		}
	};

})(window);


(function (scope) {
    var ship = scope.ship;
    var Backbone = scope.Backbone;

    var defaultData = {
        aspectRatio: 1 / 1,
        strict: false,
        highlight: false,
        dragCrop: false,
        rotatable:false,
        zoomable: false,
        cropBoxMovable: true,
        cropBoxResizable: true,
        mouseWheelZoom: false,
        touchDragZoom: false
    };

    var ImageCropper = Backbone.View.extend({
        el: '.cropper-container',

        url: {
            upload: '/image/upload',
            crop: '/image/crop'
        },

        initialize: function (options) {
            this.$img = this.$('img');
            this.imageOptions = options || {}
            _.defaults(this.imageOptions, defaultData);
            this.$img.cropper(this.imageOptions);
        },

        uploadImage: function (postData, callback) {
            var $img = this.$img;
            var options = this.imageOptions;
            var $canvasImg = this.$('.cropper-canvas > img');
            var $viewBoxImg = this.$('.cropper-view-box > img');

            callback = callback || function () {};

            return $.ajax({
                url: this.url.upload,
                type: 'POST',
                data: new FormData(postData),
                cache: false,
                contentType: false,
                processData: false,

                error: function (err) { console.log(err); },

                success: function (res) {
                    $img.cropper('destroy');
                    $img.attr('src', res.src);
                    $img.cropper(options);

                    callback();
                },

                xhr: function () {
                    var xhr = $.ajaxSettings.xhr();

                    if (xhr.upload) {
                        xhr.upload.addEventListener(
                            'progress',
                            function progressHandlingFunction(e){
                                if(e.lengthComputable){
                                    console.log(e.loaded, e.total);
                                }
                            },
                            false
                        );
                    }

                    return xhr;
                }
            });
        },

        crop: function (callback) {
            callback = callback || function () {};

            var data = this.$img.cropper('getData');

            var imageData = this.$img.cropper('getImageData');

            return $.ajax({
                url: this.url.crop,
                type: 'POST',
                data: data,
                cache: false,

                success: function (res) {
                    callback();
                },

            });
        }
    });

    ship.components.ImageCropper = ImageCropper;

})(window);

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
