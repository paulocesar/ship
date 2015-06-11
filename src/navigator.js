(function (scope) {
	var ship = scope.ship;

	var Backbone = scope.Backbone;
	var $ = scope.$;
	var _ = scope._;

	var displaysByName = {};
	var previousPage = '';

	var router = Backbone.Router.extend({
		routes: {
			"/:name/:id": "goToPage"
		},

		goToPage: function (name, id) {
			if (previousPage === name || !displaysByName[name]) {
				return;
			}

			if (previousPage) {
				displaysByName[previousPage].onHide();
			}

			$('.display').hide();
			$('#diplay-' + name).show();

			displaysByName[name].onShow(id);

			previousPage = name;
		}
	});

	var Display = Backbone.View.extend({
		subTemplates: { },

		constructor: function () {
			if (typeof this.name === 'string') {
				throw new Error("You must set a name to display class");
			}

			var name = this.name;

			this.el = "#display-" + name;
			this.template = _.template($("#tpl-display-" + name).html());

			Backbone.View.apply(this, arguments);

			this.render();
			ship.fieldValidator.apply(this.$el);
		},

		$f: function (name) {
			return this.$("[name='" + name + "']");
		},

		render: function () {
			this.$el.html(this.template({
				subTemplates: this.subTemplates
			}));
		},

		onShow: function () {

		},

		onHide: function () {

		},

		show: function () { this.$el.show(); },
		hide: function () { this.$el.hide(); }
	});

	ship.navigator = {
		router: router,
		Display: Display,

		go: function (name) { router.goToPage(name); },

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
			ship.navigator.addDisplays(displays);
			Backbone.history.start();
		}
	};

})(window);