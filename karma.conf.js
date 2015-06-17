module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: [ 'mocha' ],
        files: [
            'node_modules/jquery/dist/jquery.js',
            'node_modules/underscore/underscore.js',
            'node_modules/backbone/backbone.js',
            'node_modules/bootstrap/dist/js/bootstrap.js',
            'node_modules/moment/moment.js',
            'node_modules/moment/locale/br.js',
            'node_modules/jquery-maskmoney/dist/jquery.maskMoney.js',
            'ship.js',
            'node_modules/should/should.js',
            'specs/**/*.spec.js'
        ],
        exclude: [ ],
        reporters: [ 'progress' ],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        authWatch: false,
        browsers: [ 'Chrome' ],
        captureTimeout: 60000,
        singleRun: true
    });
};
