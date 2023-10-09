Title: Deploying Your Pelican Static Site To Netlify
Date: 2020-10-25 10:20
Category: Python
Tags: blog, tutorial, pelican
Series: Setting Up A Pelican Site
Slug: deploying-your-pelican-static-site-to-netlify
Authors: Frank Corso
Summary: Ready to deploy your static site built by Pelican? Learn how to deploy to Netlify!
Status: published

In [my previous article](https://frankcorso.dev/setting-up-pelican-static-site-generator.html), I wrote about how to create a Pelican site. But, creating a site is only half the setup. You need to host the site somewhere in order for people actually to see it.

There are many different ways to host a site including: hosting on GitHub Pages, AWS, and Digital Ocean. But, one of the simplest solutions for a static site is using [Netlify](https://www.netlify.com). Even better, they have a free plan!

## Add A Requirements File
First, we want to make sure we have our `requirements.txt` file added to our project. This is a standard file in Python projects to ensure that the environment the script is run in contains all the dependencies needed.

Netlify will install the dependencies (specifically Pelican) when deploying, so it's important we have this file.

The file itself only needs to have pelican, but you may need to add others if you have added other packages for running your site.

```
pelican[Markdown]
```

## Setting Up Your GitHub Repo
In order to continuously deploy your site over to Netlify, you will want to set up a repo on GitHub that contains your site. This repo can be public or private. 

Since we will be building the files when deploying, you can ignore the `output` directory if you want to do so. 

## Creating Your Netlify Account
If you haven't already, you will need to create a new Netlify account. You can go over to [their signup page](https://app.netlify.com/signup) and sign in with GitHub:

![Netlify sign up page]({static}/images/deploying-your-pelican-static-site-to-netlify/netlify-signup.png)

Once signed up, you will need to grant Netlify access to your GitHub repos. You can either grant Netlify access to all repositories or just grant access to your specific repo for the site.

![Permissions needed for Netlify]({static}/images/deploying-your-pelican-static-site-to-netlify/netlify-github-permissions.png)

## Setting Up Deployment

Next, if Netlify did not start the "Create a new site" wizard automatically (or if you already had a Netlify account), you will need to click the "New site from Git" button.

![The 'sites' tab in Netlify showing a "new site from git" button.]({static}/images/deploying-your-pelican-static-site-to-netlify/netlify-new-site-from-git.png)

On the next screen, you may need to click the GitHub button. From there, you should see a place to select your site's repo.

![New site wizard showing a selection of repositories to choose from.]({static}/images/deploying-your-pelican-static-site-to-netlify/netlify-select-repo.png)

For this site, I will select my `fpcorso/example-pelican-site` repo. Once selected, select which branch to deploy from. In most cases, you will want to leave this the default branch, usually `master` or `trunk`.

![Deploy settings for the site showing branch to deploy set to master.]({static}/images/deploying-your-pelican-static-site-to-netlify/netlify-deploy-settings.png)

Scroll down to the "Basic build settings" section. For "Build command" enter in `pelican content -s publishconf.py`. This will build your output files using the publish configuration.

In the "Publish directory" setting, enter in `output/`.

![Basic build settings with build command and publish directory filled in.]({static}/images/deploying-your-pelican-static-site-to-netlify/netlify-basic-build-settings.png)

Click the "Show advanced" button. 

Since the newer versions of Pelican require Python 3.7+, we need to make sure Netlify uses a recent version of Python. By default, it currently doesn't, which will cause errors when building your site, causing the deployment to fail.

Netlify uses environment variables to allow you to switch versions of its available platforms. Right now, the newest Python version available in Netlify is 3.7 so we will use that. Review Netlify's [manage dependencies docs if you want to know more](https://docs.netlify.com/configure-builds/manage-dependencies/#python).

Click the "New variable" button and enter in `PYTHON_VERSION` and set it to 3.7.

![Advanced build settings with 1 environment variable set.]({static}/images/deploying-your-pelican-static-site-to-netlify/netlify-advanced-build-settings.png)

Now that we have the settings entered, click the "Deploy site" button.

You should see your new site in Netlify, and the deployment should be starting up.

![Site overview showing a new site with a build starting up.]({static}/images/deploying-your-pelican-static-site-to-netlify/netlify-new-site-starting-up.png)

Depending on the size of your site, the build may take a few minutes. Once finished, it should say "Published" and a URL should be available.

![Site overview showing site is published and URL is now available.]({static}/images/deploying-your-pelican-static-site-to-netlify/netlify-site-deployed.png)

Your site is now deployed!

Any time you push a change to the `master` branch (or whichever one you specified), you will see a new build appear in the site overview. Once built, you will automatically see your changes go live.

## Next Steps
There are a lot of things you can do from here, but a few steps I recommend next would include:

1. Using the "Domain settings" to point a custom domain to your site instead of using the autogenerated one. ([See Netlify's docs on domain management](https://docs.netlify.com/domains-https/custom-domains/))
2. Explore moving your build settings and environment variables to a `netlify.toml` file so you can keep all configuration inside the code. ([See Netlify's docs on file-based configuration](https://docs.netlify.com/configure-builds/file-based-configuration/))
3. Set up deploy notifications so you receive an alert if a deployment fails. ([See Netlify's docs on deploy notifications](https://docs.netlify.com/site-deploys/notifications/#outgoing-webhooks-and-notifications))

Now, go share your deployed site with the world!
