var gulp = require('gulp'),
	p = require('./package.json'),
	gulpLoadPlugins = require('gulp-load-plugins'),
	plugins = gulpLoadPlugins();

var banner = '/*! ' + p.name + ' Version: ' + p.version + ' */\n';

gulp.task('default', ['build']);

gulp.task('watch', function(){
	gulp.watch(['src/**/*', '!/src/lib/**/*'], ['build']);
});

gulp.task('build', ['js-d3', 'js-filter'] );

gulp.task('js-d3', function(){
	return gulp.src([
			'src/js/hexbin/leaflet.js',
			'src/js/hexbin/hexbin.js',
			'src/js/ping/leaflet.js',
			'src/js/ping/ping.js',
		])

		// JS Hint
		.pipe(plugins.jshint('.jshintrc'))
		.pipe(plugins.jshint.reporter('jshint-stylish'))

		// Concatenate
		.pipe(plugins.concat(p.name + '.d3.js'))
		.pipe(plugins.insert.prepend(banner))
		.pipe(gulp.dest('dist'))
		.pipe(plugins.filesize())

		// Uglify
		.pipe(plugins.uglify({
			mangle: false
		}))
		.pipe(plugins.rename(p.name + '.d3.min.js'))
		.pipe(plugins.insert.prepend(banner))
		.pipe(gulp.dest('dist'))
		.pipe(plugins.filesize())
		.on('error', plugins.util.log);
});

gulp.task('js-filter', function(){
	return gulp.src([
			'src/js/filter/controls.js'
		])

		// JS Hint
		.pipe(plugins.jshint('.jshintrc'))
		.pipe(plugins.jshint.reporter('jshint-stylish'))

		// Concatenate
		.pipe(plugins.concat(p.name + '.filter.js'))
		.pipe(plugins.insert.prepend(banner))
		.pipe(gulp.dest('dist'))
		.pipe(plugins.filesize())

		// Uglify
		.pipe(plugins.uglify({
			mangle: false
		}))
		.pipe(plugins.rename(p.name + '.filter.min.js'))
		.pipe(plugins.insert.prepend(banner))
		.pipe(gulp.dest('dist'))
		.pipe(plugins.filesize())
		.on('error', plugins.util.log);
});
