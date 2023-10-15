---
Title: Getting started with AWS Athena to easily query data in S3 (TBD)
Date: 10-20-2023 09:00:00
Tags: aws, athena, s3, sql
Category: Data Engineering
Slug: aws-athena
Authors: Frank Corso
Summary: TBD
Description: TBD
Status: draft
---
If you use AWS for a lot of your engineering, you will often end up with large amounts of data that is not in a database, such as log files or extracted data file in S3. AWS Athena is a great tool that allows you to query this data without having to load it into a database. This post will walk through the basics of setting up Athena and querying data in S3.

## What is AWS Athena?

AWS Athena is a serverless query engine that allows you to query data in S3 using SQL. Athena can query unstructured, semi-structured, and structured data including CSV, JSON and Parquet files. It is a great tool for ad-hoc querying of data that is not in a database. It is also a great tool for data exploration and analysis.

Some of the times I have used Athena include:

* Querying log files in S3 to find errors
* Querying data in S3 to find data quality issues
* Querying intermediate data in S3 that has been extracted from other sources but has not been transformed or loaded into a database yet
* Querying archival data that is stored S3

Another use case is when you are quickly creating a proof-of-concept or prototype, and you don't need to spend time setting up and managing a database yet. You can quickly load data into S3 and query it using Athena. I have done this recently when I wanted to explore how we might architect a new historical data feature. I loaded some of our data into an S3 bucket and set up Athena to query it and set up our backend to use Athena for the queries.

## Setting Up Our S3 Bucket

Before we can start using Athena, we will need to set up an example S3 bucket to use for the data. To get started, go ahead and log into your AWS account and navigate to the S3 console. Click on the "Create Bucket" button to create a new bucket.

You can name the bucket whatever you want. I named mine "frank-athena-example-bucket". You can leave the rest of the settings as the default. Click "Create Bucket" to create the bucket.

[![Create S3 Bucket](/images/athena/create-s3-bucket.png)](/images/athena/create-s3-bucket.png)

Once created, we will need to add some data to it. For this example, I have set up some basic CSV files that we can use to query. You can download a zip file containing the CSV files here. Once downloaded, unzip the file and upload the CSV files to your S3 bucket.

[![Upload CSV Files](/images/athena/upload-csv-files.png)](/images/athena/upload-csv-files.png)

## Setting Up Athena

Now that we have some data to use, it's time to set up Athena. Navigate to the Athena console and click on the "Get Started" button.

[![Athena Console](/images/athena/athena-console.png)](/images/athena/athena-console.png)

MAKING FIRST QUERY

NEXT STEPS