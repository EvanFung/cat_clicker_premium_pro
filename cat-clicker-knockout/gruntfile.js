module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);
    
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        
        // 1) First look for problems in the code
        
        // lint javascript (validate and detect errors) 
        jshint: {
	       all: {
               options: {
                   force: true
               },
               src: ['Gruntfile.js', 'js/*']
           }
        },
        wiredep: {
          target: {
            src: 'index.html' // point to your HTML file.
          }
        }      
    });
    
    // Where we tell Grunt what to do when we type "grunt" into the terminal
    grunt.registerTask('default', [
        'jshint',
        'wiredep'
    ]);
};