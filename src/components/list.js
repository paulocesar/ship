(function(scope) {
    var _ = scope._;
    var JST = scope.JST;
    var ship = scope.ship;

    var ItemView = Backbone.View.extend({
        tagName: 'li',

        initialize: function(options) {
            this.listenTo(this.model, 'change', this.render);
            this.listenTo(this.model, 'destroy', this.destroy);

            this.template = options.template;
        },

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });

    var List = Backbone.View.extend({
        tagName: 'div',
        className: 'scroll-wrapper',
        template: JST['list'],

        initialize: function(options) {
            var collection = options.collection;
            this.listenTo(collection, 'add', this.addOne);
            this.listenTo(collection, 'reset', this.addAll);

            this.templateItem = options.templateItem;
        },

        render: function() {
            this.$el.append(this.template());
            this.$list = this.$('ul.list');
            this.$loading = this.$('list-loading');
            return this;
        },

        addOne: function(item) {
            var view = new ItemView({
                model: item,
                template: this.templateItem
            });

            this.$list.append(view.render().el);
        },

        addAll: function() {
            this.$list.html('');
            this.collection.each(this.addOne, this);
        },

        isScrollOnEnd: function() {
            var isEnded = false

            this.$el('.scrollable').on('scroll', function() {
                var $s = $(this);
                if ($s.scrollTop() + $s.innerHeight() >= this.scrollHeight) {
                    isEnded = true;
                }
            });

            return isEnded;
        },

        showLoading: function() {
            this.$loading.show();
        },
        hideLoading: function() {
            this.$loading.hide();
        }
    });

    ship.components.List = List;
})(window);
