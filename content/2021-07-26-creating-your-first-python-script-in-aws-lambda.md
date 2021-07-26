---
Title: Creating your first python script in AWS Lambda
Date: 2021-07-28 08:10
Tags: lambda
Category: Python
Slug: python-aws-lambda
Series: ""
Authors: Frank Corso
Summary: TBD
Description: TBD
Status: draft
---
When you are creating a small Python script, the question that eventually comes up is *where* the code will be hosted and run. For some small scripts, you might be able to just run the code locally. But, what if you want the code to be run on a regular schedule, even when your laptop is off? Or, what if you want the script to be part of an endpoint that other scripts can access?

One option would be to set up a server and running the code there. You could spin up a droplet on Digital Ocean, set up the Python environment, and run your scripts there. But, what if, you do not want to have to set up and manage servers?

This is where serverless functions can help! Serverless functions are scripts that you can set up without needing to manage the underlying infrastructure. Additionally, these systems auto-scale so you can easily run the function a few times a year or thousands of times per day without you needing to figure out how to scale. 

[AWS's Lambda](https://aws.amazon.com/lambda/) is a great serverless function system that tightly integrates with the rest of the AWS ecosystem. Even better, the AWS free tier includes 1 million Lambda requests per month! [](https://aws.amazon.com/lambda/)

## Writing Your First Python Lambda Function



1. Define function
2. Explain parameters

## Creating Your Lambda Function

To get started, you will need to create your AWS account.

Once in your AWS console, you can either click on "Services" to go to "Compute"->"Lambda" or use their search bar to search for Lambda.

INSERT SCREENSHOT

Once inside Lambda, you will your Lambda dashboard as shown here:

INSERT SCREENSHOT

Click on the "Functions" page from within the menu to get to your functions as shown here:

INSERT SCREENSHOT

1. Setting up function
2. Setting handler
3. Uploading code
4. Testing

NEXT STEPS