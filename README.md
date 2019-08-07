# LadislavPapp website

It's a [Grav CMS](https://getgrav.org) based multilingual personal website of
musician Ladislav Papp. Here you can find all the necessary information to
working with this website.

## Why Grav CMS?

Although originally we want a static HTML5 website with some PHP functions for
modular structure and language switcher later stick with the open-source Grav
CMS. GRAV is a flat-file CMS with an optional admin UI. Flat-file means no
database, all information stored in markdown files and YAML configuration files,
so everything in Git, everything version-controlled! Although we can install an
admin interface additionally, it isn't necessary we can work only in files.
Because we mostly work with Drupal,

## Grav was an easy choice:

- free and open-source (and updated very often)
- written in PHP (we can use the latest PHP7)
- use `composer` as backend package management
- has a built-in [CLI named `bin/grav`](https://learn.getgrav.org/16/cli-console) (like Drush)
- use `Twig` for templating
- all configuration and local variables stored in `YAML` files
- we can use `.env` files for environment overwrites
- use base theming/plugin developing system (overwrites, entends)
- we can use a pipeline system for loading css/js similar in Drupal
- content types
- image styles

## Advantages over Drupal

- no database (content and config) hassles
- everything in Git/version control
- frontend freedom
- doesn't need hacks core/plugins
- lighter footprint
- built-in features, like media browser or media player

## Content editing

_You can find all up-to-date indormation in official
[Grav documentation](https://learn.getgrav.org/16/content), but here is the
summary:_

### Where are the contents?

Everything that we working in stored in the `/user` directory. We don't need and
doesn't allow to modify anything outside this directory or **those
modifications will be lost on next update!**

All content lives in `/user/pages/` directory organized by subdirectories. A
directory represents a single page of the site. All directory name starts with a
number: this number will define the order in the navigation menu. These
directories contain the content of a single page such as:

- a markdown file for all text-based data*
- any attached media file (ex: gallery images, documents, audio or video files)
- subdirectories (started with an underscore (`_`)) for page sections

*Because this is a multilingual website here are multiple markdown files for
each language.

>! CAUTION: The markdown file name is the corresponding page template in our theme

### How can I edit a page?

A markdown file has two parts:

- YAML frontend matter for all meta information and page variables
- simple page content in [markdown syntax](https://learn.getgrav.org/16/content/markdown).

#### The YAML frontend matter

The `frontend matter` or `headers` contains all meta-information about the current
page in YAML format. It begins and ends with three dashes (`---`) in a new line.
There are some obligatory data, like `title`, but we can add many more, like
`slug`, menu item title, body class or `date`. You can find all in
[Grav documentation](https://learn.getgrav.org/16/content/headers).

Furthermore, we can define our custom variables too. For example, if the page
content needs a specific DOM structure, we store all information here then print
them out in our theme's twig page template.

#### Markdown content

The markdown part contains all static content. We can write any text, lists,
tables or embed images what [markdown syntax](http://daringfireball.net/projects/markdown/)
allowed to us. Grav supports the [Markdown Extra](https://michelf.ca/projects/php-markdown/extra/) too!

>! The markdown part is obligatory if it's empty the page will be blank!

**Some more special solutions:**

- if we want to add a CSS class or other HTML attribute to an element, use curly
brackets: `# Home {.c-page__title}`
- if an `<ul>` list begins with the year (number followed by a dot), it will be
converted to `<ol>`, to avoid that we have to escape that dot: `- 1998\. some text`
- you can use any HTML syntax too for special markups, like phone links:
`<a href="tel:0043 676 5862175">0043 676 5862175</a>`
- for manual line breaks we can use `<br>`, `\`, _double space_ or `&nbsp;`
- to highlighting text (and themed in CSS) use `<mark>`
- for URLs put the visible text in square brackets and the link in normal brackets,
like: `E-mail: [ladislav@duopapp.at](mailto:ladislav@duopapp.at)`
- images are URLs too, but begin with an exclamation: `![Minion](http://octodex.github.com/images/minion.png)`

### Item listing

There are three types of pages in Grav:

- simple single pages
- lister pages
- modular pages

The last two ones working similarly, but in this site, we use only modular
pages. In these pages, we define more sections what are listed or embed in a single
page. We need for that some special attribute in the parent's page frontend matter
and some subdirectories begin with an underscore. Then we need to create new Twig
templates for printing them in our theme. The audio page works in this way. So,
we can edit and list each audio albums one-by-one.

## Sitebuilding

### Admin panel

We don't use [admin UI](https://learn.getgrav.org/16/admin-panel) here, but if
in the future needs for users, we can install it by `bin/gpm install admin`.

### Users

Currently doesn't need any user, but if in the future needs those will be stored
in `/user/accounts`.

### Configurations

All configuration is stored min a YAML file in `/user/config/` directory:

- `system.yaml`: this contains all global configuration inherited from
`/system/config/system.yaml` (doesn't contains all config by default)
- `site.yaml`: this store the global site metadata inherited from
`/system/config/site.yaml` (doesn't contain all config by default)

If we need to overwrite a contrib plugin's configuration, copy it to
`/user/config/plugins/` directory and change it according to your needs.

### Plugins and themes

There are many contrib plugins, themes and sceletons (these contains a sample
content as well) for Grav (OK, not compareable to Drupal). More plugins from the
Grav team (you don't need to install them as the core, only if you need them). You
can browse them [here](https://getgrav.org/downloads/plugins#extras) (or in CLI:
`bin/gpm index`) then install them by `bin/gpm install pluginname`. Thems are
similar, but here we use a custom theme named `ladislavpapp`.

### Site navigation

The navigation menu is very simple: it collects all pages from `/user/pages/`
order by ABC. Here we don't need more.

## Theme developing

In Grav, we need to use themes just like in Drupal. The default theme is the
Quark left here for reference. Altough our custom theme documented here are
some general knowledge.

### Structure

We have freehand how structure our theme, but there are some requirements:

- `themename.yaml` created and used by theme generator plugin
- `blueprints.yaml` contains theme configurations
- `themename.php` for custom theme functions
- `templates` directory for our twig files

Beside of these we have freehand to structuring our theme.

### Templates

We store all page type templates in the templates root like
`default.html.twig` or `gallery.html.twig`. The defult one is designed for the
simple single pages.

The common `components/sections` like templates are in `partials` subdirectory
while the `modules/sections` for modular pages are in `module` subdirectory.

### Variables

- `{{ config.site.title }}`: a global config variable from `/user/config/site.yaml`
- `{{ page.header.body_classes }}`: a page variable (from a markdown files's
frontend matter)
- `{{ page.content }}`: the full markdown content of the current page

### Shortcuts

- `theme://`: alias for current theme's root

### Including CSS and JavaScript assets

First all files need to be added to asset pipeline:

``` twig
{% block stylesheets %}
  {% do assets.addCss('theme://css/main.css', 20) %}
{% endblock %}
```

then print that out:

``` twig
{{ assets.css() }}
```

We can add css/js files only for a specific pages if we add them in page template:

``` twig
{% extends 'partials/base.html.twig' %}

{% block stylesheets %}
  {{ parent() }}
  {% do assets.addCss('theme://vendors/fslightbox/fslightbox.min.css', 10) %}
{% endblock %}

{% block javascripts %}
  {{ parent() }}
  {% do assets.addJs('theme://vendors/fslightbox/fslightbox.min.js', {priority: 10, group: 'bottom'}) %}
{% endblock %}
```

We can group (ex. load to header or footer) and priorize them too:

``` twig
{% do assets.addJs('theme://vendors/fslightbox/fslightbox.min.js', {priority: 10, group: 'bottom'}) %}
```
