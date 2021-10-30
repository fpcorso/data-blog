---
Title: Passing Credentials To AWS Lamda Using Parameter Store
Date: 10/30/2021
Tags: AWS
Category: Python
Slug: passing-credentials-aws-lambda-parameter-store
Authors: Frank Corso
Summary: TBD
Description: TBD
Status: draft
---
Up until now, all my articles in this AWS Lambda 101 series has only used simple Python code that does not interact with any data or service outside the function. However, in many cases, you will want to pull data from somewhere or send data to a service.

For example, maybe you will pull data from a database. Or, maybe you need to send a message to Slack or Twitter.

For all of these, you will need a way to use credentials or secrets within the code. However, you should never save the secrets within your Lambda function code. Instead, you will need a way to pass these values to the Lambda function.

While there are several ways you can do this, the easiest and most affordable way is to use AWS Systems Manager's Parameter Store. The Parameter Store is a simple key/value system that allows you to store simple strings and encrypted values.

## Adding a Value to Parameter Store

To being, log into your AWS account. Once in your AWS console, you can either click on "Services" to go to "Management & Governance"->"Systems Manager" or use their search bar to search for System Manager.

![AWS console with focus on the top search bar with "systems manager" entered.]({static}/images/aws-systems-manager-search.png)

CREATING LAMBDA FUNCTION

ADDING PERMISSION

TESTING FUNCTION

NEXT STEPS