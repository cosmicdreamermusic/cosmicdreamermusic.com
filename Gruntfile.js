module.exports = function(grunt) {
  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    shell: {
      jekyllBuild: {
        command: 'jekyll build'
      },
      jekyllServe: {
        command: 'jekyll serve'
      },
      jekyllDeploy: {
        command: 's3_website push --force'
      }
    },

    scsslint: {
      allFiles: [
        'css/*.scss',
        '_sass/**/*.scss'
      ],
      options: {
        bundleExec: false,
        config: '.scss-lint.yml',
        colorizeOutput: true,
        exclude: [
          '_sass/utils/_functions.scss',
          '_sass/utils/_normalize.scss',
          'css/styles.scss'
        ]
      }
    },

    uglify: {
      picturefill: {
        files: {
          'js/picturefill.min.js': 'bower_components/picturefill/dist/picturefill.min.js'
        }
      }
    }
  });

  grunt.registerTask('serve', [
    'uglify:picturefill',
    'shell:jekyllServe'
  ]);

  grunt.registerTask('build', [
    'uglify:picturefill',
    'scsslint',
    'shell:jekyllBuild'
  ]);

  grunt.registerTask('deploy', [
    'uglify:picturefill',
    'scsslint',
    'shell:jekyllBuild',
    'shell:jekyllDeploy'
  ]);

  grunt.registerTask('test', 'scsslint');
  grunt.registerTask('default', 'build');
};
