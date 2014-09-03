module.exports = function(grunt) {

    // configure the tasks
    grunt.initConfig({

        copy: {
            build: {
                cwd: 'src',
                src: [ '**' ],
                dest: 'dist',
                expand: true
            },
        },

        clean: {
            build: {
                src: [ 'dist' ]
            },
        },

        jshint: {
            all: {
                src: [
                     "src/*.js", "Gruntfile.js"
                ]
            }
        },

        uglify : {
            all: {
                options: {
                    mangle: false
                },
                files: {
                    "dist/on-screen-keyboard.min.js": [ "dist/on-screen-keyboard.js" ]
                }
            }
        }

    });

    // load the tasks
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask(
        'build',
        'Compiles all of the assets and copies the files to the build directory.',
        [ 'clean', 'jshint', 'copy', 'uglify' ]
    );

    grunt.registerTask(
        'default',
        'Watches the project for changes, automatically builds them and runs a server.',
        [ 'build' ]
    );

};