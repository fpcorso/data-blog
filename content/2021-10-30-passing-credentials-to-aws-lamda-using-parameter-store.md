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

Once inside Systems Manager, you will find your dashboard as shown here:

![AWS Systems Manager dashboard with navigation along the left side with links for cloudwatch dashboard, application manager, and parameter store.]({static}/images/aws-systems-manager-dashboard.png)

Click on the "Parameter Store" page from within the menu to get to your values. If you do not have any values yet, you will see a landing page. Click the "Create parameter" button.

On the create parameter page, enter in a name for the value. This name will be how you retrieve the value and is case-sensitive. For example, you can name this "db_username" or "slack_token".

In the description, enter some text to help you remember what this value is for.

For most secrets, you can stay on the "Standard" tier.

![The top section of the create parameter page with fields for name and description with the standard tier selected.]({static}/images/aws-secrets-manager-create-parameter-1.png)

For the type, for credentials, passwords, and secrets, you will want to use "SecureString". The SecureString type is for any sensitive data that needs to be stored and referenced in a secured way. This uses AWS Key Management Service to encrypt the value. For getting started, you can leave all the defaults here.

Lastly, enter in the value for this secret.

![The second part of the create parameter page showing the type set to "secure string" and KMS key source kept on default of my current account.]({static}/images/aws-secrets-manager-create-parameter-2.png)

If you have a lot of values in Parameter Store, you can use tags to help organize them. For this value, I will skip adding tags.

Now, click the "Create parameter" button at the bottom of the page. You will see your new parameter in the "My Parameters" table.

![The "my parameters" page showing a table of parameters with our new value listed in the table.]({static}/images/aws-secrets-manager-my-parameters.png)

## Creating the Lambda Function

Blah

## Adding the Permissions to the Lambda Function

Blah

## Testing Our Function

Blah

## Next Steps