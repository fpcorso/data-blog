---
Title: How To Create an Endpoint for an AWS Lambda Function Using API Gateway
Date: 2021-09-24 08:00:00
Tags: aws, lambda, api
Category: Python
Slug: aws-lambda-function-endpoint-api-gateway
Series: AWS Lambda 101
Authors: Frank Corso
Summary: Need to send and retrieve data from your AWS Lambda function via HTTP request? Learn how to create an endpoint that connects to it using AWS API Gateway.
Description: Need to send and retrieve data from your AWS Lambda function via HTTP request? Learn how to create an endpoint that connects to it using AWS API Gateway.
Status: published
---
In my previous articles in this series, I looked at setting up an AWS Lambda function and setting it up on a recurring schedule. Another common use of a serverless function is connecting it to an endpoint to be able to send data to it or receive data from it.

For example, maybe your server needs to fire off a request to a Lambda to trigger a new calculation. Or, maybe your web app needs to pull in data that is processed by a Lambda.

In this article, I will set up a basic Lambda function that accepts two numbers, multiplies them together, and then returns the results. We will then connect this to an endpoint that we can send some JSON data to. If a user sends JSON with keys of `a` and `b` with both being a number, they will get back the result of the two multiplied. To do this, we will be using AWS's API Gateway to handle the endpoints. Let's get started!

## Writing the Code for our Lambda function

To get started, let's write a very basic lambda handler:

```python
def lambda_handler(event, context):
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
    "body": "{\"exampleJSONKey\": \"Random text\"}",
    "isBase64Encoded": false
}
```

So, in order to get the JSON sent with the request, we will use `event['body']` but we will need to decode the JSON. This will look like this:

```python
import json

def lambda_handler(event, context):
    body = json.loads(event['body'])
    return 'Something'
```

For this example project, the Lambda function will be expecting the user to send in JSON with keys of `a` and `b` to be multiplied together. So, we can add then use these in the return like this:

```python
import json

def lambda_handler(event, context):
    body = json.loads(event['body'])
    return body['a'] * body['b']
```

However, if someone sends in values that are not numbers, this will result in an error or unexpected results. So, we should create a small conditional to ensure both are valid numbers.

```python
import json

def lambda_handler(event, context):
    body = json.loads(event['body'])
    if not is_numerical(body['a']) or not is_numerical(body['b']):
        return 'One or both of the values are not a number'
    return body['a'] * body['b']


def is_numerical(value):
    """"Checks if value is an int or float."""
    return isinstance(value, int) or isinstance(value, float)
```

Since the user is sending JSON to the endpoint, they would probably expect JSON as the response. Luckily, Lambda will automatically take care of this process if we return Python objects. So, we can update our returns:

```python
import json

def lambda_handler(event, context):
    body = json.loads(event['body'])
    if not is_numerical(body['a']) or not is_numerical(body['b']):
        return {
            'error': 'One or both of the values are not a number'
        }
    return {
        'result': body['a'] * body['b']
    }


def is_numerical(value):
    """"Checks if value is an int or float."""
    return isinstance(value, int) or isinstance(value, float)
```

Lastly, the user would encounter a Lambda error if they are not submitting both `a` and `b`. So, let's add one last conditional to check that:


```python
import json

def lambda_handler(event, context):
    body = json.loads(event['body'])
    if 'a' not in body or 'b' not in body:
        return {
            'error': 'You must provide keys for both "a" and "b"'
        }
    if not is_numerical(body['a']) or not is_numerical(body['b']):
        return {
            'error': 'One or both of the values are not a number'
        }
    return {
        'result': body['a'] * body['b']
    }


def is_numerical(value):
    """"Checks if value is an int or float."""
    return isinstance(value, int) or isinstance(value, float)
```

Great! Our code is looking good so let's get this into a Lambda function.

## Setting Up Our Lambda Function

First, let's go ahead and create a new Lambda function. If you've never set up one before, [check out my "How To Create Your First Python AWS Lambda Function" article](https://frankcorso.dev/python-aws-lambda-function.html).

Inside the Lambda function admin area, paste the code above into the "Code" tab as shown below:

![Example AWS Lambda function with our sample code above entered into the code tab.]({static}/images/aws-lambda-example-endpoint-function-code.png)

Click the white "Deploy" button right above the code to finish setting it up.

Great, our Lambda function is now ready!

## Setting Up Our API Gateway Endpoint

In API Gateway, there are many different types of APIs that you can create. Since we are creating a single endpoint, we will use HTTP API. However, there are many other types you could consider such as REST and WebSocket.

Additionally, you can have each endpoint accept different HTTP request types, such as GET and POST, and you can also use "stages" to have different versions of each for development. To keep our endpoint simple, we will only use the default "stage" and accept all HTTP request types.

To get started, in your AWS console, you can either click on "Services" to go to "Networking & Content Delivery"->"API Gateway" or use their search bar to search for it.

![The search bar in AWS showing "api gateway" in the search bar with a result of "API Gateway".]({static}/images/aws-api-gateway-search.png)

If you have not created any APIs yet in API Gateway, you will be directed to the page to select which type of API you want to build. If you already have created APIs click the APIs link in the left navigation menu and then click "build". In either case, select the "HTTP API" option.

![The API Gateway new API page. It shows an area to "Choose an API type" with several listed including HTTP API, each with a "Build" button.]({static}/images/aws-api-gateway-api-options.png)

Once on the "Create an API" page, add an integration and select Lambda. Once selected, you will be prompted to select which Lambda function. Underneath, name your API. I like to use something descriptive that is similar to the Lambda function's name.

![The first step to creating an API. This API has a "Lambda" integration with a Lambda function set as example endpoint function. The API name field is also filled in.]({static}/images/aws-api-gateway-create-api-step-1.png)

If you wanted to limit the HTTP request types allowed on this endpoint, the path for the endpoint, or the "stages" you can click "Next" to set those up. For this endpoint, I'll keep the defaults and click "Review and Create". On this page, we can verify the name, integrations, routes, and stages.

![The last step for creating an API. This API has example endpoint as the name with a Lambda integration.]({static}/images/aws-api-gateway-create-api-step-4.png)

Click the "Create" button to finish creating this endpoint. Now, you will see the domain of this new API.

![A recap screen showing the API ID, stage, and invoke URL. There are links along the left for routes, throttling, authorization, and more.]({static}/images/aws-api-gateway-example-endpoint.png)

We can use this domain with our route to craft our final endpoint. For example, for the endpoint I created, the full URL is https://j485uzw9v0.execute-api.us-east-1.amazonaws.com/exampleEndpointFunction. If you do not remember what the route was, you can click the "Routes" link in the left navigation to see all routes on the API.

Great, our endpoint is set up!

## Testing Our Endpoint

Now, let's see it in action. Open your favorite API tester, such as [Postman](https://www.postman.com/). Create a new request with any HTTP method and paste in the full URL to your API route.

Then, inside the body, create a new JSON object with keys of "a" and "b" and click send. You should see something like this:

![A Postman window showing a POST request to our URL with JSON in the body with a set to 12 and b set to 3. The result shows a JSON response with result set to 36.]({static}/images/aws-api-gateway-test-success.png)

Then, try passing something instead of numbers or omit one of the fields to see one of the error messages like this:

![A Postman window showing a POST request to our URL with JSON in the body with a set to "Not a number" and b set to 3. The JSON response has an error key set to "One or both of the values are not a number."]({static}/images/aws-api-gateway-test-failed.png)

Great! Everything looks like it's working correctly. We have now successfully created a Lambda function that is accessible from a URL.

## Next Steps

Now that you have set up a Lambda function and connected it to an API, you are on your way to creating new serverless endpoints that can accept and return data. In future articles, I'll look at safely passing credentials to it and adding other Python libraries to it.

Be sure to subscribe below to get notified when the next article is published! 
