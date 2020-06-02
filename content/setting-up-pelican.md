Title: Setting Up Pelican
Date: 2020-06-01 10:20
Category: Python
Tags: blog, tutorial
Slug: setting-up-pelican
Authors: Frank Corso
Summary: Interested in setting up a static site using Pelican? Check out how I set up this site!

I have been hearing about static site generators for a while but haven't really had a use for one yet. So, when I decided to start this new site, I knew I wanted to try one out.

However, I quickly realized there are a dozen good ones and then countless others beyond those. Most of my development experience has been with Python and Vue, so I was able to narrow it down to either ones that use Python or ones that use JavaScript.

From there, since I have no experience with React, I narrowed down further to [VuePress](https://vuepress.vuejs.org) on the JavaScript side or [Pelican](https://blog.getpelican.com) or [Nikola](https://getnikola.com) on the Python side. After experimenting with each of them, I decided to go with Pelican for now.

## What is Pelican?
Pelican is a static-site generator that has been around since 2010 and allows one to create content in Markdown or reStructuredText. It is written in Python and utilizes Jinja templates for parsing and creating the final HTML pages.

## Setting Up a Pelican Site
To get started with Pelican, you will need to ensure that it is installed locally. Since I preferred creating content within Markdown, Pelican recommended this command:

`pip install pelican[Markdown]`

From there, you can go to the directory you are setting up in and use this command to get a skeleton site set up:

`pelican-quickstart`