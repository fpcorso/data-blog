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

AWS Athena charges per data scanned for each query and doesn't cost anything to set up. But, this means if you have a lot of data that you are querying a lot, it can be expensive. So, Athena tends to be best for ad-hoc or occasional querying of data.

Some of the times I have used Athena include:

* Querying log files in S3 to find errors
* Querying data in S3 to find data quality issues
* Querying intermediate data in S3 that has been extracted from other sources but has not been transformed or loaded into a database yet
* Querying archival data that is stored S3

Another use case is when you are quickly creating a proof-of-concept or prototype, and you don't need to spend time setting up and managing a database yet. You can quickly load data into S3 and query it using Athena. I have done this recently when I wanted to explore how we might architect a new historical data feature. I loaded some of our data into an S3 bucket and set up Athena to query it and set up our backend to use Athena for the queries. Since it was only a small amount of data, it was very cheap to use Athena.

## Setting Up Our S3 Bucket

Before we can start using Athena, we will need to set up two S3 buckets to use for the data. To get started, go ahead and log into your AWS account and navigate to the S3 console. Click on the "Create Bucket" button to create a new bucket.

You can name the bucket whatever you want. I named mine "frank-athena-example-bucket". You can leave the rest of the settings as the default. Click "Create Bucket" to create the bucket.

[![Create S3 Bucket]](/images/aws-athena/new-s3-bucket.png)

Once created, we will need to add some data to it. Normally, you would have many files in the S3 bucket as that is when Athena is a great use for. But, for this example, I will use a simplified version of the data from ["IMDB Top 10,000 movies (Updated August 2023)" on Kaggle](https://www.kaggle.com/datasets/ashutoshdevpura/imdb-top-10000-movies-updated-august-2023) that I used in my [Creating A Heatmap Chart In Seaborn]({filename}2023-09-01-seaborn-heatmap.md) article. You can [download the CSV file here]({static}/datasets/IMDB-top-10000-movies.csv). Once downloaded, upload the CSV file to your S3 bucket.

[![Upload CSV Files]](/images/aws-athena/upload-csv-files.png)

While in S3, we need to also create an S3 bucket for the Athena results, which I'll explain more about later. I named mine "frank-example-athena-results". You can leave all of the bucket settings as the default.

## Setting Up Athena

Now that we have some data to use, it's time to set up Athena. Navigate to the Athena console and click on the "Get Started" button.

[![Athena Console](/images/athena/athena-console.png)](/images/athena/athena-console.png)

MAKING FIRST QUERY

NEXT STEPS