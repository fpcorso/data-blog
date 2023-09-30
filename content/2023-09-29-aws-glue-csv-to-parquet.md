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

I have already created two s3 buckets to be used in this as well as uploaded a CSV file into one of them. If you plan on following along, you will want to set up your s3 buckets too.

## Creating IAM Role for AWS Glue

Before we can create the job, we need to set up the IAM role that Glue will use when running the job. The job will assume this role while running, similar to Lambda's execution role. So, this role will need any necessary permissions needed to access the different services. If you've used Glue before or already followed its steps for creating a default role, you can skip this section.

On Glue's most recent design change, it now has a "Prepare your account for AWS Glue" option on the main page which can create the role as well as do many other things. To get started, log into AWS and go to AWS Glue.

![AWS Glue Main Page](/images/aws-glue-csv-to-parquet/aws-glue-landing-page.png)

On the main page, click the "Set up roles and users" button.

Since we are not setting up other users to use Glue, we can skip the first two steps without making changes. So, click "Next" until you get to the "Choose a default service role" step.

![AWS Glue's choose a default service role step](/images/aws-glue-csv-to-parquet/aws-glue-choose-default-service-role.png)

On this step, make sure the "Create the standard AWS Glue service role and set it as the default (recommended)" option is selected. This will create a new IAM role called "AWSGlueServiceRole" and attach permissions for Glue, s3, Cloudwatch, and a few other services to it.

Click "Next" to go to the "Review and confirm" screen and then click "Apply Changes." After a few moments, you'll see a success message at the top of the screen.

If you glance at the IAM console, you'll see a new role called "AWSGlueServiceRole" with the "AmazonS3FullAccess", "AWSGlueConsoleFullAccess", and "AWSGlueServiceRole" permissions attached to it. There will also be a new policy created and attached to the role. The role is now ready for most simple ETL jobs.

## Creating the AWS Glue Job

Now that we have the role created, we can create the job. To get started, go back to the AWS Glue console and click the "ETL jobs" link on the left side of the screen.

![AWS Glue's ETL jobs list](/images/aws-glue-csv-to-parquet/aws-glue-etl-jobs-list.png)

## Next Steps
