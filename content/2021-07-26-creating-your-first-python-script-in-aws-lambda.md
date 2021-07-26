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

This is where serverless functions can help! Serverless functions are scripts that you can set up without needing to manage the underlying infrastructure. There are several serverless systems including Google Cloud Platform (GCP)'s Cloud Functions and Amazon Web Services (AWS)'s Lambda. In this article, we'll explore using AWS's Lambda.

WHAT IS LAMBDA

WRITING PYTHON

1. Define function
2. Explain parameters

CREATING LAMBDA FUNCTION

1. Setting up function
2. Setting handler
3. Uploading code
4. Testing

NEXT STEPS