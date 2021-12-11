---
Title: Lambda Capstone
Date: 2021-12-13 08:00
Tags: aws, lambda
Category: Python
Slug: lambda-capstone
Authors: Frank Corso
Summary: TBD
Description: TBD
Status: draft
---
 anINTRO

## Setting Up Our Twitter Keys

Before we can create our Twitter bot, we need to get our API keys and add them to our Parameter Store so that the bot can use them. 

### Creating Our Twitter App

First, make sure you have a Twitter account that you will tweet to. Then, go to [Twitter Developers Portal](https://developer.twitter.com/en) and sign in to your Twitter account. If you haven't already, you will need to accept the developer terms & conditions.

Once inside the developer portal, click the button to create a new project.

![Twitter developer portal with no projects listed. A Create Project button is in the middle.](/images/twitter-developer-portal-dashboard.png)

On the next screen, name your project.

![Tab for naming your project](/images/twitter-developer-name-project.png)

On the next screen, select a use case for the project. For this, you can select "Making a bot."

![Tab that asks "Which best describes you?" with a use case drop down currently showing "Making a bot"](/images/twitter-developer-use-case.png)

On the third screen, enter a description of your project.

![Project description tab with this text entered: "I am creating a sample bot that will tweet once per day saying how many days are left until next year."](/images/twitter-developer-project-description.png)

Once you click to go to the next screen, the developer portal will create your project and take you to the app creation screen. On this screen, enter the name of your app. For this bot, I used the same name as my project.

![A name your app screen with "Days Until Next Year" entered as the name.](/images/twitter-developer-name-app.png)

The next screen will show the app's API key and secret. Copy these keys for later. You can also regenerate these in the app settings if you lose them. Next, go to the app settings and update the app permissions to be "Read and Write" to allow your bot to create tweets.

![App settings screen with the App permissions section in view. The setting is set to "Read and Write".](/images/twitter-developer-app-permissions.png)

Lastly, go to the app's "Keys and tokens" tab. On this tab, you will need to generate the access token and secret. If you did not copy the app keys from the earlier screen, you can regenerate them here under the "Consumer Keys" section.

![The apps keys and tokens screen with sections for consumer keys and authentication tokens.](/images/twitter-developer-app-keys-tokens.png)

Great! We have our Twitter app set up and have the keys we need. Next, we need to add these keys to our Parameter Store.

### Adding Our Twitter Keys To Parameter Store

XXXXX

## Creating The Python Code

XXXXX

## Creating Our Lambda Function

XXXX

## Scheduling The Lambda Function

XXXX

## Next Steps

XXXX