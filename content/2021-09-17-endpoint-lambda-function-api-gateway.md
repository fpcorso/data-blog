---
Title: endpoint lambda function api gateway
Date: 2021-09-20 08:00:00
Tags: aws
Category: python
Slug: endpoint-aws-lambda-function-api-gateway
Authors: Frank Corso
Summary: TBD
Description: TBD
Status: draft
---
In my previous articles in this series, I looked at setting up an AWS Lambda function and setting it up on a recurring schedule. Another common use of a serverless function is connecting it to an endpoint to be able to send data to it or receive data from it.

For example, maybe your server needs to fire off a request to a Lambda to trigger a new calculation. Or, maybe your web app needs to pull in data that is processed by a Lambda.

In this article, I will set up a basic Lambda function that accepts two numbers, multiplies them together, and then returns the results. We will then connect this to an endpoint that we can send some JSON data to. If a user sends JSON with keys of `a` and `b` with both being a number, they will get back the result of the two multiplied. To do this, we will be using AWS's API Gateway to handle the endpoints. Let's get started!

## Writing the Code for our Lambda function

To get started, let's write a very basic lambda handler:

```python
def lamdba_handler(event, context):
    return 'Something'
```

In order to use the numbers being sent to our Lambda function, we will need to use the `event` parameter. This parameter contains any data sent to the Lambda function. If we were triggering the Lambda function manually, we would use the `event` variable as an exact representation of the data.

For example, if we had passed only the number 16 to the Lambda function, `event` would be equal to `16`.

However, with the API Gateway endpoint, the event variable will include a variety of other data with the JSON sent being included within the body key. If we were to print our the `event` variable for a Lambda triggered by an endpoint, it would look like:

```json
{
    "version": "2.0",
    "routeKey": "GET /testFunction",
    "rawPath": "/testFunction",
    "rawQueryString": "",
    "headers": {},
    "requestContext": {},
    "body": '{\r\n    "exampleJSONKey": "Random text"\r\n}',
    "isBase64Encoded": False
}
```

So, in order to get the JSON sent with the request, we will use `event['body']` but we will need to decode the JSON. This will look like this:

```python
import json

def lamdba_handler(event, context):
    body = json.loads(event['body'])
    return 'Something'
```

For this example project, the Lambda function will be expecting the user to send in JSON with keys of `a` and `b` to be multiplied together. So, we can add then use these in the return like this:

```python
import json

def lamdba_handler(event, context):
    body = json.loads(event['body'])
    return body['a'] * body['b']
```

However, if someone sends in values that are not numbers, this will result in an error or unexpected results. So, we should create a small conditional to ensure both are valid numbers.

```python
import json

def lamdba_handler(event, context):
    body = json.loads(event['body'])
    if not is_numerical(body['a']) or not is_numerical(body['b']):
        return 'One or both of the values are not a number'
    return body['a'] * body['b']


def is_numerical(value):
    """"Checks if value is an int or float."""
    return isinstance(value, int) or isinstance(value, float)
```

SET UP LAMBDA FUNCTION

SETTING UP API GATEWAY

DOING FULL TEST

NEXT STEPS

