(function (scope) {
    var _ = scope._;
    var JST = scope.JST;
    var ship = scope.ship;

    var ItemView = Backbone.View.extend({
        tagName: 'li',
        template: JST["list-item"],

        initialize: function (options) {
            this.listenTo(this.model, 'change', this.render);
            this.listenTo(this.model, 'destroy', this.destroy);

            this.displayFields = options.displayFields
                || _.keys(this.model.attributes);
        },

        render: function () {
            this.$el.html(this.template({
                model: this.model.toJSON(),
                displayFields: this.displayFields
            }));
            return this;
        }
    });

    var ListView = Backbone.View.extend({
        tagName: 'ul',
        className: 'list',

        initialize: function (options) {
            var collection = options.collection;
            this.listenTo(collection, 'add', this.addOne);
            this.listenTo(collection, 'reset', this.addAll);

            this.displayFields = options.displayFields;
        },

        addOne: function (item) {
            var view = new ItemView({
                model: item,
                displayFields: this.displayFields
            });

            this.$el.append(view.render().el);
        },

        addAll: function () {
            this.$el.html('');
            this.collection.each(this.addOne, this);
        }
    });

    var AsyncList = Backbone.View.extend({
        tagName: 'div',
        className: 'scroll-wrapper',
        template: JST['list-async'],

        initialize: function (options) {
            this.listView = new ListView(options);
        },

        render: function () {
            this.$el.append(this.template());
            this.listView.setElement(this.$('ul.list'));
            return this;
        },

        isScrollOnEnd: function () {
            var isEnded = false

            this.$el('.scrollable').on('scroll', function() {
                var $s = $(this);
                if($s.scrollTop() + $s.innerHeight() >= this.scrollHeight) {
                    isEnded = true;
                }
            });

            return isEnded;
        },

        showLoading: function () {
            this.$('list-loading').show();
        },

        hideLoading: function () {
            this.$('list-loading').hide();
        }
    });

    ship.components.ListView = ListView;
    ship.components.AsyncList = AsyncList;
})(window);
