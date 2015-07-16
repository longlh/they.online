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
			}
		},
		jscs: {
			server: {
				src: [
					'Gruntfile.js',
					'<%= jshint.server.src %>'
				],
				options: {
					config: 'build/rules/.jscsrc'
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
			}
		},
	});

	require('load-grunt-tasks')(grunt);

	grunt.registerTask('static', ['jscs', 'jshint']);
	grunt.registerTask('default', ['static', 'develop', 'watch']);
};
