module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jst: {
            compile: {
                options: {
                    processName: function(filePath) {
                        return filePath
                            .replace('src/templates/', '')
                            .replace('.html', '');
                    }
                },
                files: {
                    'src/templates.js': ['src/templates/**/*.html']
                }
            }
        },

        cssmin: {
            target: {
                files: {
                    'prod/ship.min.css': [
                        'node_modules/bootstrap/dist/css/bootstrap.css',
                        'node_modules/cropper/dist/cropper.css',
                        'ship.css'
                    ]
                }
            }
        },

        concat: {
            options: {
                stripBanners: true,
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                    '<%= grunt.template.today("yyyy-mm-dd") %> */\n',
            },

            dist: {
                src: [
                    'src/templates.js',
                    'src/index.js',
                    'src/string.js',
                    'src/ajax.js',
                    'src/money.js',
                    'src/field-validator.js',
                    'src/navigator.js',
                    'src/field-mask.js',
                    'src/form.js',
                    'src/components/**/*.js'
                ],
                dest: 'ship.js'
            }
        },

        uglify: {
            prod: {
                files: {
                    'prod/ship.min.js': [
                        'node_modules/jquery/dist/jquery.js',
                        'node_modules/underscore/underscore.js',
                        'node_modules/backbone/backbone.js',
                        'node_modules/bootstrap/dist/js/bootstrap.js',
                        'node_modules/moment/moment.js',
                        'node_modules/moment/locale/br.js',
                        'node_modules/jquery-maskmoney/dist/jquery.maskMoney.js',
                        'node_modules/cropper/dist/cropper.js',
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
    grunt.loadNpmTasks('grunt-contrib-jst');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask('default', ['cssmin', 'jst', 'concat', 'test', 'uglify:prod']);
    grunt.registerTask('test', ['karma:unit']);
    grunt.registerTask('build', ['cssmin', 'jst', 'concat', 'uglify:prod']);
};
