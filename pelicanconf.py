#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals

AUTHOR = 'Frank Corso'
SITENAME = "Frank's Blog"
SITESUBTITLE = 'Data lover | Python dev'
SITEURL = 'localhost:8000'
RELATIVE_URLS = True
THEME = 'theme'
GRAVATAR = 'https://secure.gravatar.com/avatar/3c79ff484379feb07f575dadee9b3562?s=100'
PATH = 'content'
TIMEZONE = 'America/New_York'
DEFAULT_DATE_FORMAT = '%B %d, %Y'
DEFAULT_LANG = 'en'
DEFAULT_PAGINATION = False

STATIC_PATHS = ['admin']
TEMPLATE_PAGES = {'admin/index.html': 'admin/index.html'}

# Social Networks
TWITTER = 'https://twitter.com/fpcorso'
GITHUB = 'https://github.com/fpcorso'
INSTAGRAM = 'https://www.instagram.com/fpcorso/'
DEVTO = 'https://dev.to/fpcorso'

# Navigation settings
DISPLAY_CATEGORIES_ON_MENU = False
DISPLAY_PAGES_ON_MENU = True
MENUITEMS = (('Topics', 'categories.html'),)

# Pelican Sitemape plugin
SITEMAP = {
    "format": "xml",
    "priorities": {
        "articles": 0.5,
        "indexes": 0.5,
        "pages": 0.5
    },
    "changefreqs": {
        "articles": "monthly",
        "indexes": "daily",
        "pages": "monthly"
    }
}

# Pelican SEO plugin
SEO_REPORT = True
SEO_ENHANCER = True
SEO_ENHANCER_OPEN_GRAPH = True
