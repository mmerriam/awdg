module.exports = function(grunt) {
    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
    grunt.initConfig({
        pkg: grunt.file.readJSON('bower.json'),
        dir: {
            publish: 'public',
            theme: 'client/theme',
            build: 'client/.build',
            vendor: {
                bower: 'bower_components'
            }
        },

        // Javascript processing
        // minify to build then uglify to publish
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= pkg.version %> */\n'
            },
            libs: {
                files: {
                    '<%= dir.publish %>/js/libs.min.js': [
                        '<%= dir.vendor.bower %>/jquery/dist/jquery.min.js',
                        '<%= dir.vendor.bower %>/bootstrap-sass-official/assets/javascripts/bootstrap.js',
                        '<%= dir.vendor.bower %>/lodash/dist/lodash.min.js',
                        '<%= dir.vendor.bower %>/pickadate/lib/picker.js',
                        '<%= dir.vendor.bower %>/pickadate/lib/picker.date.js',
                        '<%= dir.vendor.bower %>/pickadate/lib/picker.time.js',
                        '<%= dir.vendor.bower %>/pickadate/lib/legacy.js',
                        '<%= dir.vendor.bower %>/typeahead/dist/typeahead.bundle.min.js',
                        '<%= dir.vendor.bower %>/moment/moment.js',
                        '<%= dir.vendor.bower %>/moment/moment-timezone.js'
                    ]
                }
            },
            theme: {
                files: [{
                    expand: true,
                    cwd: '<%= dir.theme %>/javascripts',
                    src: '**/*.js',
                    dest: '<%= dir.publish %>/js'
                }]
            }
        },

        // stylesheet processing
        // compile sass to build,
        sass: {
            dist: {
                files: {
                    '<%= dir.build %>/stylesheets/<%= pkg.name %>.css': '<%= dir.theme %>/stylesheets/<%= pkg.name %>.scss',
                }
            }
        },
        // css minify to publish
        cssmin: {
            publish: {
                options: {
                    banner: '/*! <%= pkg.name %> <%= pkg.version %> */',
                    keepSpecialComments: 0
                },
                files: {
                    '<%= dir.publish %>/<%= pkg.name %>.min.css': [
                        '<%= dir.build %>/stylesheets/<%= pkg.name %>.css',
                        '<%= dir.vendor.bower %>/pickadate/lib/themes/classic.css',
                        '<%= dir.vendor.bower %>/pickadate/lib/themes/classic.date.css',
                        '<%= dir.vendor.bower %>/pickadate/lib/themes/classic.time.css',
                        '<%= dir.vendor.bower %>/pickadate/lib/themes/rtl.css'
                    ]
                }
            }
        },

        // copy images and fonts that don't need processing
        copy: {
            libs: {
                files: [{
                    expand: true,
                    flatten: true,
                    src: ['<%= dir.vendor.bower %>/**/{*.png,*.jpg,*.gif}'],
                    dest: '<%= dir.publish %>/img',
                    filter: 'isFile'
                }, {
                    expand: true,
                    flatten: true,
                    src: ['<%= dir.vendor.bower %>/**/{*.eot,*.svg,*.ttf,*.woff,*.otf}'],
                    dest: '<%= dir.publish %>/fonts',
                    filter: 'isFile'

                }]
            },
            theme: {
                files: [{
                    expand: true,
                    flatten: true,
                    src: ['<%= dir.theme %>/images/**'],
                    dest: '<%= dir.publish %>/img',
                    filter: 'isFile'
                }, {
                    expand: true,
                    flatten: true,
                    src: ['<%= dir.theme %>/fonts/**'],
                    dest: '<%= dir.publish %>/fonts',
                    filter: 'isFile'

                }]
            }
        },

        // always clean up the build and publish dirs
        clean: {
            build: ['<%= dir.build %>/'],
            publish: [
                '<%= dir.publish %>/<%= pkg.name %>.min.css',
                '<%= dir.publish %>/js',
                '<%= dir.publish %>/fonts',
                '<%= dir.publish %>/img',
            ]
        },

        // keeping 'em on the straight and narrow
        jshint: {
            files: ['gruntfile.js', '<%= dir.theme %>/javascript/**/*.js'],
            options: {
                // options here to override JSHint defaults
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true
                }
            }
        },
        watch: {
            css: {
                files: ['<%= dir.theme %>/stylesheets/**/*'],
                tasks: ['sass', 'cssmin'],
            },
            assets: {
                files: ['<%= dir.theme %>/images/**/*', '<%= dir.theme %>/fonts/**/*'],
                tasks: ['copy'],
            },
            scripts: {
                files: ['<%= dir.theme %>/javascript/**/*'],
                tasks: ['uglify'],
            },
        },
        nodemon: {
            dev: {
                script: './bin/www'
            }
        },
        concurrent: {
            dev: {
                tasks: ['nodemon', 'watch'],
                options: {
                    logConcurrentOutput: true
                }
            }
        },

    });

    grunt.registerTask('default', ['jshint', 'clean', 'sass', 'cssmin', 'uglify', 'copy']);
    grunt.registerTask('develop', ['default', 'concurrent:dev']);
};