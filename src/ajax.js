(function(scope) {
    var ship = scope.ship;
    var $ = scope.$;

    $.ajaxSetup({ cache: false });

    ship.ajax = function (method, url, data) {
        return $.ajax(url, {
            method: method,
            data: JSON.stringify(data),
            cache: false
        });
    };

    ship.get = function (url, data) {
        return this.ajax('get', url, data);
    };

    ship.post = function (url, data) {
        return this.ajax('post', url, data);
    };

    ship.eval = function (data) {
        return (new Function("return " + data + ";"))();
    };


})(window);
