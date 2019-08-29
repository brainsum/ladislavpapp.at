const browserSync       = require('browser-sync').create();
const clean             = require('gulp-clean');
const gulp              = require('gulp');
const autoprefixer      = require('autoprefixer');
const purge             = require('gulp-css-purge');
const eslint            = require('gulp-eslint');
const npmDist           = require('gulp-npm-dist');
const postcss           = require('gulp-postcss');
const sass              = require('gulp-sass');
const sourcemaps        = require('gulp-sourcemaps');
const splitMediaQueries = require('gulp-split-media-queries');
const stylelint         = require('gulp-stylelint');
const uglify            = require('gulp-uglify');
const critical          = require('gulp-penthouse');

// Store all paths
const paths = {
  sass: './sass/**/*.scss',
  css: './css/',
  jsSrc: './js/src/*.js',
  jsDist: './js/dist/',
  img: './images/',
  twig: './templates/**/*.html.twig',
  markdown: '../../pages/**/*.md',
};

/**
 * Copy:dependencies Task
 *
 * from npm_modules to ./public/vendors/
 * @see https://github.com/dshemendiuk/gulp-npm-dist
 * @return {object} Copied distributed version of vendor assets.
 */
function copyVendorTask() {
  return gulp
    .src(npmDist(), { base: './node_modules' })
    .pipe(gulp.dest('./vendors/'));
}

/**
 * CSS: Cleaning Task
 *
 * Remove all compiled CSS file to make a clean start before Sass tasks and
 * avoid duplicated and conflicted CSS rules.
 * @return {object} empty directory
 */
function cssCleanTask() {
  return gulp
    .src(paths.css, { read: false })
    .pipe(clean());
}

/**
 * SASS:Development Task
 *
 * Sass task for development with live injecting into all browsers
 * @return {object} Autoprefixed CSS files with expanded style and sourcemaps.
 */
function sassDevTask() {
  return gulp
    .src(paths.sass)
    .pipe(sourcemaps.init({ largeFile: true }))
    .pipe(sass({ outputStyle: 'expanded', precision: 10 }))
    .on('error', sass.logError)
    .pipe(postcss([autoprefixer()]))
    .pipe(sourcemaps.write({ includeContent: false }))
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.css))
    .pipe(browserSync.stream());
}

/**
 * SASS:Production Task
 *
 * Sass task for production with linting, to be stored in Git (run before
 * commit)
 * @return {object} Autoprefixed, minified, ordered and linted* CSS files without
 * sourcemaps.
 */
function sassProdTask() {
  return gulp
    .src(paths.sass)
    .pipe(stylelint({
      fix: true,
      reporters: [
        {
          formatter: 'verbose',
          console: true,
        },
      ],
    }))
    .pipe(sass({ outputStyle: 'compact', precision: 10 }))
    .on('error', sass.logError)
    .pipe(postcss([autoprefixer()]))
    .pipe(splitMediaQueries({
      breakpoint: 45, // 720px and above
    }))
    .pipe(
      purge({
        trim: true,
        shorten: true,
        verbose: true,
      }),
    )
    .pipe(gulp.dest(paths.css));
}

/**
 * SASS:Linting Task
 *
 * @return {object} Linted version of SASS (auto fixable) and warnings printed to
 * console.
 */
function sassLintTask() {
  return gulp
    .src(paths.sass)
    .pipe(stylelint({
      fix: true,
      reporters: [
        {
          formatter: 'verbose',
          console: true,
        },
      ],
    }));
}

/**
 * Generate critical CSS for inline
 *
 * @return {object} ciritcal.css for inlining.
 */
function criticalTask() {
  return gulp
    .src('./css/main.css')
    .pipe(critical({
      out: 'critical.css',
      url: 'http://ladislavpapp.test',
      width: 1024,
      height: 768,
      strict: true,
      userAgent: 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
    }))
    .pipe(gulp.dest(paths.css));
}

/**
 * JavaScript Task
 *
 * Currently there is only one JavaScript task (no separated for dev and prod).
 * @return {object} Linted (auto fixable, warnings printed to console about
 * others) and minified JavaScript files.
*/
function scriptsTask() {
  return gulp
    .src(paths.jsSrc)
    .pipe(eslint({ fix: true }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .pipe(uglify())
    .pipe(gulp.dest(paths.jsDist))
    .pipe(browserSync.stream());
}

/**
 * JavaScript:Linting Task
 *
 * @return {object} Linted (auto fixable, warnings printed to console about
 * others) JavaScript files.
*/
function scriptsLintTask() {
  return gulp
    .src(paths.jsSrc)
    .pipe(eslint({ fix: true }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
}

/**
 * Twig Task
 *
 * @return {object} Watched twig template files.
*/
function twigTask() {
  return gulp
    .src(paths.twig)
    .pipe(browserSync.stream());
}

/**
 * Markdown Task
 *
 * @return {object} Watched markdown (content) files.
*/
function markdownTask() {
  return gulp
    .src(paths.markdown)
    .pipe(browserSync.stream());
}

/**
 * BrowserSync Task
 *
 * Watching Sass and JavaScript source files for changes.
 * @prop {string} proxy Change it for your local setup.
 * @param {function} done Changed event.
 */
function browserSyncTask(done) {
  browserSync.init({
    proxy: 'ladislavpapp.test',
    open: false,
    browser: [
      'Google Chrome',
    ],
  });
  gulp.watch(paths.sass, sassDevTask);
  gulp.watch(paths.jsSrc, scriptsTask);
  gulp.watch(paths.twig, twigTask);
  done();
}

// Define complex tasks
const compileTask     = gulp.parallel(sassDevTask, scriptsTask);
const compileProdTask = gulp.parallel(sassProdTask, scriptsTask);

// export tasks
exports.default = gulp.series(cssCleanTask, compileTask, browserSyncTask);
exports.prod = gulp.series(cssCleanTask, compileProdTask);
exports.critical = criticalTask;
exports.lint = gulp.parallel(sassLintTask, scriptsLintTask);
exports.vendors = copyVendorTask;
exports.sassDev = gulp.series(cssCleanTask, sassDevTask);
exports.sassProd = gulp.series(cssCleanTask, sassProdTask);
exports.sassLint = sassLintTask;
exports.scripts = scriptsTask;
exports.scriptsLint = scriptsLintTask;
exports.watch = browserSyncTask;
