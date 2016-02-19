module.exports = function (grunt) {

    grunt.initConfig({

		shell: {
            dev: {
                command: 'node server'
            }
		},

		watch: {
			fest: {
                files: ['templates/*.xml'],
                tasks: ['fest'],
                options: {
                    spawn: false,
                    atBegin: true
                },
            }
		},

        qunit: {
            all: ['./public_html/tests/index.html']
        },

		concurrent: {
			dev: ['shell', 'watch'],
            options: {
                logConcurrentOutput: true
            }
		},

		fest: {
            templates: {
                files: [{
                    expand: true,
                    cwd: 'templates',
                    src: '*.xml',
                    dest: 'public_html/js/tmpl'
                }],
                options: {
                    template: function (data) {
                        return grunt.template.process(
                            'define(function () { return <%= contents %> ; });',
                            {data: data}
                        );
                    }
                }
            }
        }

    });

	// подключть все необходимые модули
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-shell');
	grunt.loadNpmTasks('grunt-fest');

    // результат команды grunt
    grunt.registerTask('default', ['concurrent']);
    grunt.registerTask('test', ['qunit:all']);
};
