(function(scope) {
    var _ = scope._;
    var JST = scope.JST;
    var ship = scope.ship;
    var form = ship.form;
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
            this.updateButtons();
        },

        events: {
            "click ul.list li": "onClickListItem",
            "click .buttons .new": "onClickNewItem",
            "click .buttons .delete": "onClickDeleteItem",
            "click .buttons .save": "onClickSaveItem"
        },

        onClickListItem: function (ev) {
            var id = $(ev.currentTarget).data('rowid');
            var item = this.collection.findWhere({ id: id });
            item.fetch().done(_.bind(this.setItemInForm, this, item));
        },

        setItemInForm: function (item) {
            this.currentItem = item;
            this.updateButtons();

            form.fill(this.$form, item.attributes);
        },

        updateButtons: function () {
            var $btns = this.$('button.delete, button.new');

            if (!this.currentItem) {
                return $btns.hide();
            }

            $btns.show();
        },

        onClickNewItem: function () {
            this.currentItem = null;
            this.updateButtons();

            form.reset(this.$form);
        },

        onClickDeleteItem: function () {
        },

        onClickSaveItem: function () {
            if (!form.isValid(this.$formi, true)) {
                return;
            }

            var data = form.read(this.$form);
            var item = this.currentItem;

            if (!item) {
                item = new this.collection.model();
                this.collection.add(item);
            }

            item.set(data);
            item.save().done(_.bind(this.onSaveDone, this, item));
        },

        onSaveDone: function (item) {
            this.currentItem = item;
            form.fill(item);

            this.updateButtons();
        },

        render: function() {
            this.$el.html(this.template());

            this.$list = this.$('.container-list');
            this.$list.append(this.list.render().el);

            this.$form = this.$('.container-form');
            this.$form.html(this.templateForm());

            ship.form.applyMaskAndValidators(this.$('.container-form'));
        }
    });

    ship.components.EditDisplay = EditDisplay;

})(window);
