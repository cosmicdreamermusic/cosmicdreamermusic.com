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
    }
  });

  grunt.registerTask('serve', [
    'shell:jekyllServe'
  ]);

  grunt.registerTask('build', [
    'shell:jekyllBuild'
  ]);

  grunt.registerTask('deploy', [
    'shell:jekyllBuild',
    'shell:jekyllDeploy'
  ]);

  grunt.registerTask('default', 'build');
};
