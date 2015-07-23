(function (scope) {
    var JST = scope.JST;
    var ship = scope.ship;
    var Display = ship.navigator.Display;

    var EditDisplay = Display.extend({
        template: JST['edit-display'],

        initialize: function (options) {
            this.list = new ship.components.List({
                collection: this.collection,
                templateItem: this.templateItem
            });
        },

        render: function () {
            this.$el.html(this.template());
            this.$('.container-list').append(this.list.render().el);
            this.$('.container-form').html(this.templateForm());
        }
    });

    ship.components.EditDisplay = EditDisplay;

})(window);
