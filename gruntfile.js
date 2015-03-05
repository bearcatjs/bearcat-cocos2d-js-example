'use strict';

module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-bearcat-browser');

  var src = [];

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      "coverage.html": {
        src: ['coverage.html']
      }
    },
    bearcat_browser: {
      default: {
        dest: "bearcat-bootstrap.js",
        context: "client-context.json"
      }
    },
    // browserify everything
    browserify: {
      standalone: {
        src: ['client.js'],
        dest: 'main.js',
        options: {

        }
      }
    }
  });

  // Default task.
  grunt.registerTask('default', ['clean', 'bearcat_browser', 'browserify']);
};