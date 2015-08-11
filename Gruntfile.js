'use strict';

module.exports = function(grunt) {
	grunt.initConfig({
		clean: {
			css: {
				src: ['build/out/css']
			},
			js: {
				src: ['build/out/js']
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
		stylus: {
			options: {
				use: [
					require('kouto-swiss')
				],
				compress: false
			},
			public: {
				files: [{
					cwd: 'app/public/stylus',
					src: [
						'**/*.styl',
						'!**/_*.styl'
					],
					dest: 'build/out/css',
					ext: '.css',
					expand: true
				}]
			}
		},
		develop: {
			app: {
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
				tasks: ['clean:css', 'stylus', 'develop']
			}
		},
	});

	require('load-grunt-tasks')(grunt);

	grunt.registerTask('static', ['jscs', 'jshint']);
	grunt.registerTask('build', ['clean', 'stylus']);
	grunt.registerTask('default', ['static', 'build', 'develop', 'watch']);
};
