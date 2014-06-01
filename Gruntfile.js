var livereloadPort = 9090;
var lrSnippet = require('connect-livereload')({port: livereloadPort});

module.exports = function(grunt){

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    dist_dir: 'dist',

    gamejs: [
   	  'game/js/states/load.js',
   	  'game/js/states/menu.js',
   	  'game/js/states/play.js',
      'game/js/prefabs/*.js',
   	  'game/js/game.js',
    ],

    concat: {
      gamejs: {
      	src: ['<%= gamejs %>'],
        dest: '<%= dist_dir %>/js/game.js'
      }
    },

    uglify: {
      gamejs: {
      	src: ['<%= gamejs %>'],
      	dest: '<%= dist_dir %>/js/game.min.js'
      }
    },

    copy: {
      main: {
      	files: [
      	  {expand: true, cwd: 'game/assets/', src: ['**'], dest: '<%= dist_dir %>/assets/'},
      	  {src: ['img/**'], dest: '<%= dist_dir %>/'},
      	  {expand: true, flatten: true, src: ['game/js/lib/phaser.min.js'], dest: '<%= dist_dir %>/js/'},
      	  {expand: true, src: ['index.html'], dest: 'dist/' }
      	]
      }
    },

    watch: {
      js: {
        files: ['game/*.js', 'game/**/*.js'],
        tasks: ['concat', 'uglify'],
        options: {
          livereload: livereloadPort
        }
      }
    },

    connect: {
      server: {
        options: {
          port: 3000,
          livereload: livereloadPort,
          middleware: function (connect) {
            return [
              lrSnippet,
              connect.static(require('path').resolve('dist'))
            ];
          }
        }
      }
    },

    open: {
      index: {
        path: 'http://localhost:3000',
        app: 'chrome'
      }
    }
  });

  // Load modules
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-open');

  // Taks
  grunt.registerTask('default', ['copy', 'concat', 'uglify', 'connect', 'open', 'watch']);
};