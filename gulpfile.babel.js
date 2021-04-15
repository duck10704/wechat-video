const gulp = require('gulp');
const argv = require('yargs').argv;
const zip = require('gulp-zip');
const clean = require('gulp-clean');
const yarn = require('gulp-yarn');
const shell = require('gulp-shell');
const eslint = require('gulp-eslint');
const gutil = require('gulp-util');
const git = require('gulp-git');
import manageTranslations from 'react-intl-translations-manager';
import fs from "fs";

gulp.task('archive', ['webpack', 'scm-info', 'install-npm-dependencies'], function () {
  return gulp.src(['scminfo.txt', 'public/**'], {base: '.'})
    .pipe(zip('wechat-video.zip'))
    .pipe(gulp.dest('dist'));
});

gulp.task('archive-without-yarn', ['webpack', 'scm-info'], function () {
  return gulp.src(['scminfo.txt', 'public/**'], {base: '.'})
    .pipe(zip('wechat-video.zip'))
    .pipe(gulp.dest('dist'));
});

gulp.task('install-npm-dependencies', function () {
  gulp.src(['./package.json', './yarn.lock']).pipe(yarn());
});

gulp.task('webpack', ['clean'], shell.task('webpack'));

gulp.task('lint', function () {
  return gulp.src(['**/*.js', '!node_modules/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('environment', function () {
  var env = argv.profile || 'production';
  gutil.log('Set process.env.NODE_ENV = ' + env);
  return process.env.NODE_ENV = env;
});

gulp.task('clean', ['environment'], function () {
  gulp.src(['dist', 'public']).pipe(clean());
});

gulp.task('make-dll', shell.task('webpack --config webpack.config.dll.babel.js'));

gulp.task('default', ['archive']);

gulp.task('extract-i18n', [], shell.task('webpack --config webpack.config.i18n.babel.js'));

gulp.task('scm-info', [], function () {
  git.exec({args: 'log -n 1'}, function (err, stdout) {
    fs.writeFile('./scminfo.txt', stdout);
  });
});

gulp.task('create-sources-folder', function () {
  const path = './app/utils/langs/sources/';
  fs.stat(path, function (err, stats) {
    if (!stats.isDirectory()) {
      fs.mkdirSync(path);
    }
  });
});

gulp.task('i18n', ['extract-i18n'], function () {
  manageTranslations({
    messagesDirectory: 'app/utils/langs/sources',
    translationsDirectory: 'app/utils/langs',
    whitelistsDirectory: 'app/utils/langs/whitelist',
    singleMessagesFile: true,
    languages: ['es_ES', 'it_IT', 'de_DE', 'fr_FR', 'ja_JP', 'ko_KR', 'pt_BR', 'zh_CN', 'zh_TW']
  });
});
