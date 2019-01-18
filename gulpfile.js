var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

//basic syntax for watching (real time refreshing of files)
//gulp.watch('files-to-watch', gulp.series('tasks', 'to', 'run')); 

gulp.task('sass', function(done){
  return gulp.src('app/scss/**/*.scss')
    .pipe(sass()) // Converts Sass to CSS with gulp-sass
    .pipe(gulp.dest('app/css')) //sends files to css folder
    .pipe(browserSync.stream()) // must come after gulp.dest
    done();
});

// Creating a static server?
gulp.task('browserSync', function(done){
	browserSync.init({
		server:{
			baseDir: 'app',
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
  	gulp.watch('app/**/*.html', browserSync.reload());	
    done();
});

gulp.task('watchJS', function(done){
	gulp.watch('app/js/**/*.js', browserSync.reload()); 
	done();
});

// Runs all tasks in parallel in order to update browser in "real time."
gulp.task('def', 
	gulp.series(gulp.parallel('sass','browserSync'), 
	gulp.parallel('watchSass','watchHTML','watchJS')), function(done){
done();
}

);
