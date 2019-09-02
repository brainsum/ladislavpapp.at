# Ladislavpapp Theme

A mobil-first* responsive theme for LadislavPapp website. Builted with
[Gulp.js 4](https://gulpjs.com/) and based on
[Krisztian Pinter](kpinter@brainsum.com)'s own SASS framework:
[Shake.sass](https://keeteean.github.io/shake.sass/).

> *Note: Because it is just a quick recreation of a desktop-only predecessor
from 2010, not fully designed as mobile-first method.

## Getting starting with theme

To get working with the theme, you need to have installed
[nodejs](https://nodejs.org/en/) and [Gulp CLI
globally](https://gulpjs.com/docs/en/getting-started/quick-start#install-the-gulp-command-line-utility). Then you can install all local node packages:

``` bash
cd user/themes/ladislavpapp
npm install
```

When it's finished open up `gulpfile.js` and set your local domain for
browsersync.

Then you can start developing with:

- `npm start` or `gulp`: compile SASS, JS, watching changes and reload the browser
tabs.
- `npm run prod` or `gulp prod`: run it before commit: it will create the
minified version of CSS and JS.

The prod task will create a separeted css for lager screens. After prod task, please run `gulp critical` task too to generate
critical CSS for above the fold. Unfortunately the used critical plugin can't
move the generated `csscritical.css` to given place, so please move it by manual
it from theme's root to `templates/_inline` direcory!

_There are more gulp tasks, check them out in `package.json` and `gulpfile.js`._

## Structure

- `[css]`: compiled css, as usual
- `[fonts]`: custom web fonts
- `[images]`: all theme-related static graphics
- `[js]`: all custom theme JavaScript, currently not used
- `[sass]`: our source stylesheets
- `[templates]`: all twig templates
- `[vendors]`: 3rd party frontend libraries
- `.browserslistrc`: list of supported browsers for prefixing
- `.eslintignore`: JavaScript files what not checked by ESlint
- `.eslintrc.json`: ESlint config file for JavaScript checking
- `.stylelintrc.json`: StyleLint config file for SASS/CSS checking
- `blueprints.yaml`: Grav theme config file
- `gulpfile.js`: Gulp.js config file
- `ladislavpapp.php`: our custom PHP functions
- `package.json`: contains all node related configuration.

Other files related to Theme generator or needed for contrib themes.

## Working with Twig files

All HTML code, DOM generated from Twig templates and markdown files from
`user/pages/`. Here the most pages are simple ones generated from
`default.html.twig`. This file is a page template file with is extended the
`partials/base.html.twig`. This base template contains the full `<head>`, CSS
and JS include and all common sections.

Other component-like templates ex. navigation comes from `partials` subdirectory.
There are two special pages: audio and gallery. Audio is a modular page: it can
be consist of multiple sections aka modules, but it has only one: audio: here
we can list all audio contents. In the gallery page, we list all images from
`/user/pages/04.photogallery/`.

## Working with Sass files

The theme based on [Shake.sass](https://keeteean.github.io/shake.sass/), so here
all Sass files are organized be ITCSS:

- `[1.settings]`: all global settings, variables: _no any CSS output_
- `[2.tools]`: all SASS functions and mixins: _no any CSS output_
- `[3.base]`: generic theming: CSS reset, elements, fonts: _first layer what generated CSS output_
- `[4.objects]`: for general structure/layout
- `[5.components]`: the most of theming comes here
- `[6.utilities]`: CSS class based theming for special purposes

Additionally, we use BEM, BEMIT for class names.

## About code quality tools

We use Drupal coding standards here too with Stylelint and ESlint. Strongly
recommend to set them up in your IDE, but when you run the `prod` or a lint task
it will be warned you about errors too.
