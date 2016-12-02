var gulp = require('gulp');
var cp          = require('child_process');



gulp.task('jekyll-prod-clean', function (done) {
  // browserSync.notify(messages.jekyllProd);
  return cp.spawn('jekyll.bat', ['clean'], {stdio: 'inherit'})
  .on('close', done);
});
gulp.task('jekyll-prod-build', function (done) {
  // browserSync.notify(messages.jekyllProd);
  return cp.spawn('jekyll.bat', ['build', '--config', '_config.yml,_config_production.yml'], {stdio: 'inherit'})
  .on('close', done);
});


gulp.task('default', function() {
  // place code for your default task here
});

gulp.task('build', ['jekyll-prod-clean','jekyll-prod-build']);