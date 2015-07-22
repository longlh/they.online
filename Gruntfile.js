'use strict';

module.exports = function(grunt) {
	grunt.initConfig({
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
			}
		},
	});

	require('load-grunt-tasks')(grunt);

	grunt.registerTask('static', ['jscs', 'jshint']);
	grunt.registerTask('default', ['static', 'develop', 'watch']);
};
