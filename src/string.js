(function(scope) {
    var ship = scope.ship;
    var $ = scope.$;

    var str = ship.string = {};

    str.firstToLower = function(str) {
        return str.charAt(0).toLowerCase() + str.slice(1);
    };

    var rgxWhitespace = /[\s]+/g
    var rgxTag = /\<[^>]*\>/g
    var rgxUnwatedChars = /[,.$-]/g

    str.sanitize = function(str) {
        return $.trim(
            str.replace(rgxWhitespace, ' ')
            .replace(rgxTag, '')
            .replace(rgxUnwatedChars, '')
        );
    };

})(window);
