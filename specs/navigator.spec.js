var $display = null;

var removeDisplay = function() {
    if (!$display) {
        return;
    }

    $display.remove();
    $display = null;
};

var createDisplay = function(cls) {
    removeDisplay();

    $('body').append([
        '<div id="display-ship" class="display"><h1>SHIP</h1></div>',
        '<script type="text/template" id="tpl-display-ship-boat">',
        '<h1>BOAT</h1>',
        '</script>',
        '<script type="text/template" id="tpl-display-ship-pirate">',
        '<h1>PIRATE <%= num %></h1>',
        '</script>'
    ].join(''));
};

describe('ship field validator', function() {

    after(function() {
        removeDisplay();
    });

    it('should create a display and navigate', function() {
        createDisplay();

        var ShipDisplay = ship.navigator.Display.extend({
            name: 'ship'
        });

        ship.navigator.start([ShipDisplay])
        ship.navigator.go('ship');

        var s = ship.navigator.getDisplay('ship');
        s.$el.append(s.tpls.boat());
        s.$el.append(s.tpls.pirate({
            num: 1
        }));
        s.$el.html().should.eql('<h1>SHIP</h1><h1>BOAT</h1><h1>PIRATE 1</h1>');
    });
});
