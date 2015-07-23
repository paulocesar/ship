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
        isStarted: false,

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

            if (this.isStarted) { return; }

			Backbone.history.start();
			this.router = new Router();
            this.isStarted = true;
		}
	};

})(window);
