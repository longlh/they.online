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
					'app/*.js',
					'app/config/**/*.js',
					'app/server/**/*.js'
				],
				options: {
					jshintrc: 'build/rules/.jshintrc-server'
				}
			},
			client: {
				src: [
					'app/client/**/*.js'
				],
				options: {
					jshintrc: 'build/rules/.jshintrc-client'
				}
			}
		},
		jscs: {
			options: {
				config: 'build/rules/.jscsrc'
			},
			server: {
				src: [
					'Gruntfile.js',
					'<%= jshint.server.src %>'
				]
			},
			client: {
				src: '<%= jshint.client.src %>'
			}
		},
		copy: {
			font: {
				cwd: 'bower_components/font-awesome-stylus/fonts',
				src: '**',
				dest: 'build/out/fonts/',
				flatten: true,
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
					cwd: 'app/public/stylus',
					src: [
						'*.styl',
						'!_*.styl'
					],
					dest: 'build/out/css',
					ext: '.css',
					expand: true
				}, {
					cwd: 'app/public/stylus',
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
			stylus: {
				files: [
					'app/**/*.styl'
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
		'stylus:dev',
		'develop:dev',
		'watch'
	]);
};
