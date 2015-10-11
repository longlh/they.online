'use strict';

module.exports = function(grunt) {
	grunt.initConfig({
		clean: {
			css: {
				src: ['./build/out/css']
			},
			js: {
				src: ['./build/out/js']
			},
			font: {
				src: ['./build/out/fonts']
			},
			img: {
				src: ['./build/out/img']
			}
		},
		jshint: {
			server: {
				src: [
					'./index.js',
					'./src/server/**/*.js'
				],
				options: {
					jshintrc: './grunt/.jshintrc-server'
				}
			},
			browserify: {
				src: [
					'./src/injection/**/*.js',
					'./src/management/**/*.js'
				],
				options: {
					jshintrc: './grunt/.jshintrc-browserify'
				}
			},
			client: {
				src: [
					'./src/client/**/*.js',
					'./src/public/js/**/*.js',
				],
				options: {
					jshintrc: './grunt/.jshintrc-client'
				}
			}
		},
		jscs: {
			options: {
				config: './grunt/.jscsrc'
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
					'./build/out/js/inject.js': [
						'./src/injection/context.js',
						'./src/injection/**/*.js'
					]
				}
			},
			management: {
				options: {
					watch: true,
					alias: {
						'app': './src/management/app.js'
					}
				},
				files: {
					'./build/out/js/management.js': [
						'./src/management/**/*.js'
					]
				}
			}
		},
		copy: {
			font: {
				cwd: './bower_components/font-awesome-stylus/fonts',
				src: '**',
				dest: './build/out/fonts/',
				flatten: true,
				expand: true
			},
			img: {
				cwd: './src/public/img',
				src: '**',
				dest: './build/out/img',
				expand: true
			}
		},
		stylus: {
			options: {
				use: [
					require('kouto-swiss')
				]
			},
			management: {
				files: [{
					cwd: './src/management',
					src: [
						'*.styl'
					],
					dest: './build/out/css/management',
					ext: '.css',
					expand: true
				}, {
					cwd: './src/public/stylus',
					src: [
						'**/*.styl',
						'!**/_*.styl'
					],
					dest: './build/out/css/public',
					ext: '.css',
					expand: true
				}]
			}
		},
		uglify: {
			dist: {
				files: [{
					cwd: './build/out/js',
					src: [
						'**/*.js'
					],
					dest: './build/out/js',
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
				tasks: ['clean:css', 'stylus']
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
		'stylus',
		'browserify',
		// 'watch'
	]);
};
