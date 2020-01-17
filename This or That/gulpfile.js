var gulp        = require('gulp');
var browserSync = require('browser-sync').create();

// var sass        = require('gulp-sass');

var runSequence = require("run-sequence");

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});


gulp.task("default", function () {
    runSequence(
        "css", 
        "html", 
        "watch"
    ); 
});

gulp.task("html", function () {
    gulp.watch("./*.html").on('change', browserSync.reload);
})

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        // injectChanges: true,
        server: "./app",
        port: 3000
    });

    // gulp.watch("./public/*.css", ['css']);
    gulp.watch("./*.html").on('change', browserSync.reload);
    gulp.watch("./public/*.css").on('change', browserSync.reload);
});

// gulp.watch("./*.html").on('change', browserSync.reload);


// gulp.task('default', function() {
//     gulp.start('styles', 'scripts', 'images', 'html');
// });

// gulp.task('watch', function() {
//     server.listen(3000, function (err) {
//     if (err) {
//         return console.log(err)
//     };
//     // Watch html files
//     gulp.watch('./*.html', ['html']);    
//     })
// })

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("./scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("./css"))
        .pipe(browserSync.stream());
});


// compile scss file(s) to css
// gulp.task('sass', function () {
//   gulp.src('./scss/**/*.scss')
//     .pipe(sass().on('error', sass.logError))
//     .pipe(gulp.dest('./css'));
// });

// watch for changes to scss
gulp.task('sass:watch', function () {
  gulp.watch('./scss/**/*.scss', ['sass']);
});

// gulp.task('css', function() {
//     return gulp.src("./css/*.css")
//         // .pipe(sass())
//         // .pipe(gulp.dest("app/css"))
//         .pipe(browserSync.stream());
// });

// gulp.task('default', ['sass']);


gulp.task('default', ['serve']);


/* Reload after Processing JS Files */ 
// process JS files and return the stream.
gulp.task('js', function () {
    return gulp.src('js/*js')
        .pipe(browserify())
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

// create a task that ensures the `js` task is complete before
// reloading browsers
gulp.task('js-watch', ['js'], function (done) {
    browserSync.reload();
    done();
});

// use default task to launch Browsersync and watch JS files
gulp.task('default', ['js'], function () {

    // Serve files from the root of this project
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    // add browserSync.reload to the tasks array to make
    // all browsers reload after tasks are complete.
    gulp.watch("js/*.js", ['js-watch']);
});