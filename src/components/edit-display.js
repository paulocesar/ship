(function(scope) {
    var JST = scope.JST;
    var ship = scope.ship;
    var Display = ship.navigator.Display;

    var EditDisplay = Display.extend({
        name: 'edit',
        template: JST['edit-display'],

        events: {
            "click ul.list li": "onClickListItem",
            "click .buttons .new": "onClickNewItem",
            "click .buttons .delete": "onClickDeleteItem",
            "click .buttons .save": "onClickSaveItem"
        },

        onClickListItem: function () {

        },

        onClickNewItem: function () {

        },

        onClickDeleteItem: function () {

        },

        onClickSaveItem: function () {

        },

        start: function(options) {
            this.templateForm = options.templateForm;

            this.list = new ship.components.List({
                collection: options.collection,
                templateItem: options.templateItem
            });

            this.render();
        },

        render: function() {
            this.$el.html(this.template());
            this.$('.container-list').append(this.list.render().el);
            this.$('.container-form').html(this.templateForm());
        }
    });

    ship.components.EditDisplay = EditDisplay;

})(window);
