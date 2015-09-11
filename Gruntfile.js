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
        command: 's3_website push'
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
    }
  });

  grunt.registerTask('serve', [
    'shell:jekyllServe'
  ]);

  grunt.registerTask('build', [
    'scsslint',
    'shell:jekyllBuild'
  ]);

  grunt.registerTask('deploy', [
    'scsslint',
    'shell:jekyllBuild',
    'shell:jekyllDeploy'
  ]);

  grunt.registerTask('test', 'scsslint');

  grunt.registerTask('default', 'build');
};
