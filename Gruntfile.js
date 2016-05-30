'use strict';

module.exports  = function ( grunt ) {

    var appConfig   = {
        app         : 'app',
        dist        : 'dist',
        livereload  : 35729
    };

    require( 'load-grunt-tasks' )( grunt );
    require( 'time-grunt' )( grunt );

    grunt.initConfig({
        config          : appConfig,
        cdnify          : {
            dist    : {
                html    : '<%= config.dist %>/*.html'
            }
        },
        concurrent      : {
            dist    : [
                'less',
                'imagemin',
                'svgmin'
            ],
            server  : [
                'less'
            ]
        },
        connect         : {
            options : {
                port            : 9000,
                hostname        : 'localhost',
                livereload      : '<%= config.livereload %>'
            },
            dev     : {
                options         : {
                    open        : true,
                    middleware  : function ( connect ) {
                        return [
                            connect().use( '/bower_components', connect.static( './bower_components' ) ),
                            connect().use( '/fonts', connect.static( './bower_components/bootstrap/fonts' ) ),
                            connect.static( appConfig.app )
                        ];
                    }
                }
            }
        },
        copy            : {
            dist    : {
                files   : [{
                    expand  : true,
                    dot     : true,
                    cwd     : '<%= config.app %>',
                    dest    : '<%= config.dist %>',
                    src     : [
                        '*.{ico,png,txt}',
                        '.htaccess',
                        '*.html',
                        'img/{,*/}*.*',
                        'css/{,*/}*.css'
                    ]
                }, {
                    expand  : true,
                    flatten : true,
                    cwd     : '.',
                    src     : 'bower_components/bootstrap/fonts/*',
                    dest    : '<%= config.dist %>/fonts'
                }, {
                    expand  : true,
                    cwd     : '.',
                    src     : [
                        'bower_components/polymer/polymer.html',
                        'bower_components/polymer/polymer-mini.html',
                        'bower_components/polymer/polymer-micro.html'
                    ],
                    dest    : '<%= config.dist %>'
                }, {
                    expand  : true,
                    cwd     : '.',
                    src     : 'bower_components/dgm-navbar/dgm-navbar.html',
                    dest    : '<%= config.dist %>'
                }, {
                    expand  : true,
                    cwd     : '.',
                    src     : 'bower_components/dgm-footer/dgm-footer.html',
                    dest    : '<%= config.dist %>'
                }]
            }
        },
        clean           : {
            dist: {
                files: [{
                    dot : true,
                    src : [
                        '.tmp',
                        '<%= config.dist %>/{,*/}*',
                        '!<%= config.dist %>/.git{,*/}*'
                    ]
                }]
            },
            server  : [
                '.tmp'
            ]
        },
        filerev         : {
            dist    : {
                src : [
                    '<%= config.dist %>/js/vendor.js',
                    '<%= config.dist %>/css/{,*/}*.css',
                    '<%= config.dist %>/img/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },
        htmlmin         : {
            dist    : {
                options: {
                    collapseWhitespace          : true,
                    conservativeCollapse        : true,
                    collapseBooleanAttributes   : true,
                    removeCommentsFromCDATA     : true,
                    removeOptionalTags          : true
                },
                files   : [{
                    expand  : true,
                    cwd     : '<%= config.dist %>',
                    src     : [
                        '*.html'
                    ],
                    dest    : '<%= config.dist %>'
                }]
            }
        },
        imagemin        : {
            dist    : {
                files   : [{
                    expand  : true,
                    cwd     : '<%= config.app %>/img',
                    src     : '{,*/}*.{png,jpg,jpeg,gif,ico}',
                    dest    : '<%= config.dist %>/img'
                }]
            }
        },
        less            : {
            development : {
                options : {
                    compress        : true,
                    yuicompress     : true,
                    optimization    : 2
                },
                files   : {
                    '<%= config.app %>/css/style.css'   : '<%= config.app %>/less/style.less'
                }
            }
        },
        postcss         : {
            options : {
                map         : false,
                processors  : [
                    require( 'autoprefixer-core' )({
                        browsers    : 'last 8 versions'
                    })
                ]
            },
            dist    : {
                src : '<%= config.app %>/css/*.css'
            }
        },
        svgmin          : {
            dist    : {
                files   : [{
                    expand  : true,
                    cwd     : '<%= config.app %>/img',
                    src     : '{,*/}*.svg',
                    dest    : '<%= config.dist %>/img'
                }]
            }
        },
        usemin          : {
            html    : [
                '<%= config.dist %>/{,*/}*.html',
                '<%= config.dist %>/partials/{,*/}*.html'
            ],
            css     : [
                '<%= config.dist %>/css/{,*/}*.css'
            ],
            options : {
                assetsDirs  : [
                    '<%= config.dist %>',
                    '<%= config.dist %>/img',
                    '<%= config.dist %>/css'
                ]
            }
        },
        useminPrepare   : {
            html    : '<%= config.app %>/index.html',
            options : {
                dest    : '<%= config.dist %>',
                flow    : {
                    html: {
                        steps   : {
                            js  : ['concat', 'uglify'],
                            css : ['cssmin']
                        },
                        post: {}
                    }
                }
            }
        },
        watch           : {
            styles      : {
                files   : [ '<%= config.app %>/less/**/*.less' ],
                tasks   : [ 'less', 'postcss' ],
                options : {
                    spawn       : false,
                    livereload  : '<%= config.livereload %>'
                }
            },
            js          : {
                files   : [ '<%= config.app %>/js/**/*.js' ],
                options : {
                    spawn       : false,
                    livereload  : '<%= config.livereload %>'
                }
            },
            livereload  : {
                options : {
                    livereload  : '<%= config.livereload %>'
                },
                files   : [
                    '<%= config.app %>/{,*/}*.html',
                    '<%= config.app %>/partials/{,*/}*.html'
                ]
            }
        },
        wiredep         : {
            app : {
                src         : [ '<%= config.app %>/index.html' ],
                exclude     : [ 'require.js' ],
                ignorePath  :  /\.\.\//
            }
        }
    });

    grunt.registerTask( 'build', [
        'clean:dist',
        'wiredep',
        'useminPrepare',
        'concurrent:dist',
        'postcss',
        'concat',
        'copy:dist',
        'cdnify',
        'uglify',
        'filerev',
        'usemin',
        'htmlmin'
    ]);
    grunt.registerTask( 'serve', [
        'clean:server',
        'wiredep',
        'concurrent:server',
        'postcss',
        'connect:dev',
        'watch'
    ]);
};