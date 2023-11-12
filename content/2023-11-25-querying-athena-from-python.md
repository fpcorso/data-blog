---
Title: How to Query Athena using Python
Date: 11-13-2023 09:00:00
Tags: aws, athena, boto3
Category: Data Engineering
Slug: querying-athena-python
Authors: Frank Corso
Summary: Using AWS Athena? Learn how to perform queries from Python to get data from Athena.
Description: Using AWS Athena? Learn how to perform queries from Python to get data from Athena.
Status: draft
---
AWS Athena is a great tool for querying large amounts of data in S3. However, querying from Python is not as straightforward as a standard SQL request.

In Athena, the queries run asynchronously as it has to perform the scan of the data in S3. This means that when you run a query, you have to wait until the query's status is complete before retrieving the results.

In this article, I'll explore how to achieve this in Python.

## What is Athena?

AWS Athena is a serverless query engine that allows you to query data in S3 using SQL. Athena can query unstructured, semi-structured, and structured data, including CSV, JSON and Parquet files. It is an excellent tool for ad-hoc querying data not in a database. It is also a great tool for data exploration and analysis.

AWS Athena charges per data scanned for each query and doesn't cost anything to set up. But, this means if you have a lot of data that you are querying a lot, it can be expensive. So, Athena tends to be best for ad-hoc or occasional querying of data.

Some of the times I have used Athena include:

* Querying log files in S3 to find errors
* Querying data in S3 to find data quality issues
* Querying intermediate data in S3 that has been extracted from other sources but has not been transformed or loaded into a database yet
* Querying archival data stored in S3

Another use case is when you are quickly creating a proof-of-concept or prototype and don't need to spend time setting up and managing a database yet. You can quickly load data into S3 and query it using Athena.

I have done this recently when I wanted to explore how we might architect a new historical data feature. I loaded some of our data into an S3 bucket, set up Athena to query it, and set up our backend to use Athena for the queries. Since it was only a small amount of data, it was very cheap to use Athena.

## Writing Our Python Code

**Note:** This article assumes you already have an Athena DB and tables set up. If you do not have any set up, you can refer to [my article on setting up Athena]({filename}2023-10-19-getting-started-athena.md) to get started.

For this code, I will be using the Athena DB I set up in [my article on setting up Athena]({filename}2023-10-19-getting-started-athena.md) which included data on the top 10,000 IMDB movies.

In order to work with Athena, we need to use the `boto3` library to create a client for Athena. We can then use this client for all the operations we will do. You can [view the Athena client in boto3 here](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/athena.html#client).

```python
import boto3
athena_client = boto3.client('athena')
```

### Initiating the Query

Our first step is to create the SQL for our query and then start the query execution in Athena. We can do this using the `start_query_execution` method. You can view the [start_query_execution documentation here](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/athena/client/start_query_execution.html).

The `start_query_execution` method takes the following parameters:

* `QueryString` - The SQL query to run
* `QueryExecutionContext` - The database to run the query in
* `ResultConfiguration` - The location in S3 to store the results. For most systems, you will use the same location that you set up when you set up Athena in the "Location of query result" option. However, as you scale up your system or team, you may start storing results into different places.

This method will return a dict with the "QueryExecutionId" value which we will need to use later.

```python
query = '''SELECT * FROM frank_athena_example_bucket
    WHERE year > 2012 AND metascore > 80 AND certificate IN ('G', 'PG')
    LIMIT 10;'''
query_execution = athena_client.start_query_execution(
    QueryString=query,
    QueryExecutionContext={
        'Database': 'mydata',
    },
    ResultConfiguration={
        'OutputLocation': 's3://frank-example-athena-results',
    }
)
execution_id = query_execution['QueryExecutionId']
```

### Checking the Query Status

Now that we have initialized the query, we cannot get the results until the query execution state is set to "SUCCEEDED". 

We can check the status of the query using the `get_query_execution` method, which takes the execution ID and returns a dict with a variety of information about the query. You can [view the get_query_execution documentation here](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/athena/client/get_query_execution.html).

We need to check the state of the status which we can do like this:

```python
query_details = athena_client.get_query_execution(
        QueryExecutionId=execution_id
    )
state = query_details['QueryExecution']['Status']['State']
```

The state can have several values, such as `QUEUED`, `RUNNING`, `SUCCEEDED`, `FAILED`, and `CANCELLED`. We want to wait until the state is `SUCCEEDED` before we continue.

### Getting the Query Results

Once the query has succeeded, we can get the results using the `get_query_results` method. You can [view the get_query_results documentation here](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/athena/client/get_query_results.html).

This method takes the execution ID and returns a dict with the results. The dict will contain both the result as rows and metadata, such as the column info.

```python
response_query_result = athena_client.get_query_results(
        QueryExecutionId=execution_id
    )
print(response_query_result['ResultSet']['Rows'])
```

The results in the "Rows" key will be a list where the first item is a dict for the column names and the other items is the data.

For example, we can show the first two items like this:

```python
for row in response_query_result['ResultSet']['Rows'][:2]:
    print(row['Data'])
```

which shows us:

```python
[{'VarCharValue': 'title'}, {'VarCharValue': 'year'}, {'VarCharValue': 'runtime'}, {'VarCharValue': 'certificate'}, {'VarCharValue': 'rating'}, {'VarCharValue': 'metascore'}, {'VarCharValue': 'votes'}, {'VarCharValue': 'gross'}]
[{'VarCharValue': 'Spider-Man: Across the Spider-Verse'}, {'VarCharValue': '2023'}, {'VarCharValue': '140'}, {'VarCharValue': 'PG'}, {'VarCharValue': '8.9'}, {'VarCharValue': '86.0'}, {'VarCharValue': '203042'}, {}]
```

Notice that all values are strings. You will need to convert them to the correct type for your use case.

### Waiting for Success

In most cases, you will not only check the state once but keep checking until the query has finished. We have two main ways to achieve this.

#### Waiting for a Set Number of Cycles

The first way is to check the state a set number of times, with some waiting in between. This is useful for times where you have a maximum amount of time your script can take.

For example, if you are running in a Lambda function attached to an API endpoint, you may only have 30 or 60 seconds. In that case, you may want to end the check early to show a timeout message or similar if the query is taking too long.

To achieve this, we set up a for loop and sleep:

```python
import time

for i in range(10):
    time.sleep(5)
    query_details = athena_client.get_query_execution(
        QueryExecutionId=execution_id
    )
    state = query_details['QueryExecution']['Status']['State']
    if state == 'SUCCEEDED':
        response_query_result = athena_client.get_query_results(
            QueryExecutionId=execution_id
        )
        # Do something with results

# Do something if we never got a success
```

#### Waiting Until Success

The second way is to keep checking until the query has succeeded. This is useful for times when you don't have a maximum amount of time your script can take.

To achieve this, we set up a while loop and sleep:

```python
import time

while True:
    time.sleep(5)
    query_details = athena_client.get_query_execution(
        QueryExecutionId=execution_id
    )
    state = query_details['QueryExecution']['Status']['State']
    if state == 'SUCCEEDED':
        response_query_result = athena_client.get_query_results(
            QueryExecutionId=execution_id
        )
        # Do something with results
        break
```

## Next Steps

Now that you have your results, you can do whatever you want with them. There are some more things you can do with the Athena client:

* Set up pagination to get to paginate through larger results
* Adjust the `ResultReuseConfiguration` to reuse the results of a query in short windows of time
* Adjust the `ResultConfiguration` to change the encryption or ownership of the results
* Our code above assumes the query will always succeed. You may want to adjust your code to handle other states, such as `FAILED` or `CANCELLED`