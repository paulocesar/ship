var count = 0;

var Model = Backbone.Model.extend({
    defaults: function() {
        count++;
        return {
            id: count,
            name: 'Model ' + count
        };
    },
});

var Collection = Backbone.Collection.extend({
    model: Model,
});

var c = new Collection();
c.add([new Model(), new Model()]);

$('body').append("<div id='display-edit' class='display'></div>")

describe('ship edit display', function() {
    it('should create a editable display', function() {

        var ShipEditDisplay = ship.components.EditDisplay.extend({
            name: 'edit',
            collection: c,
            templateForm: _.template("<input name='name' type='text' />"),
            templateItem: _.template("<span><%= name %></span>")
        });

        ship.navigator.start([ShipEditDisplay]);
        ship.navigator.go('edit');

        var d = ship.navigator.getDisplay('edit');
        d.render();
        d.list.addAll();
        console.log(d.$el.html());
    });
});
