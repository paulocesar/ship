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

    it('should create a list', function () {
        var list = new ship.components.List({
            collection: c,
            templateItem: _.template("<span><%= name %></span>")
        });

        $('body').append(list.render().el);
        list.addAll();

        list.$('li').length.should.eql(2);
    });

});
