var $display = null;

var removeDisplay = function () {
	if (!$display) { return; }

	$display.remove();
	$display = null;
};

var createDisplay = function (cls) {
	removeDisplay();

	$('body').append([
		'<div id="display-ship" class="display"></div>',
		'<script type="text/template" id="tpl-display-ship">',
			'<h1>SHIP</h1>',
			'<%= subTpls.boat() %>',
		'</script>',
		'<script type="text/template" id="subTpl-display-ship-boat">',
			'<h1>BOAT</h1>',
		'</script>'
	].join(''));
};

describe('ship field validator', function () {

	after(function () { removeDisplay(); });

	it('should create a display and navigate', function () {
		createDisplay();

		var ShipDisplay = ship.navigator.Display.extend({
			name: 'ship'
		});

		ship.navigator.start([ ShipDisplay ])
		ship.navigator.go('ship');
	});
});
