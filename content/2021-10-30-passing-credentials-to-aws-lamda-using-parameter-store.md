---
Title: Passing Credentials to AWS Lambda Using Parameter Store
Date: 2021-11-01 08:00
Tags: aws, lambda
Category: Python
Slug: passing-credentials-aws-lambda-parameter-store
Series: AWS Lambda 101
Authors: Frank Corso
Summary: Need to pass credentials or secrets to your Python Lambda functions?
  Learn how to use AWS Systems Manager for securely storing and retrieving
  secrets.
Description: Need to pass credentials or secrets to your Python Lambda
  functions? Learn how to use AWS Systems Manager for securely storing and
  retrieving secrets.
Status: published
---
Up until now, all my articles in this AWS Lambda 101 series has only used simple Python code that does not interact with any data or service outside the function. However, in many cases, you will want to pull data from somewhere or send data to a service.

For example, maybe you will pull data from a database. Or, maybe you need to send a message to Slack or Twitter.

For all of these, you will need a way to use credentials or secrets within the code. However, you should never save the secrets within your Lambda function code. Instead, you will need a way to pass these values to the Lambda function.

While there are several ways you can do this, the easiest and most affordable way is to use AWS Systems Manager's Parameter Store. The Parameter Store is a simple key/value system that allows you to store simple strings and encrypted values.

## Adding a Value to Parameter Store

To begin, log into your AWS account. Once in your AWS console, you can either click on "Services" to go to "Management & Governance"->"Systems Manager" or use their search bar to search for System Manager.

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

First, let's go ahead and create a new Lambda function. If you've never set up one before, [check out my "How To Create Your First Python AWS Lambda Function" article](https://frankcorso.dev/python-aws-lambda-function.html).

Next, let's start writing our code for this function. The AWS Lambda functions include [the boto3 package](https://boto3.amazonaws.com/v1/documentation/api/latest/index.html) in the environment. This AWS SDK allows us to access most AWS services. We can use the `client` method to load in a specific client object as shown here:

```
:::python
import boto3

aws_client = boto3.client('ssm')
```

Here, we are loading in [the Simple Systems Manager client](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/ssm.html#client) which allows us to retrieve parameters from the Parameter Store by using the `get_parameter` method as shown in this code:

```
:::python
import boto3

# Create our SSM Client.
aws_client = boto3.client('ssm')

# Get our parameter
response = aws_client.get_parameter(
    Name='example_secret',
    WithDecryption=True
)
```

Since we are using an encrypted value, we need to set WithDecryption to true. The name field is case-sensitive and must exactly match the name you gave the parameter. This returns an object with several values as shown here:

```
:::python
{
    'Parameter': {
        'Name': 'example_secret',
        'Type': 'SecureString',
        'Value': 'examplepassword',
        'Version': 1,
        'LastModifiedDate': datetime.datetime(2021, 10, 30, 17, 45, 50, 660000, tzinfo=tzlocal()),
        'ARN': 'arn:aws:ssm:us-east-1:647709874538:parameter/example_secret',
        'DataType': 'text'
    },
    'ResponseMetadata': {
        'RequestId': '48a84d0a-bad9-415a-b13f-6de2814f4330',
        'HTTPStatusCode': 200,
        'HTTPHeaders': {
            'server': 'Server',
            'date': 'Sat, 30 Oct 2021 18:19:41 GMT',
            'content-type': 'application/x-amz-json-1.1',
            'content-length': '220',
            'connection': 'keep-alive',
            'x-amzn-requestid': '48a84d0a-bad9-415a-b13f-6de2814f4330'
        },
        'RetryAttempts': 0
    }
}
```

Now, let's put this within a Lambda handler:

```
:::python
import boto3

def lambda_handler(event, context):
    aws_client = boto3.client('ssm')

    # Get our parameter
    response = aws_client.get_parameter(
        Name='example_secret',
        WithDecryption=True
    )
    
    return f'Our value is {response['Parameter']['Value']}'
```

Important Note: You should never print or log credentials or secrets in production code. I am doing it here to demonstrate how to retrieve the value and to show it's working.

Inside the Lambda function admin area, paste the code above into the "Code" tab as shown below:

![The code tab for a Lambda function with the code source including a "lambda_function.py" file. Inside is our code.]({static}/images/aws-lambda-code-source.png)

Once pasted in, click the "Deploy" button to save it.

Now, if we tried to run this code, we will get an error that our function is not authorized to perform the getParameter action. So, let's give it that permission.

## Adding the Permissions to the Lambda Function

Within AWS, there are a lot of systems and securing strategies for users and services. I will not be going into these in this article but I encourage you to [read AWS's "What is IAM?"](https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html) for more information.

For this Lambda function, we are going to attach the permission needed to the Lambda's role. To do so, go to the "Configuration" tab on the Lambda and select "Permissions" from the sidebar.

![The configuration page for a lambda function with the left navigation set to Permissions. The top panel is an "Execution role" with a clickable role name shown.]({static}/images/aws-lambda-configuration-permissions.png)

Within the "Execution role" panel, click on the role name to open up that role in IAM.

![The role summary screen in IAM. List policies applied with a blue "Attach policies" button shown.]({static}/images/aws-iam-role.png)

Click the "Attach policies" button. On the add permissions screen, search for the "AmazonSSMReadOnlyAccess" permission. This will allow your Lambda function to read from Systems Manager.

![Add permissions screen with "AmazonSSMRead" entered in search bar and "AmazonSSMReadOnlyAccess" being listed in results. This result has its checkbox checked.]({static}/images/aws-iam-add-permissions.png)

Check the checkbox for the "AmazonSSMReadOnlyAccess" permission and then click "Attach policiy".

Now, go back to the configuration screen for the Lambda function (or refresh it if you kept it open). In the resource summary drop down, you should now see the "AWS Systems Manager" listed. If you select it, you should see the actions list "Allow: ssm:Get*" with other permissions.

![The resource panel on the permissions page. The drop down has AWS Systems Manager selected. In the Actions column, it lists three "allow" permissions including ssm get *.]({static}/images/aws-lambda-resource-summary.png)

Our Lambda is now ready to test.

## Testing Our Function

Switch to the "Test" tab for the Lambda function. Then, click the "Test" button.

You will see a new "Execution result: succeeded" panel appear. If we click on the details, we will see the response as well as log output.

![A panel that says execution result: succeeded. It shows the returned value was "Our value is example password".]({static}/images/aws-lambda-testfunction-test-results.png)

We see our secret that was saved in Parameter Store has made it to the Lambda function and was returned in the response!

## Next Steps

Now that you have stored values in Parameter Store and retrieved them from a Lambda function, you can start setting up Lambda functions that can access databases and other services. For example, you can set up a Twitter bot and keep your access keys in Parameter Store. Or, you can set up a recurring monitor that checks your database and sends results to Slack.

Be sure to subscribe below to get notified when the next article is published!