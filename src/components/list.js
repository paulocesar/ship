(function(scope) {
    var _ = scope._;
    var JST = scope.JST;
    var ship = scope.ship;

    var ItemView = Backbone.View.extend({
        tagName: 'li',

        attributes: function () {
           if (this.model) {
               return { "data-rowid": this.model.get('_id') };
           }
           return {};
        },

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
        template: JST['list'],
        limit: 100,

        events: {
            "keyup input[name='search']": "onSearchInputKeyUp"
        },

        initialize: function(options) {
            var collection = options.collection;
            this.listenTo(collection, 'add', this.addOne);
            this.listenTo(collection, 'reset', this.addAll);
            this.listenTo(collection, 'request', this.startRequest);
            this.listenTo(collection, 'sync', this.endRequest);

            this.templateItem = options.templateItem;
            this.canSearch = options.canSearch;
        },

        onSearchInputKeyUp: function () {
        },

        loadFirstPage: function () {
            this.page = 0;
            this.collection.fetch({
                data: $.param({
                    page: this.page,
                    limit: this.limit
                })
            });

            this.$loading.show();
        },

        loadNextPage: function () {
            this.page++;
            this.collection.fetch({
                remove: false,
                data: $.param({
                    page: this.page,
                    limit: this.limit
                })
            });

            this.$loading.show();
        },

        startRequest: function () {
        },

        endRequest: function () {
            this.$loading.hide();
        },

        render: function() {
            this.$el.append(this.template());
            this.$list = this.$('ul.list');
            this.$searchField = this.$('input[name="search"]');
            this.$loading = this.$('.list-loading');

            if (!this.canSearch) {
                this.$searchField.hide();
            }

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
        }
    });

    ship.components.List = List;
})(window);
