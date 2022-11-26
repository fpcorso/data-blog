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

## Setting Up A Static Site

CREATING STATIC SITE

SETTING UP APP PLATFORM STATIC SITE

CONCLUSION



\*\* Remember to add affiliate link