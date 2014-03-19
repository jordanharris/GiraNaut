module.exports = function(grunt){

	//CONFIGURE grunt
	grunt.initConfig({
		uglify: {
			development: {
				//Expanded Files
				files: [
					{
						expand: true,
						cwd:'./public/javascripts/',
						src:['*.js'],
						dest: './public/javascripts/min',
						ext: '.min.js'
					}
				],
				options: {
					sourceMap: true
				}
			},
		},
		cssmin: {
			development: {
				files: [
					{
					    expand: true,
					    cwd: './public/stylesheets/',
					    src: ['*.css'],
					    dest: './public/stylesheets/min',
					    ext: '.min.css'
					}
				],
				options: {
					sourceMap: true
				}	
			},
		},
		watch: {
			uglify: {
				files: './public/javascripts/*.js',
				tasks: ['uglify:development']
			},
			cssmin: {
				files: './public/stylesheets/*.css',
				tasks: ['cssmin:development']
			}
		}
	});

	grunt.registerTask('default',['watch']);

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
};