/*! ship - v0.0.1 - 2015-08-09 */
this["JST"] = this["JST"] || {};

this["JST"]["edit-display"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'row\'>\n    <div class=\'container-list col-md-6\'></div>\n    <div class=\'col-md-6\'>\n        <div class=\'container-form\'>\n        </div>\n        <div class=\'buttons\'>\n            <button class="btn btn-info new">Novo</button>\n            <button class="btn btn-danger delete">Excluir</button>\n            <button class="btn btn-success save">Salvar</button>\n        </div>\n    </div>\n</div>\n';

}
return __p
};

this["JST"]["image-cropper"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="cropper-container"><img src="/images/image-cropper.jpg" /></div>\n';

}
return __p
};

this["JST"]["list-item"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {

 _.each(displayFields, function (field) { ;
__p += '\n    <span class=\'field ' +
((__t = ( field )) == null ? '' : __t) +
'\'>' +
((__t = ( model[field] )) == null ? '' : __t) +
'</span>\n';
 }); ;
__p += '\n';

}
return __p
};

this["JST"]["list"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<input name="search" />\n<div class=\'scroll-wrapper\'>\n    <div class=\'scrollable\'>\n        <ul class=\'list\'></ul>\n        <div class=\'list-loading\'>carregando...</div>\n    </div>\n</div>\n';

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

(function(scope) {
    var ship = scope.ship;
    var $ = scope.$;

    var str = ship.string = {};

    str.firstToLower = function(str) {
        return str.charAt(0).toLowerCase() + str.slice(1);
    };

    var rgxWhitespace = /[\s]+/g
    var rgxTag = /\<[^>]*\>/g
    var rgxUnwatedChars = /[,.$-]/g

    str.sanitize = function(str) {
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

    $.ajaxSetup({
        cache: false
    });

    ship.ajax = function(method, url, data) {
        return $.ajax(url, {
            method: method,
            data: JSON.stringify(data),
            cache: false
        });
    };

    ship.get = function(url, data) {
        return this.ajax('get', url, data);
    };

    ship.post = function(url, data) {
        return this.ajax('post', url, data);
    };

    ship.eval = function(data) {
        return (new Function("return " + data + ";"))();
    };


})(window);

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
        validators: validators,
        errorLabel: errorLabel,

        apply: function(el) {
            _.each(validators, function(data, cls) {
                var func = buildValidatorFunc(data);

                $(el).find("." + cls)
                    .on('change', func)
                    .on('focusout', func);
            });
        }
    };
})(window);

(function(scope) {
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

        goToPage: function(name, id) {
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
        subTpls: {},

        constructor: function() {
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

            $("[id^='" + tplPath + "']").each(function() {
                var subName = $(this).attr('id').replace(tplPath, '');
                tpls[subName] = _.template($(this).html());
            });

            Backbone.View.apply(this, arguments);

            this.setElement(displayId);

            ship.fieldValidator.apply(this.$el);
        },

        $f: function(name) {
            return this.$("[name='" + name + "']");
        },

        onShow: function() {

        },

        onHide: function() {

        },

        show: function() {
            this.$el.show();
        },
        hide: function() {
            this.$el.hide();
        }
    });

    ship.navigator = {
        Display: Display,
        displaysByName: displaysByName,
        isStarted: false,

        go: function(name) {
            this.router.navigate(name);
            this.router.goToPage(name);
        },

        getDisplay: function(name) {
            return displaysByName[name];
        },

        addDisplay: function(DisplayClass) {
            var d = new DisplayClass();
            displaysByName[d.name] = d;
        },

        addDisplays: function(displays) {
            _.each(displays, function(DisplayClass) {
                ship.navigator.addDisplay(DisplayClass);
            });
        },

        start: function(displays) {
            displays = displays || [];
            this.addDisplays(displays);

            if (this.isStarted) {
                return;
            }

            Backbone.history.start();
            this.router = new Router();
            this.isStarted = true;
        }
    };

})(window);

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
    };

    ship.fieldMask = {
        masks: masks,

        apply: function (el) {
            var $el = $(el);

            _.each(masks, function (applyFunc, cls) {
                var f = $el.find('.' + cls);
                if (f.length > 0) { applyFunc(f); }
            });
        }
    };
})(window);

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
        return hasAnyClass(el,cls);
    }

    ship.form = {
        applyMaskAndValidators: function (el) {
            fieldValidator.apply(el);
            fieldMask.apply(el);
        },

        // MUST: refactor and set most part of validation in field-validator
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
                data[f.attr('name')] = val;
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

            return data;
        },

        fill: function (el, data) {
            this.reset(el);
            var $el = $(el);

            _.each(data, function (value, name) {
                var f = $el.find("[name='" + name + "']");

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

(function(scope) {
    var _ = scope._;
    var JST = scope.JST;
    var ship = scope.ship;
    var form = ship.form;
    var Display = ship.navigator.Display;

    var EditDisplay = Display.extend({
        name: 'edit',
        template: JST['edit-display'],

        constructor: function() {
            Display.apply(this, arguments);

            if (this.list) {
                this.list.remove();
            }

            this.list = new ship.components.List({
                collection: this.collection,
                canSearch: this.canSearch,
                templateItem: this.templateItem
            });

            this.render();
            this.updateButtons();
        },

        events: {
            "click ul.list li": "onClickListItem",
            "click .buttons .new": "onClickNewItem",
            "click .buttons .delete": "onClickDeleteItem",
            "click .buttons .save": "onClickSaveItem"
        },

        onClickListItem: function (ev) {
            var id = $(ev.currentTarget).data('rowid');
            var item = this.collection.findWhere({ id: id });
            item.fetch().done(_.bind(this.setItemInForm, this, item));
        },

        setItemInForm: function (item) {
            this.currentItem = item;
            this.updateButtons();

            form.fill(this.$form, item.attributes);
        },

        updateButtons: function () {
            var $btns = this.$('button.delete, button.new');

            if (!this.currentItem) {
                return $btns.hide();
            }

            $btns.show();
        },

        onClickNewItem: function () {
            this.currentItem = null;
            this.updateButtons();

            form.reset(this.$form);
        },

        onClickDeleteItem: function () {
        },

        onClickSaveItem: function () {
            if (!form.isValid(this.$formi, true)) {
                return;
            }

            var data = form.read(this.$form);
            var item = this.currentItem;

            if (!item) {
                item = new this.collection.model();
                this.collection.add(item);
            }

            item.set(data);
            item.save().done(_.bind(this.onSaveDone, this, item));
        },

        onSaveDone: function (item) {
            this.currentItem = item;
            form.fill(item);

            this.updateButtons();
        },

        render: function() {
            this.$el.html(this.template());

            this.$list = this.$('.container-list');
            this.$list.append(this.list.render().el);

            this.$form = this.$('.container-form');
            this.$form.html(this.templateForm());

            ship.form.applyMaskAndValidators(this.$('.container-form'));
        }
    });

    ship.components.EditDisplay = EditDisplay;

})(window);

(function(scope) {
    var ship = scope.ship;
    var Backbone = scope.Backbone;

    var defaultData = {
        aspectRatio: 1 / 1,
        strict: false,
        highlight: false,
        dragCrop: false,
        rotatable: false,
        zoomable: false,
        cropBoxMovable: true,
        cropBoxResizable: true,
        mouseWheelZoom: false,
        touchDragZoom: false,
        resizeX: 150,
        resizeY: 150
    };

    var ImageCropper = Backbone.View.extend({
        el: '.cropper-container',

        url: {
            upload: '/image/upload',
            crop: '/image/crop'
        },

        initialize: function(options) {
            this.$img = this.$('img');
            this.imageOptions = options || {}
            _.defaults(this.imageOptions, defaultData);
            this.$img.cropper(this.imageOptions);
        },

        uploadImage: function(postData, callback) {
            var $img = this.$img;
            var options = this.imageOptions;
            var $canvasImg = this.$('.cropper-canvas > img');
            var $viewBoxImg = this.$('.cropper-view-box > img');

            callback = callback || function() {};

            return $.ajax({
                url: this.url.upload,
                type: 'POST',
                data: new FormData(postData),
                cache: false,
                contentType: false,
                processData: false,

                error: function(err) {
                    console.log(err);
                },

                success: function(res) {
                    $img.cropper('destroy');
                    $img.attr('src', res.src);
                    $img.cropper(options);

                    callback();
                },

                xhr: function() {
                    var xhr = $.ajaxSettings.xhr();

                    if (xhr.upload) {
                        xhr.upload.addEventListener(
                            'progress',
                            function progressHandlingFunction(e) {
                                if (e.lengthComputable) {
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

        crop: function(callback) {
            var self = this;
            callback = callback || function() {};

            var data = this.$img.cropper('getData');
            data.src = this.$img.attr('src');
            data.resizeX = this.imageOptions.resizeX;
            data.resizeY = this.imageOptions.resizeY;

            return $.ajax({
                url: this.url.crop,
                type: 'POST',
                data: data,
                cache: false,

                success: function(res) {
                    self.dest = res.src;
                    callback(res);
                },

            });
        }
    });

    ship.components.ImageCropper = ImageCropper;

})(window);

(function(scope) {
    var _ = scope._;
    var JST = scope.JST;
    var ship = scope.ship;

    var ItemView = Backbone.View.extend({
        tagName: 'li',

        attributes: function () {
           if (this.model) {
               return { "data-rowid": this.model.get('id') };
           }
           return {};
        },

        initialize: function(options) {
            this.listenTo(this.model, 'change', this.render);
            this.listenTo(this.model, 'destroy', this.destroy);

            this.template = options.template;
        },

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });

    var List = Backbone.View.extend({
        tagName: 'div',
        template: JST['list'],
        limit: 100,

        events: {
            "keyup input[name='search']": "onSearchInputKeyUp"
        },

        initialize: function(options) {
            var collection = options.collection;
            this.listenTo(collection, 'add', this.addOne);
            this.listenTo(collection, 'reset', this.addAll);
            this.listenTo(collection, 'request', this.startRequest);
            this.listenTo(collection, 'sync', this.endRequest);

            this.templateItem = options.templateItem;
            this.canSearch = options.canSearch;
        },

        onSearchInputKeyUp: function () {
        },

        loadFirstPage: function () {
            this.page = 1;
            this.collection.fetch({
                data: $.param({
                    page: this.page,
                    limit: this.limit
                })
            });

            this.$loading.show();
        },

        loadNextPage: function () {
            this.page++;
            this.collection.fetch({
                remove: false,
                data: $.param({
                    page: this.page,
                    limit: this.limit
                })
            });

            this.$loading.show();
        },

        startRequest: function () {
        },

        endRequest: function () {
            this.$loading.hide();
        },

        render: function() {
            this.$el.append(this.template());
            this.$list = this.$('ul.list');
            this.$searchField = this.$('input[name="search"]');
            this.$loading = this.$('.list-loading');

            if (!this.canSearch) {
                this.$searchField.hide();
            }

            return this;
        },

        addOne: function(item) {
            var view = new ItemView({
                model: item,
                template: this.templateItem
            });

            this.$list.append(view.render().el);
        },

        addAll: function() {
            this.$list.html('');
            this.collection.each(this.addOne, this);
        },

        isScrollOnEnd: function() {
            var isEnded = false

            this.$el('.scrollable').on('scroll', function() {
                var $s = $(this);
                if ($s.scrollTop() + $s.innerHeight() >= this.scrollHeight) {
                    isEnded = true;
                }
            });

            return isEnded;
        }
    });

    ship.components.List = List;
})(window);

(function(scope) {
    var ship = scope.ship;
    var JST = scope.JST;

    ship.components.loading = {
        html: function(src, label) {
            return JST.loading({
                src: src,
                label: label
            });
        },

        show: function() {
            $('.ship-loader').show();
        },
        hide: function() {
            $('.ship-loader').hide();
        }
    };

})(window);
