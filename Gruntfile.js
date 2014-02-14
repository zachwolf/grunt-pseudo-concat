/*
 * grunt-pseudo-concat
 * https://github.com/zachwolf/grunt-pseudo-concat
 *
 * Copyright (c) 2014 Zach Wolf
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    todos: {
      options: {
        marks: [
          {
            name: "to do:",
            pattern: /todo\:\s/,
            color: "yellow"
          },
          {
            name: "might do:",
            pattern: /todo\?\s/,
            color: "cyan"
          }
        ]
      },
      src: [
        './*',
        './**/*',
        '!./Gruntfile.js',
        '!./node_modules/**/*'
      ]
    },
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp'],
    },

    // Configuration to be run (and then tested).
    pseudo_concat: {
      default_options: {
        options: {
        },
        files: {
          'tmp/default_options': ['test/fixtures/testing', 'test/fixtures/123'],
        },
      },
      custom_options: {
        options: {
          separator: ': ',
          punctuation: ' !!!',
        },
        files: {
          'tmp/custom_options': ['test/fixtures/testing', 'test/fixtures/123'],
        },
      },
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js'],
    },

  });

  // load all tasks
  require('load-grunt-tasks')(grunt);
  
  // prevents our task declaration from showing up as a todo
  grunt.task.renameTask("todo", "todos");

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'pseudo_concat', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
