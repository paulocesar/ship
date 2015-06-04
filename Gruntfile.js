module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            options: {
                stripBanners: true,
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                    '<%= grunt.template.today("yyyy-mm-dd") %> */\n',
            },

            dist: {
                src: [
                    'src/index.js',
                    'src/ajax.js',
                    'src/money.js'
                ],
                dest: 'ship.js'
            }
        },

        uglify: {
            prod: {
                files: {
                    'prod/ship.min.js': [
                        'node_modules/underscore/underscore.js',
                        'node_modules/jquery/dist/jquery.js',
                        'node_modules/backbone/backbone.js',
                        'node_modules/jquery-maskmoney/dist/jquery.maskMoney.js',
                        'node_modules/moment/moment.js',
                        'node_modules/moment/locale/br.js',
                        'ship.js'
                    ]
                }
            }
        },

        karma: {
            unit: {
                configFile: 'karma.conf.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask('default', [ 'concat', 'test', 'uglify:prod' ]);
    grunt.registerTask('test', [ 'karma:unit' ]);
};
