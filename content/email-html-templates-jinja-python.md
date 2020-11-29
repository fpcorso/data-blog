Title: Using Jinja for HTML Email Templates in Python
Date: 2020-11-29 10:20
Category: Python
Tags: jinja, email, html
Slug: email-html-templates-jinja-python
Authors: Frank Corso
Summary: Instead of hardcoding your emails within Python, you can move them to HTML templates using Jinja!
Status: published

When creating emails in Python, I usually start by creating the email text within the Python code itself. This is quick and easy and gets the job done. 

For example, one of my original email functions in my SAAS app, [SiteAlert](https://sitealert.io), looked like this:

```
:::python
def send_new_site_user_email(user, site_url):
    """Sends an email to the user when they add a site."""
    subj = 'You added a site!'
    body = '<p>Hey {}!</p>'.format(user.first_name if user.first_name != '' else 'there')
    body += '<p>You just added a new site to your SiteAlert account: {}</p>'.format(site_url)
    body += """<p>Now, you can sit back and relax as SiteAlert begins monitoring your site for:</p>
       <ul>
          <li>Broken links</li>
          <li>Broken images</li>
          <li>Blacklists</li>
          <li>Accessibility</li>
          <li>And more!</li>
       </ul>
     <p>This may take some time, so feel free to go about your day. We will email if we find an issue.</p>
     <p>As always, feel free to reach out if you ever need anything!</p>
     <p>~Frank Corso</p>
     <p><a href="https://sitealert.io">SiteAlert</a></p>"""
    send_email(user.email, subj, body)
```

The `send_email` function I defined elsewhere and is only a wrapper for sending emails through Postmark. 

However, hardcoding the HTML into the Python code has some limitations. If you have anyone who wants to make changes to the emails but doesn't know Python, such as marketing or customer success, they cannot edit them here. Additionally, any time you make a change to the email, you risk breaking the code.

Instead, we can break these out into HTML files using [Jinja](https://palletsprojects.com/p/jinja/)! Jinja is a powerful templating engine that allows you to have dynamic content through variables, loops, blocks, and more. You can even extend templates to set up some "base" templates that all other templates build off of.

## Setting Up Jinja and the Templates Directory

First, we want to set up a directory that will hold the HTML templates for your emails inside your project. I created an `email_templates` directory, but you can name it anything that works for you.

Next, make sure Jinja is installed in your environment using:

`pip install Jinja2`

## Creating Your Main Template Function

Now that you have the directory set up, you will need some code to find the templates and render them.

First, import the relevant modules:

```
:::python
from jinja2 import Environment, PackageLoader, select_autoescape
```

Then, we will use Jinja's Environment to tell it where the template files are. In my case, the email templates directory is within our project module. For security, it is recommended to always have Jinja autoescape the templates for you.

```
:::python
env = Environment(
    loader=PackageLoader('project', 'email_templates'),
    autoescape=select_autoescape(['html', 'xml'])
)
```

Once we have our `env` variable, we can use that to create our template using:

```
:::python
template = env.get_template('your-template.html')
```

To create the final HTML, you can use the `render` method:

```
:::python
html = template.render()
```

Since these templates will be dynamic, Jinja will let you pass kwargs to `render` which will get passed to the template. For example, we use the user's name in the email, so it looks like this:

```
:::python
html = template.render(first_name="Steve")
```

To make this re-usable and easier to implement, I wrap all of this in a function within my utils.py file. Here is the final code for this part:

```
:::python
from jinja2 import Environment, PackageLoader, select_autoescape

def send_template_email(template, to, subj, **kwargs):
    """Sends an email using a template."""
    env = Environment(
        loader=PackageLoader('project', 'email_templates'),
        autoescape=select_autoescape(['html', 'xml'])
    )
    template = env.get_template(template)
    send_email(to, subj, template.render(**kwargs))

def send_email(to, subj, body):
    """Sends an email."""
    # Send the finalized email here.
```

## Creating Your First Template

Now that we have our function created, let's create our first template so we can see how this works out. I will convert the "new site" email from the top of this post into our first template.

First, we can create a 'new_site.html' file in our `email_templates` directory. Inside our template, we want to say hey to the user and use either their first name or say "there", like in the original function. To do this, we use `{{ }}` syntax for the [Jinja variables](https://jinja.palletsprojects.com/en/2.11.x/templates/#variables), and we will use a [Jinja filter](https://jinja.palletsprojects.com/en/2.11.x/templates/#filters) for setting the default. The `default()` built-in filter takes a second parameter where, if set to true, will use the default when the variable evaluates to false, such as empty strings. This will look like this:

`{{ name|default('there', true) }}`

From there, we also list the URL, but that is easier as we are not applying any filters to it:

`{{ url }}`

Our final template file looks like this:

```
<p>Hey {{ name|default('there', true) }}!</p>
<p>You just added a new site to your SiteAlert account: {{ url }}</p>
<p>Now, you can sit back and relax as SiteAlert begins monitoring your site for:</p>
<ul>
    <li>Pagespeed</li>
    <li>Broken links</li>
    <li>Broken images</li>
    <li>Blacklists</li>
    <li>Accessibility</li>
    <li>And more!</li>
</ul>
<p>This may take some time, so feel free to go about your day. We will email if we find an issue.</p>
<p>As always, feel free to reach out if you ever need anything!</p>
<p>~Frank Corso</p>
<p><a href="https://sitealert.io">SiteAlert</a></p>
```

As you can see, it will be much easier for someone who only knows HTML to hop in and make changes to the email.

## Putting It All Together

Now that we have everything created, let's try to use our new template.

The function we defined earlier takes `template, to, subj, **kwargs` as arguments. The `kwargs` are then passed to the `render()` method.

So, within our code for adding the new site, we will call this function using this:

```
:::python
send_template_email(
    template='new_site.html',
    to=user.email,
    subj='You added a site!',
    name=user.first_name,
    url=site.url
)
```

Our `user` and `site` objects are from our ORM (peewee) but you can pass any strings or variables to the kwargs.

We have now set up our email to be sent using our HTML template!

## Next Steps

Now that you have the basic template created, try to convert some more of our emails into the HTML templates. If you want to take it a step further, look into how to create a base template which you can then extend for the individual emails.