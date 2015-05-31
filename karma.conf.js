module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: [ 'mocha' ],
        files: [
            'node_modules/underscore/underscore.js',
            'node_modules/backbone/backbone.js',
            'ship.js',
            'node_modules/should/should.js',
            'specs/*.spec.js'
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
