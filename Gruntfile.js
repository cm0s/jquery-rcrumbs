module.exports = function (grunt) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    banner: '/* <%= pkg.title || pkg.name %> jQuery plugin\n' +
      ' * <%= pkg.homepage %>\n' +
      ' *\n' +
      ' * Copyright (c) <%= grunt.template.today("yyyy") %>, <%= pkg.author.name %> \n' +
      ' * Released under the <%= _.pluck(pkg.licenses, "type").join(", ") %> licence \n' +
      ' *\n' +
      ' * version: <%= pkg.version %> \n' +
      ' * <%= grunt.template.today("yyyy/mm/dd") %>\n' +
      ' */\n',
    bannermin: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> | ' + '<%= pkg.homepage %> | ' +
      '(c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>' + ' | ' +
      'License <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    filename: 'jquery.rcrumbs',
    clean: {
      files: ['dist']
    },
    connect: {
      server: {
        options: {
          port: 8075
        }
      }
    },
    concat: {
      options: {
        stripBanners: true,
        banner: '<%= banner %>'
      },
      dist: {
        src: 'src/<%= filename %>.js',
        dest: 'dist/<%= filename %>.js'
      }
    },
    replace: {
      dist: {
        options: {
          variables: {
            version: '<%= pkg.version %>'
          }
        },
        files: {
          'dist/<%= filename %>.js': 'dist/<%= filename %>.js'
        }
      }
    },
    less: {
      dev: {
        files: {
          'dist/<%= filename %>.css': 'src/less/<%= filename %>.less'
        }
      },
      prod: {
        options: {
          yuicompress: true
        },
        files: {
          'dist/<%= filename %>.min.css': 'src/less/<%= filename %>.less'
        }
      }
    },
    uglify: {
      options: {
        banner: '<%= bannermin %>'
      },
      dist: {
        src: 'src/<%= filename %>.js',
        dest: 'dist/<%= filename %>.min.js'
      }
    },
    jshint: {
      options: {
        jshintrc: true
      },
      gruntfile: {
        files: {
          src: ['Gruntfile.js']
        }
      },
      src: {
        files: {
          src: ['src/**/*.js']
        }
      },
      test: {
        files: {
          src: ['test/**/*.js']
        }
      }
    },
    qunit: {
      all: {
        options: {
          urls: ['1.7.0', '1.8.0', '1.8.3', '1.9.1', '1.11.0', '2.0.0', '2.1.0'].map(function (version) {
            return 'http://localhost:<%= connect.server.options.port %>/test/test.html?jquery=' + version;
          })
        }
      },
      last: {
        options: {
          urls: ['1.11.0', '2.1.0'].map(function (version) {
            return 'http://localhost:<%= connect.server.options.port %>/test/test.html?jquery=' + version;
          })
        }
      },
      local: ['test/**/!(window-resize).html']
    },
    watch: {
      gruntfile: {
        files: 'Gruntfile.js',
        tasks: ['jshint:gruntfile', 'qunit:local']
      },
      js: {
        files: 'src/**/*.js',
        tasks: ['jshint:src', 'qunit:local']
      },
      test: {
        files: ['test/**/*.js', 'test/**/!(window-resize).html'],
        tasks: ['jshint:test', 'qunit:local']
      },
      less: {
        files: 'src/**/*.less',
        tasks: ['less:dev']
      }
    },
    bump: {
      options: {
        tabSize: 2
      },
      files: ['package.json', 'rcrumbs.jquery.json']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-replace');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-bumpx');

  grunt.registerTask('default', ['connect', 'clean', 'jshint', 'less', 'concat', 'replace', 'uglify', 'qunit:last']);
  grunt.registerTask('test', ['connect', 'jshint', 'qunit:last']);
  grunt.registerTask('test-all', ['connect', 'jshint', 'qunit:all']);

};
