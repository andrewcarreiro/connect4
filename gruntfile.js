module.exports = function(grunt) {

	grunt.initConfig({
		jasmine: {
			connect4test : {
				src : [
						'scripts/Board.js',
						'scripts/BoardUI.js'
					],
				options : {
					vendor : [
						'scripts/jquery-2.1.1.min.js',
						'test/jasmine-jquery.js',
						'scripts/_inheritance.js',
						'scripts/lodash.js'
					],
					specs: 'test/*.spec.js'
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jasmine');

	grunt.registerTask('default', ['jasmine']);
	grunt.registerTask('test', ['jasmine']);

};