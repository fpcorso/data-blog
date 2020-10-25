Title: Setting Up Pelican Static Site Generator
Date: 2020-09-01 10:20
Category: Python
Tags: blog, tutorial, pelican
Slug: setting-up-pelican-static-site-generator
Authors: Frank Corso
Summary: Interested in setting up a static site using Pelican? Check out how I set up this site!

I have been hearing about static site generators for a while but haven't really had a use for one yet. So, when I decided to start this new site, I knew I wanted to try one out.

However, I quickly realized there are a dozen good ones and then countless others beyond those. Most of my recent development experience has been with Python and Vue, so I was able to narrow it down to either ones that use Python or ones that use JavaScript.

From there, since I have no experience with React, I narrowed down further to [VuePress](https://vuepress.vuejs.org) on the JavaScript side or [Pelican](https://blog.getpelican.com) or [Nikola](https://getnikola.com) on the Python side. After experimenting with each of them, I decided to go with Pelican for now.

## What is Pelican?
Pelican is a static-site generator that has been around since 2010 and allows one to create content in Markdown or reStructuredText. It is written in Python and utilizes Jinja templates for parsing and creating the final HTML pages.

## Setting Up a Pelican Site
To get started with Pelican, you will need to ensure that it is installed locally. Since I preferred creating content within Markdown, Pelican recommended this command:

`pip install pelican[Markdown]`

From there, you can go to the directory you are setting up in and use this command to get a skeleton site set up:

`pelican-quickstart`

This command will trigger a series of questions in the terminal to set up your site. For now, you can keep most of the defaults.

![Terminal showing several questions asked by Pelican]({static}/images/pelican-quickstart-questions.png)

Once you have finished answering the questions, you will see two new folders and two files.

![Directory showing two folders of content and output]({static}/images/pelican-quickstart-structure.png)

The `content` directory is where you will create your posts and pages. The `output` directory is where the site will be generated to.

The `pelicanconf.py` and `publishconf.py` files are where you can customize the settings and values Pelican uses to create your site. For example, within `pelicanconf.py`, you will be able to edit the values you entered during the quickstart.

![Pelican's settings file]({static}/images/pelican-pelicanconf-example.png)

Before you can see your new site, you need to create your first article. Go into the `content` directory and create a Markdown file. I'll call mine `my-post.md`.

Inside your content Markdown files, you will use a series of key and value pairs in the header to set up your content. Underneath, you will add your content.

```
Title: My first post
Date: 2020-06-01 10:20
Category: Python
Tags: blog, tutorial
Slug: my-first-post
Authors: Frank Corso
Summary: Check out my first post!

This is some super awesome content within my post!
```

In addition to this first post, we can create our first page. By default, Pelican will look for the `pages` directory inside `content` for any pages and automatically add them to the site's main navigation. I'll create an `about.md` file to set up a basic about page.

```
Title: About Me
Date: 2020-05-27 10:20
Slug: about
Authors: Frank Corso

Hey there! My name is Frank Corso and it's nice to meet you.
```

Once you have your Markdown files created, let's use `pelican content` to generate our content. By default, Pelican will use the built-in "simple" theme to generate your content and then place the HTML files into the `output` directory.

![The new HTML files are now within the output folder]({static}/images/pelican-site-output.png)

Once our content is created, we can use `pelican --listen` to set up a simple server so we can see our new content. By default, this will be at ` http://localhost:8000/`.

![Example site created by Pelican showing heading and first post]({static}/images/pelican-example-preview.png)

## Next Steps
You now have your basic site! You can now add more articles and more pages. The next big step will be to research either downloading or creating a theme. I found a [Pelican Themes site](http://pelicanthemes.com) which displays screenshots for a lot of pelican themes and links to GitHub repositories.

Alternatively, you can create your own [following the Pelican documentation](https://docs.getpelican.com/en/stable/themes.html).

Once you have theme files ready, you can add `THEME = 'THEMEDIRECTORY'` to the `pelicanconf.py` file to use your new theme instead of the default theme.

Now, get creating!