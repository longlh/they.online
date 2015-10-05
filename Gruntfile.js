'use strict';

module.exports = function(grunt) {
	grunt.initConfig({
		clean: {
			css: {
				src: ['build/out/css']
			},
			js: {
				src: ['build/out/js']
			},
			font: {
				src: ['build/out/fonts']
			}
		},
		jshint: {
			server: {
				src: [
					'index.js',
					'src/*.js',
					'src/server/**/*.js'
				],
				options: {
					jshintrc: '_grunt/.jshintrc-server'
				}
			},
			browserify: {
				src: [
					'src/public/js/injection/**/*.js'
				],
				options: {
					jshintrc: '_grunt/.jshintrc-browserify'
				}
			},
			client: {
				src: [
					'src/client/**/*.js',
					'src/public/js/**/*.js',
					'!src/public/js/injection/**'
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
			inject: {
				options: {
					watch: true,
					browserifyOptions: {
						standalone: '__'
					}
				},
				files: {
					'build/out/js/inject.js': [
						'src/public/js/injection/context.js',
						'src/public/js/injection/**/*.js'
					]
				}
			}
		},
		copy: {
			font: {
				cwd: 'bower_components/font-awesome-stylus/fonts',
				src: '**',
				dest: 'build/out/fonts/',
				flatten: true,
				expand: true
			},
			img: {
				cwd: 'src/public/img',
				src: '**',
				dest: 'build/out/img',
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
					cwd: 'src/public/stylus',
					src: [
						'*.styl',
						'!_*.styl'
					],
					dest: 'build/out/css',
					ext: '.css',
					expand: true
				}, {
					cwd: 'src/public/stylus',
					src: [
						'*/*.styl',
						'!*/_*.styl'
					],
					dest: 'build/out/css',
					ext: '.pages.css',
					extDot: 'first',
					flatten: true,
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
		'clean',
		'static',
		'copy:font',
		'copy:img',
		'stylus:dev',
		'develop:dev',
		'browserify',
		'watch'
	]);
};
