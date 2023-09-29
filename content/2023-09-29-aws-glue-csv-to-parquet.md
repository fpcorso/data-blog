---
Title: TBD
Date: 09-29-2023 09:00:00
Tags: aws, glue, s3, etl, parquet, csv
Category: Data Engineering
Slug: aws-glue-csv-to-parquet-job
Authors: Frank Corso
Summary: TBD
Description: TBD
Status: draft
---

AWS Glue has a variety of features but one of the most useful is its fully managed ETL service. You can do many things using its ETL jobs including transforming, joining, and moving data. 

Glue can also work with a variety of data stores including Amazon S3, Amazon Redshift, Amazon RDS, and Amazon DynamoDB. Even better, it can use data connectors to integrate with other data stores such as Snowflake.

In this post, I'll create a simple ETL job that reads CSV files from a s3 bucket and writes them to a parquet file in another s3 bucket.

## Creating IAM Role for AWS Glue

Before we can create the job, we need to set up the IAM role that Glue will use when running the job. If you've used Glue before or already followed its steps for creating a default role, you can skip this section.

On Glue's most recent design change, it now has a "Prepare your account for AWS Glue" option on the main page which can create the role as well as do many other things. To get started, log into AWS and go to AWS Glue.

![AWS Glue Main Page](/images/aws-glue-csv-to-parquet/aws-glue-main-page.png)

On the main page, click the "Set up roles and users" button.

Since we are not setting up other users to use Glue, we can skip the first two steps without making changes. So, click "Next" until you get to the "Choose a default service role" step.

![AWS Glue's choose a default service role step](/images/aws-glue-csv-to-parquet/aws-glue-choose-default-service-role.png)

On this step, make sure the "Create the standard AWS Glue service role and set it as the default (recommended)" option is selected. This will create a new IAM role called "AWSGlueServiceRole" and attach permissions for Glue, s3, Cloudwatch, and a few other services to it.



## Creating the AWS Glue Job

## Next Steps
