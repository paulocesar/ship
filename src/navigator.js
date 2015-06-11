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

	ship.navigator = {
		router: router,

		go: function (name) { router.goToPage(name); },

		addDisplay: function (DisplayClass) {
			var d = new DisplayClass();
			displaysByName[d.name] = d;
		},

		addDisplays: function(displays) {
			_.each(displa, function (DisplayClass) {
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