var field = null;

var addField = function () {
	$(body).append("<input id='validatorInput' type='text'>");
	field = $('#validatorInput');
};

var removeField = function () { field.remove(); };

describe('ship field validator', function () {
	it('apply validator', function () {

	});

	it('clear validator', function () {

	});
});