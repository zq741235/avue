const gulp = require('gulp');

var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cssmin = require('gulp-cssmin');
const webpack = require('webpack');
const webpackConf = require('./build/build.js');
 
// 构建webpack配置
function wp(cb) {
  webpack(webpackConf, function(err, stats) {
    if (err) {
      console.log(err);
    }
    cb();
  });
}

// 处理样式的配置
function compile(cb) {
  return (
    gulp
      .src('./styles/index.scss')
      .pipe(sass.sync())
      .pipe(
        autoprefixer({
          browsers: ['ie > 9', 'last 2 versions'],
          cascade: false
        })
      )
      // .pipe(cssmin())
      .pipe(gulp.dest('./lib/'))
  );
}
// 打包文件
gulp.task('build', gulp.parallel(wp, compile));

// 监听文件变化 ["webpack", "compile"],
gulp.task('watch', function() {
  gulp.watch(['./src/**', './packages/**'], wp);
  gulp.watch(['./styles/**'], compile);
});
