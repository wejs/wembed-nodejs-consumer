/**
 * Gruntfile
 *
 * This Node script is executed when you run `grunt` or `sails lift`.
 * It's purpose is to load the Grunt tasks in your project's `tasks`
 * folder, and allow you to add and remove tasks as you see fit.
 * For more information on how this works, check out the `README.md`
 * file that was generated in your `tasks` folder.
 *
 * WARNING:
 * Unless you know what you're doing, you shouldn't change this file.
 * Check out the `tasks` directory instead.
 */

module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      options: {
        'jshintrc': true
      },
      api: [
        'lib/**/*.js'
      ],
      tests: [
        'test/**/*.js'
      ]
    },
    'mocha_istanbul': {
      coverage: {
        src: 'test', // the folder, not the files
        options: {
          coverageFolder: 'coverage',
          mask: '/**/*.test.js',
          root: 'lib/'
        }
      }
    },
    bump: {
      options: {
        files: ['package.json'],
        updateConfigs: [],
        commit: true,
        commitMessage: 'Release v%VERSION%',
        commitFiles: ['package.json'], // '-a' for all files
        createTag: true,
        tagName: 'v%VERSION%',
        tagMessage: 'Version %VERSION%',
        push: true,
        pushTo: 'origin',
        gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d' // options to use with '$ git describe'
      }
    }
  });

  grunt.loadNpmTasks('grunt-bump');
  grunt.loadNpmTasks('grunt-mocha-istanbul');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Adding test task enabling "grunt test" command
  grunt.registerTask('test', [
    'mocha_istanbul:coverage'
  ]);

  grunt.registerTask('default', [
    'jshint',
    'mocha_istanbul:coverage'
  ]);

  grunt.registerTask('up', [
    'jshint',
    'mocha_istanbul:coverage',
    'bump'
  ]);
};
