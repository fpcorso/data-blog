---
Title: Scraping Web Pages in Python Using Requests and Beautiful Soup
Date: 08-01-2024 09:00:00
Tags: html, requests, beautifulsoup
Category: Data Engineering
Slug: scraping-websites-requests-beautiful-soup
Authors: Frank Corso
Summary: Do you need to extract content or links from a webpage programmatically? You can do so in Python using Requests and Beautiful Soup!
Description: Do you need to extract content or links from a webpage programmatically? You can do so in Python using Requests and Beautiful Soup!
Status: draft
---

Do you need to extract content or links from a webpage programmatically? You can do so in Python using Requests and Beautiful Soup!

## How Does Web Scraping Work?

Before we get into the code, let's think through how this process works.

If we want to scrape a specific page, we need to make an HTTP request to get the web page. We then need to search the page for the HTML element(s) we want to find and extract the information.

When we are creating a web scraping script, this is often for many URLs. So, we'll have some list of web pages that we want to cycle over to extra information out of and then do something with that data.

For the first step of getting the web page, there are many ways to do this but the `requests` package is one of the most popular choices and one I normally try using first.

## Using Requests

To get started, first we need to install requests:

```shell
pip install requests
```

Now, we can import it into our script and use its `get` method. This creates an HTTP GET request to the given URL.

```python
import requests

requests.get('https://frankcorso.dev')
```

If we need to make other type of HTTP requests, such as POST or PUT, requests also has methods for those.

Sometimes, you may need to supply additional details, such as some query args such as `?post_id=65` or some POST data. The requests methods accept additional data to add to the request.

```python
import requests

requests.get('https://frankcorso.dev', params=[('post_id', 4)])
```

These methods return a response object which we can use to check the status code and get the text (or source) of the web page.

```python
import requests

response = requests.get('https://frankcorso.dev')

print(response.status_code)
print(response.text)
```

There's a lot more we could get from the response, such as cookies and header data, but we won't need that for this. You should [check out their response documentation](https://docs.python-requests.org/en/latest/user/quickstart/#response-content) if you want to know more about it.

We can use this response text to then look for the data we need. To do this, we first need to set up Beautiful Soup.

## Using Beautiful Soup

To get started, we first need to install the Beautiful Soup package:

```shell
pip install beautifulsoup4
```
Now, we can create our "soup" which requires a specific parser so it knows how to break down the given text.

```python
from bs4 import BeautifulSoup

scraper_soup = BeautifulSoup(response.text, 'html.parser')
```

This soup object allows us to search for different elements and work with them. First, let's search for the h1 element.

```python
scraper_soup.find('h1')
```

This will return a page element that we can work with. For example, we can search just within its descendants or we can use different methods for testing its contents.

For web scraping, we often use its `get_text()` method for extracting out the text.

```python
scraper_soup.find('h1').get_text()
```

Sometimes, we need to search by a class or ID instead of the element itself. We do that by passing different parameters:

```python
scraper_soup.find(class_='entry-title').get_text()

scraper_soup.find(id='twitter-link').get_text()
```

We can also find all matching elements using the `find_all` method:

```python
scraper_soup.find_all('a')
```

This will return a list of page elements we can then cycle over. For example, we can cycle over all anchor elements for those that have an href attribute that starts with 'https://facebook.com':

```python
for link in scraper_soup.find_all('a'):
    if not link.has_attr('href'):
        continue

    if link['href'].startswith('https://facebook.com'):
        print(f"Found potential FB link: {link['href']}")
```

Of course, if we were actually looking for social links, we'd probably want something more that searches for certain domains in the href.

## Putting It All Together

Now, let's assume we have a list of URLs that we want to scrape for potential facebook links. We can put everything together like this:

```python
import requests
from bs4 import BeautifulSoup

urls = [
    'https://frankcorso.dev',
    'https://frankcorso.me'
]
extracted_data = {}

for url in urls:
    # Set up our current URL as empty list to add to.
    extracted_data[url] = []
    
    # Get the web page.
    response = requests.get(url)
    
    # Check that status code.
    if response.status_code != 200:
        print(f"Error getting web page for {url}! Status code: {response.status_code}")
        continue

    # Create our soup object.
    scraper_soup = BeautifulSoup(response.text, 'html.parser')

    # Cycle over links looking for what we are looking for.
    for link in scraper_soup.find_all('a'):
        # Some anchor elements don't have href attributes so I always check here first.
        if not link.has_attr('href'):
            continue
    
        # If it's what we want, add it to our object
        if 'facebook.com' in link['href']:
            extracted_data[url].append(link['href'])

print(extracted_data) # Do something with found data!
```

We have now scraped some data from web pages! Of course, if we were actually scraping for social pages, we'd want to have some validation process after this. And, if we were scraping some text data, we'd normally then do something with that data beyond printing it out.

## Next Steps

Now that we've scraped some data, there are a few other considerations:

* Many sites require JavaScript to use. So, `requests` will not work there. Instead, you will need to replace it with `selenium` or similar
* Some sites require authentication so you would need to review `requests` documentation for exploring those parameters.
* If you are scraping a lot of webpages within the same site or sites managed by similar security systems or networks, you might get blocked or rate limited. You can use `sleep(1)` or similar to introduce small waits. Or, you can look into use proxies to do your scraping through.