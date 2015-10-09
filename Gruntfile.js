'use strict';

module.exports = function(grunt) {
	grunt.initConfig({
		clean: {
			css: {
				src: ['_build/out/css']
			},
			js: {
				src: ['_build/out/js']
			},
			font: {
				src: ['_build/out/fonts']
			}
		},
		jshint: {
			server: {
				src: [
					'index.js',
					'server/**/*.js'
				],
				options: {
					jshintrc: '_grunt/.jshintrc-server'
				}
			},
			browserify: {
				src: [
					'injection/**/*.js',
					'admin/**/*.js'
				],
				options: {
					jshintrc: '_grunt/.jshintrc-browserify'
				}
			},
			client: {
				src: [
					'client/**/*.js',
					'public/js/**/*.js',
				],
				options: {
					jshintrc: '_grunt/.jshintrc-client'
				}
			}
		},
		jscs: {
			options: {
				config: '_grunt/.jscsrc'
			},
			server: {
				src: [
					'Gruntfile.js',
					'<%= jshint.server.src %>'
				]
			},
			client: {
				src: '<%= jshint.client.src %>'
			},
			browserify: {
				src: '<%= jshint.browserify.src %>'
			}
		},
		browserify: {
			injection: {
				options: {
					watch: true
				},
				files: {
					'_build/out/js/inject.js': [
						'injection/context.js',
						'injection/**/*.js'
					]
				}
			},
			admin: {
				options: {
					watch: true,
					alias: {
						'app': './admin/app.js',
						'app.core': './admin/shared/module.js',
						'app.auth': './admin/modules/auth/module.js',
						'app.dashboard': './admin/modules/dashboard/module.js'
					}
				},
				files: {
					'_build/out/js/admin.js': [
						'admin/**/*.js'
					]
				}
			}
		},
		copy: {
			font: {
				cwd: 'bower_components/font-awesome-stylus/fonts',
				src: '**',
				dest: '_build/out/fonts/',
				flatten: true,
				expand: true
			},
			img: {
				cwd: 'src/public/img',
				src: '**',
				dest: '_build/out/img',
				expand: true
			}
		},
		stylus: {
			options: {
				use: [
					require('kouto-swiss')
				]
			},
			dev: {
				files: [{
					cwd: 'public/stylus',
					src: [
						'*.styl',
						'!_*.styl'
					],
					dest: '_build/out/css',
					ext: '.css',
					expand: true
				}, {
					cwd: 'public/stylus',
					src: [
						'*/*.styl',
						'!*/_*.styl'
					],
					dest: '_build/out/css',
					ext: '.pages.css',
					extDot: 'first',
					flatten: true,
					expand: true
				}]
			}
		},
		uglify: {
			dist: {
				files: [{
					cwd: '_build/out/js',
					src: [
						'**/*.js'
					],
					dest: '_build/out/js',
					ext: '.min.js',
					expand: true
				}]
			}
		},
		develop: {
			dev: {
				options: {
					env: {
						NODE_ENV: 'development'
					}
				},
				file: 'index.js'
			}
		},
		watch: {
			options: {
				nospawn: true
			},
			server: {
				files: [
					'<%= jshint.server.src %>'
				],
				tasks: ['jscs:server', 'jshint:server', 'develop']
			},
			client: {
				files: [
					'<%= jshint.client.src %>'
				],
				tasks: ['jscs:client', 'jshint:client']
			},
			browserify: {
				files: [
					'<%= jshint.browserify.src %>'
				],
				tasks: ['jscs:browserify', 'jshint:browserify']
			},
			stylus: {
				files: [
					'src/**/*.styl'
				],
				tasks: ['clean:css', 'stylus:dev']
			}
		},
	});

	require('load-grunt-tasks')(grunt);

	grunt.registerTask('static', [
		'jscs',
		'jshint'
	]);

	grunt.registerTask('default', [
		// 'clean',
		'static',
		// 'copy:font',
		// 'copy:img',
		// 'stylus:dev',
		'develop:dev',
		'browserify',
		'watch'
	]);

	grunt.registerTask('build-dev', [
		'clean',
		'static',
		'copy:font',
		'copy:img',
		'stylus:dev',
		'develop:dev',
		'browserify',
		// 'watch'
	]);
};
