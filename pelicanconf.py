#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals

AUTHOR = 'Frank Corso'
SITENAME = "Frank's Blog"
SITESUBTITLE = 'Data lover | Python dev'
SITEURL = ''
THEME = 'theme'
GRAVATAR = 'https://secure.gravatar.com/avatar/3c79ff484379feb07f575dadee9b3562?s=100'
PATH = 'content'
TIMEZONE = 'America/New_York'
DEFAULT_DATE_FORMAT = '%B %d, %Y'
DEFAULT_LANG = 'en'

# Social Networks
TWITTER = 'https://twitter.com/fpcorso'
GITHUB = 'https://github.com/fpcorso'
INSTAGRAM = 'https://www.instagram.com/fpcorso/'

# Feed generation is usually not desired when developing
FEED_ALL_ATOM = None
FEED_ALL_RSS = 'feeds/all.rss.xml'
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None

# Blogroll
LINKS = (('You can modify those links in your config file', '#'),)

# Navigation settings
DISPLAY_CATEGORIES_ON_MENU = False
DISPLAY_PAGES_ON_MENU = True
MENUITEMS = (('Topics', 'categories.html'),)

DEFAULT_PAGINATION = False

# Uncomment following line if you want document-relative URLs when developing
#RELATIVE_URLS = True