---
Title: Querying Athena from Python
Date: 11-13-2023 09:00:00
Tags: aws, athena
Category: Data Engineering
Slug: querying-athena-python
Authors: Frank Corso
Summary: TBD
Description: TBD
Status: draft
---
AWS Athena is a great tool for querying large amounts of data in S3. However, querying from Python is not as straightforward as a normal SQL request.

In Athena, the queries are run asynchronously as it has to perform the scan of the data in S3. This means that when you run a query, you have to wait until the query's status is complete before getting retrieving the results.

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

## Writing our Python Code

**Note:** This article assumes you already have an Athena DB and tables set up. If you do not have any set up, you can refer to [my article on setting up Athena]({filename}2023-10-19-getting-started-athena.md) to get started.

### Initiating the Query



### Checking the Query Status

### Getting the Query Results

## Next Steps