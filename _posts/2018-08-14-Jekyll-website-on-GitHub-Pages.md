---
title: Jekyll website on GitHub Pages
---

Static websites some time ago made a comeback, and for a good reason. You do not need full blown framework made in server side language to make a simple site. Yet manual HTML writing can be tiresome. Hence the static website generator idea --- to write your content in a simple markup. Then a simple program will convert and glue it.

GitHub Pages supports Jekyll out of the box. This means you can upload your website and their servers will do the rest. You even get a free subdomain - `username.github.io`.

##  Installing Jekyll locally

Make sure you have Ruby installed, version 2.4.0 at least. Next, install bundler and Jekyll in terminal:

```sh
gem install bundler
gem install jekyll
```

Create an example website:

```sh
jekyll new website-name
cd website-name
bundle exec jekyll s -o
```

Your website should open in your default browser. You can change the theme in `_config.yml`. [Here](https://pages.github.com/themes/) you can check all themes supported by GitHub Pages.

If you want to make your website by hand, create it with `jekyll new-theme` command. Then you can either make your own reusable theme, or delete the `.gemspec` file and `gemspec` line in `Gemfile`. This will allow you to use Jekyll as a simple markdown and Sass compiler.

## File structure

`_config.yml` is the main configuration file. After editing it you need to restart server. Here you can make and edit global and configuration variables, as well as add plugins.

`Gemfile` is the declaration of dependencies. In general you want to have Jekyll and its plugins declared here.

`_site` is the generated website. Jekyll puts files for hosting here - do not edit them.

`index.html` or `index.md` holds your main page contents. Usually there is a loop to display some newest posts, or paginated list of all posts.

In `_posts` you put articles. The filename format is `date-name.md`, for example: `2021-05-19-Example-article.md`. There should be already an example post to help you make your own. If you don't know markdown yet, consult [this guide](https://guides.github.com/pdfs/markdown-cheatsheet-online.pdf).

Posts and sites in `.md` format can have front-matter --- a snippet on top of the document:

```yml
---
title: Example article
---
```

This way you can define post variables, such as tags.

If you have created a new theme, there will be also:

`_includes` holding html snippets.

`_layouts` with HTML scaffolds, e.g for posts.

And a `_sass` directory for css.

## Customizing website

If you want to use a theme, you have several choices. For project websites, the easiest is to use one of the supported themes. For personal webpage or blog, you can either download the theme or use the remote-theme feature.

For manual download, locate a theme on GitHub and download it. Then edit its `_config.yml`, prepare your posts and you are ready for deploy.

To use a remote theme, find a theme that supports it ([example](https://github.com/chauff/cse-theme#installation)). Next, edit your config:

```yml
baseurl: "/your-repository-name/"
remote_theme: author/theme-repo-name
```

## Deploying to GitHub Pages

Create a repository for your website. To host under `yourname.github.io` name it `yourname.github.io`. To host under `yourname.github.io/example` name it `example`.

Next, add and push the website to it. Then go to the repository settings, Pages, select master/main branch as a source and save. After next push your website should be live.

