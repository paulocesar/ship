var count = 0;

var Model = Backbone.Model.extend({
    defaults: function () {
        count++;
        return { id: count, name: 'Model ' + count };
    }
});

var Collection = Backbone.Collection.extend({ model: Model });

var c = new Collection();
c.add([ new Model(), new Model() ]);

describe('ship component list', function () {

    it('should create a listView', function () {
        var list = new ship.components.ListView({
            collection: c,
            displayFields: [ 'name' ]
        });

        $('body').append(list.el);
        list.addAll();

        console.log(list.$el.html());
    });

    it('should create an async list', function () {
        var asyncList = new ship.components.AsyncList({
            collection: c,
            displayFields: [ 'name' ]
        });

        $('body').append(asyncList.render().el);
        asyncList.listView.addAll();

        console.log(asyncList.$el.parent().html());
    });

});
