module.exports = function (grunt) {
  grunt.initConfig({
    sass: {
      dist: {
        files: {
          './dist/public/css/main.css': './src/**/main.scss'
        }
      }
    },
    clean: {
      all: {
        src: ['./dist']
      },
      css: {
        src: ['./dist/public/css']
      },
      scripts: {
        src: ['./dist/public/js']
      },
      html: {
        src: ['./dist/public/**/*.html']
      }
    },
    copy: {
      main: {
        files: [
            {
              expand: true,
              cwd: './src',
              src: ['**/*.html'],
              dest: './dist/public'
            },
            {
              expand: true,
              cwd: './src',
              src: ['**/img/**/*.*'],
              dest: './dist/public/'
            },
            {
              expand: true,
              cwd: './src',
              src: ['**/libs/*.*'],
              dest: './dist/public/'
            }, {
              expand: true,
              cwd: './src/video',
              src: ['*.*'],
              dest: './dist/public/video'
            }

        ]
      }
    },
    browserify: {
      dist: {
        files: { './dist/public/js/main.js': './src/**/main.js' }
      }
    },
    watch: {
      sass: {
        files: ['./src/**/*.scss'],
        tasks: ['clean:css', 'sass']
      },
      scripts: {
        files: ['./src/js/*.js'],
        tasks: ['clean:scripts', 'browserify']
      },
      html: {
        files: ['./src/**/*.html'],
        tasks: ['clean:html', 'copy']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['clean:all', 'sass', 'copy', 'browserify']);
};
