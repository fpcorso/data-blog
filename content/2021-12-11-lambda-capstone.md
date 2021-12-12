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

![Twitter developer portal with no projects listed. A Create Project button is in the middle.]({static}/images/twitter-developer-portal-dashboard.png)

On the next screen, name your project.

![Tab for naming your project]({static}/images/twitter-developer-name-project.png)

On the next screen, select a use case for the project. For this, you can select "Making a bot."

![Tab that asks "Which best describes you?" with a use case drop-down currently showing "Making a bot"]({static}/images/twitter-developer-use-case.png)

On the third screen, enter a description of your project.

![Project description tab with this text entered: "I am creating a sample bot that will tweet once per day saying how many days are left until next year."]({static}/images/twitter-developer-project-description.png)

Once you click to go to the next screen, the developer portal will create your project and take you to the app creation screen. On this screen, enter the name of your app. For this bot, I used the same name as my project.

![A name your app screen with "Days Until Next Year" entered as the name.]({static}/images/twitter-developer-name-app.png)

The next screen will show the app's API key and secret. Copy these keys for later. You can also regenerate these in the app settings if you lose them. Next, go to the app settings and update the app permissions to be "Read and Write" to allow your bot to create tweets.

![App settings screen with the App permissions section in view. The setting is set to "Read and Write".]({static}/images/twitter-developer-app-permissions.png)

Lastly, go to the app's "Keys and tokens" tab. On this tab, you will need to generate the access token and secret. If you did not copy the app keys from the earlier screen, you can regenerate them here under the "Consumer Keys" section.

![The app's keys and tokens screen with sections for consumer keys and authentication tokens.]({static}/images/twitter-developer-app-keys-tokens.png)

Great! We have our Twitter app set up and have the keys we need. Next, we need to add these keys to our Parameter Store.

### Adding Our Twitter Keys To Parameter Store

If you haven't used Parameter Store before, you can review what it is and how to use it by [reading my "Passing Credentials to AWS Lambda Using Parameter Store" article](https://frankcorso.dev/passing-credentials-aws-lambda-parameter-store.html).

To begin, log into your AWS console and go to the AWS System Manager.

![AWS Systems Manager dashboard with navigation along the left side with links for cloudwatch dashboard, application manager, and parameter store.]({static}/images/aws-systems-manager-dashboard.png)

Click on the "Parameter Store" page from within the menu to get to your values. If you do not have any values yet, you will see a landing page. In here, you will want to create 4 different parameters. You can name these whatever you would like but make a note of which name you use for which secret as we will use the names to retrieve them.

For the Twitter secrets, I will name them `twitter_api_key`, `twitter_api_secret`, `twitter_access_token`, and `twitter_access_secret`.

For each of these, you can use the "Standard" tier. You will also want to use the "SecureString" type to keep these encrypted. Keep the defaults for everything else.

Lastly, enter the value for the parameter.

![The second part of the create parameter page showing the type set to "secure string" and KMS key source kept on default of my current account.]({static}/images/aws-secrets-manager-create-parameter-2.png)

Once filled in, click to create the parameter. Once you create all 4 parameters, it will look like this:

![AWS System Manager's Parameter Store with 4 parameters listed. Each on standard tier and as a secure string type.]({static}/images/aws-parameter-store-twitter-keys.png)

Great! Our Twitter keys are generated and in a place we can use them.

## Creating The Python Code

Now, let's create our Python code for the Lambda function. So we do not need to change any of the Lambda runtime settings, we will use the default filename of `lambda_function.py`.

While we could write all the code within one main function, I'll separate out two other functions to make it easier to test each piece locally as well as make it easier to add to it in the future.

To start, we can add our imports:

```
:::python
import boto3
import datetime
import tweepy
```

The [boto3 package](https://boto3.amazonaws.com/v1/documentation/api/latest/index.html) is the AWS SDK that will allow us to pull in parameters. The [Tweepy package](https://www.tweepy.org/) is a library that interacts with the Twitter API.

Next, we will define a `get_twitter_keys` function that will get the secrets from Parameter Store and return them. If we are only pulling one parameter, we can use the `get_parameter` method and store its response. However, to pull 4 values, we can use the `get_parameters` method to pull all the ones we need.

```
:::python
def get_twitter_keys():
    """Retrieve secrets from Parameter Store."""
    # Create our SSM Client.
    aws_client = boto3.client('ssm')

    # Get our keys from Parameter Store.
    parameters = aws_client.get_parameters(
        Names=[
            'twitter_api_key'
            'twitter_api_secret',
            'twitter_access_token',
            'twitter_access_secret'
        ],
        WithDecryption=True
    )

    api_key = ''
    api_secret = ''
    access_token = ''
    access_secret = ''

    # Cycle over the returned parameters and set the right value to each variable.
    for parameter in parameters['Parameters']:
        if parameter['Name'] == 'twitter_api_key':
            api_key = parameter['Value']
        if parameter['Name'] == 'twitter_api_secret':
            api_secret = parameter['Value']
        if parameter['Name'] == 'twitter_access_token':
            access_token = parameter['Value']
        if parameter['Name'] == 'twitter_access_secret':
            access_secret = parameter['Value']

    return api_key, api_secret, access_token, access_secret
```

Next, we will define our `get_tweet` method which will create the text. To do this, we will calculate the days until the next year and then customize the text based on the number of days.

```
:::python
def get_tweet():
    """Creates our tweet."""

    # Calculate days until new year's day.
    next_year = datetime.datetime.now().year + 1
    new_year = datetime.datetime(next_year, 1, 1, 0, 0, 0)
    today = datetime.datetime.combine(datetime.date.today(), datetime.datetime.min.time())
    days_left = (new_year - today).days

    # Customize text based on the number of days until the new year.
    if days_left == 1:
        tweet = "Tomorrow is New Year's Day!"
    elif today.month == 1 and today.day == 1:
        tweet = f'Happy New Year!! Welcome to {today.year}! Only {days_left} until next year.'
    else:
        tweet = f'There are {days_left} days until {next_year}'

    return tweet
```

Lastly, we will create our `lambda_handler` method which is what we will have our Lambda function call. This method will call our two methods above and then create our new tweet.

```
:::python
def lambda_handler(event, context):
    """Main Lambda function"""

    api_key, api_secret, access_token, access_secret = get_twitter_keys()

    client = tweepy.Client(
        consumer_key=api_key,
        consumer_secret=api_secret,
        access_token=access_token,
        access_token_secret=access_secret
    )

    tweet = get_tweet()
    client.create_tweet(text=tweet)
```

## Creating Our Lambda Function

If you haven't used AWS Lambda before, you can review what it is and how to use it by [reading my "How To Create Your First Python AWS Lambda Function" article](https://frankcorso.dev/python-aws-lambda-function.html).

To get started, you will need to sign in to your AWS account and go to AWS Lambda. Once there, click to create a new function.

For this function, I'll name it `daysUntilNextYearTwitterBot` and use Python 3.9. We can leave everything else as the defaults.

![Create new function screen with "Author from scratch" selected. The function name is filled in and the runtime is set to Python 3.9.](/images/aws-lambda-create-new.png)


## Scheduling The Lambda Function

XXXX

## Next Steps

XXXX