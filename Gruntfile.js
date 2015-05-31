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
                    'src/index.js'
                ],
                dest: 'ship.js'
            }
        },

        uglify: {
            prod: {
                files: {
                    'ship.min.js': [ 'ship.js' ]
                }
            }
        },

        karma: {
            unit: {
                configFile: 'karma.conf.js'
            }
        },

        mochaTest: {
            test: {
                options: {
                    reporter: 'spec',
                    require: 'should',
                    colors: true,
                    bail: true
                },
                src: [ 'specs/*.spec.js' ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-mocha-test');

    grunt.registerTask('default', [ 'concat', 'uglify:prod', 'test' ]);
    grunt.registerTask('test', [ 'karma:unit', 'mochaTest:test' ]);
};
