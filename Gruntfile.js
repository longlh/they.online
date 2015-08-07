'use strict';

module.exports = function(grunt) {
	grunt.initConfig({
		clean: {
			src: ['build/public']
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
				]
			},
			public: {
				files: {
					'build/public/css/app.css': 'app/public/stylus/app.styl'
				}
			},
			app: {
				files: {
					'build/public/css/main.css': 'app/client/import.styl'
				}
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
					'<%= stylus.public.files',
					'<%= stylus.app.files'
				],
				tasks: ['clean', 'stylus', 'develop']
			}
		},
	});

	require('load-grunt-tasks')(grunt);

	grunt.registerTask('static', ['jscs', 'jshint']);
	grunt.registerTask('build', ['clean', 'stylus']);
	grunt.registerTask('default', ['static', 'build', 'develop', 'watch']);
};
