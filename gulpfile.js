// Require all the things
const gulp = require('gulp'),
      browserSync = require('browser-sync'),
      reload      = browserSync.reload,
      sass = require('gulp-sass'),
      gutil = require('gulp-util'),
      plumber = require('gulp-plumber'),
      rename = require('gulp-rename'),
      minifyCSS = require('gulp-clean-css'),
      prefixer = require('gulp-autoprefixer'),
      connect = require('gulp-connect');
      cp = require('child_process');

const siteRoot = '_site';

// Set the path variables
const base_path = './',
      src = base_path,
      dist = base_path,
      paths = {  
          js: src + '/js/*.js',
          scss: [ src +'/css/*.scss',
                  src +'/_sass/**/* .scss',
                  src +'/scss/**/**/*.scss'],
          jekyll: ['index.html', '_posts/*', '_layouts/*', '_includes/*' , 'assets/*', 'assets/**/*']
      };


// Compile sass to css
gulp.task('compile-sass', () => {  
  return gulp.src(paths.scss)
    .pipe(plumber((error) => {
        gutil.log(gutil.colors.red(error.message));
        gulp.task('compile-sass').emit('end');
    }))
    .pipe(sass())
    .pipe(prefixer('last 3 versions', 'ie 9'))
    // .pipe(minifyCSS())
    .pipe(rename({dirname: dist + '/css'}))
    .pipe(gulp.dest('./'));
});

// Rebuild Jekyll
gulp.task('jekyll-build', (code) => {
  browserSync.notify('Building Jekyll');
  return cp.spawn('jekyll.bat', ['build'], { stdio: 'inherit' })
    .on('error', (error) => gutil.log(gutil.colors.red(error.message)))
    .on('close', code);
})

// // Setup Server
// gulp.task('server', () => {
//   connect.server({
//     root: ['_site'],
//     port: 4000
//   });
// })
/**
 * Wait for jekyll-build, then launch the Server
 */
gulp.task('browser-sync', ['jekyll-build'], function() {
    browserSync({
        server: {
            baseDir: '_site'
        },
        host: "localhost"
    });
});


// Watch files
gulp.task('watch', () => {  
  gulp.watch(paths.scss, ['compile-sass']);
  gulp.watch(paths.jekyll, ['jekyll-build']);
});

// Start Everything with the default task
gulp.task('default', [ 'compile-sass', 'jekyll-build', 'browser-sync', 'watch' ]);
// gulp.task('default', [ 'jekyll-build', 'server', 'watch' ]);