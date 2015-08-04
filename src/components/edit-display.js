(function(scope) {
    var _ = scope._;
    var JST = scope.JST;
    var ship = scope.ship;
    var Display = ship.navigator.Display;

    var EditDisplay = Display.extend({
        name: 'edit',
        template: JST['edit-display'],

        constructor: function() {
            Display.apply(this, arguments);

            if (this.list) {
                this.list.remove();
            }

            this.list = new ship.components.List({
                collection: this.collection,
                canSearch: this.canSearch,
                templateItem: this.templateItem
            });

            this.render();
        },

        events: {
            "click ul.list li": "onClickListItem",
            "click .buttons .new": "onClickNewItem",
            "click .buttons .delete": "onClickDeleteItem",
            "click .buttons .save": "onClickSaveItem"
        },

        onClickListItem: function (ev) {
            var id = $(ev.currentTarget).data('rowid');
            var item = this.list.collection.findWhere({ id: id });

            item.fetch().done(_.bind(this.setItemInForm, this, item));
        },

        setItemInForm: function (item) {
            console.log(item.get('id'));
        },

        onClickNewItem: function () {
        },

        onClickDeleteItem: function () {
        },

        onClickSaveItem: function () {
        },

        render: function() {
            this.$el.html(this.template());
            this.$('.container-list').append(this.list.render().el);
            this.$('.container-form').html(this.templateForm());
            ship.form.applyMaskAndValidators(this.$('.container-form'));
        }
    });

    ship.components.EditDisplay = EditDisplay;

})(window);
