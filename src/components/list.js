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
        }
    });

    // TODO: MERGE ListView and AsyncList
    var List = Backbone.View.extend({
        tagName: 'div',
        className: 'scroll-wrapper',
        template: JST['list-async'],

        initialize: function (options) {
            var collection = options.collection;
            this.listenTo(collection, 'add', this.addOne);
            this.listenTo(collection, 'reset', this.addAll);

            this.displayFields = options.displayFields;
        },

        render: function () {
            this.$el.append(this.template());
            this.$list = this.$('ul.list');
            this.$loading = this.$('list-loading');
            return this;
        },

        addOne: function (item) {
            var view = new ItemView({
                model: item,
                displayFields: this.displayFields
            });

            this.$list.append(view.render().el);
        },

        addAll: function () {
            this.$list.html('');
            this.collection.each(this.addOne, this);
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

        showLoading: function () { this.$loading.show(); },
        hideLoading: function () { this.$loading.hide(); }
    });

    ship.components.List = List;
})(window);
