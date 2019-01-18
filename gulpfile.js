var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

//basic syntax for a gulp task
gulp.task('task-name', function(done){
console.log('Hello Zell');
done();
});


//basic syntax for watching (real time refreshing of files)
//gulp.watch('files-to-watch', gulp.series('tasks', 'to', 'run')); 

gulp.task('sass', function(done){
  return gulp.src('app/scss/**/*.scss')
    .pipe(sass()) // Converts Sass to CSS with gulp-sass
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
    	stream: true
    }))
    done();
});



gulp.task('browserSync', function(done){
	browserSync.init({
		server:{
			baseDir: 'app',
			reloadDelay: 200
		},
	})
	done();
});



//task allows addition of more watch functions for different files
gulp.task('watchSass', function(done){
	gulp.watch('app/scss/**/*.scss', gulp.series('sass')); 
	done();
});

gulp.task('watchHTML', function(done){
  	gulp.watch('app/*.html').on('change', browserSync.reload);
    done();
});

gulp.task('watchJS', function(done){
	gulp.watch('app/js/**/*.js').on('change', browserSync.reload);
	done();
});



gulp.task('def', 
	gulp.series(gulp.parallel('sass','browserSync'), 
				gulp.parallel('watchSass','watchHTML','watchJS')
				),
				function(done){
					console.log('def has run');
	    			done();
							  }

);
