var $form = null;
var $field = null;

var removeForm = function() {
    if (!$form) {
        return;
    }

    $form.remove();
    $form = null;
    $field = null;
};

var createForm = function(cls) {
    removeForm();

    $('body').append([
        "<div id='validatorInputForm'>",
        "<input id='validatorInput' class='" + cls + "' type='text' />",
        "</div>"
    ].join(''));

    $form = $('#validatorInputForm');
    $field = $form.find('#validatorInput');
};

describe('ship field validator', function() {

    after(function() {
        removeForm();
    });

    it('should not show "not empty" error', function() {
        createForm('not-empty');

        ship.fieldValidator.apply($form);
        $field.focusin().val('hello').focusout();

        $form.find('.error-message').length.should.eql(0);

        removeForm();
    });


    it('should show "not empty" error', function() {
        createForm('not-empty');

        ship.fieldValidator.apply($form);
        $field.focusin().focusout();

        $form.find('.error-message')
            .html().should.match(/ser vazio/);

        removeForm();
    });

    it('should show "not zero" error', function() {
        createForm('not-zero');

        ship.fieldValidator.apply($form);
        $field.focusin().val(0).focusout();

        $form.find('.error-message')
            .html().should.match(/ser zero/);

        removeForm();
    });

});
