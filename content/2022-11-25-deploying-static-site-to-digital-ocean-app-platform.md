---
Title: Deploying static site to digital ocean app platform
Date: 11-25-2022 08:00:00
Tags: digital ocean
Category: python
Slug: deploy-static-site-digital-ocean-app-platform
Series: ""
Authors: Frank Corso
Summary: TBD
Description: TBD
Status: draft
---
I recently moved this site from Netlify to Digital Ocean's App Platform to keep all my sites together. Digital Ocean offers 3 free static sites on their app platform so it's free to host this site there.

## Digital Ocean's App Platform

Digital Ocean released their "App Platform" which is a managed infrastructure system similar to Heroku. You can set up your "app", database, workers, and more without needing to set up and maintain the underlying infrastructure.

As someone who tries to avoid maintaining infrastructure, I have started using their app platform for several of my recent projects, such as my proof-of-concept for [LiteSurveys](https://litesurveys.com). 

Each "app" you set up has its own pricing plan and has different "components" which are the different pieces of your site. For example, on a recent project, I had a Fast API app as the main component and then a redis queue worker as another component. 

On their "starter" plan, you can have up to 3 static sites for free.

## Preparing Your Code

For this site, I use the Pelican static site generator. The process will be mostly the same if you use a different static site generator except you may tweak the build step.

The app platform [uses buildpacks](https://docs.digitalocean.com/products/app-platform/reference/buildpacks/) to create the environment. It detects which to use depending on your code.

### Add A Requirements File (or similar for your code)

First, we want to make sure we have our `requirements.txt` file added to our project. This is a standard file in Python projects to ensure that the environment the script is run in contains all the dependencies needed.

If you are using another language, such as JavaScript, you'll add the similar requirements file, such as `package.json`, needed for your code's environment.

Digital Ocean will install the dependencies (specifically Pelican) when deploying, so it's important we have this file.

The file itself only needs to have pelican, but you may need to add others if you have added other packages for running your site.

```
pelican[Markdown]
```

### Setting Up Your GitHub Repo

In order to continuously deploy your site over to the app platform, you will need to set up a place for it to pull the code from. The easiest way is to set up a GitHub repo. The app platform can also pull from a GitLab repo or from the Digital Ocean Container Registry.

Since we will be building the files when deploying, you do not need to commit the output or built files. 

## Creating Your App

If you do not have a Digital Ocean account, you will need to create one first.

_Consider [using my referral link](https://m.do.co/c/f21fe7d1f89d) to get a $200 credit in your account for other projects._

Once you have your account, log in and go to the Apps page.

![Digital Ocean's page to manage apps.]({static}/images/digital-ocean-app-platform.png)

On the apps page, click to create your first app. On the first page in the setup wizard, select where your code is. You may need to connect your GitHub (by choosing GitHub) or clicking to edit GitHub permissions if you've connected it before with different repos.

Once you selected a repo, you will need to select which branch

CREATING STATIC SITE

SETTING UP APP PLATFORM STATIC SITE

CONCLUSION



\*\* Remember to add affiliate link