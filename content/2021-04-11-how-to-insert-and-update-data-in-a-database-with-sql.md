---
Title: How to insert and update data in a database with SQL
Date: 2021-04-11T20:09:31.276Z
Tags: query
Category: SQL
Slug: how-to-insert-update-data-sql
Authors: Frank Corso
Summary: Summary
Description: My Description
Status: draft
---
In my previous posts in this series, we explored how tables are set up and how to select data from them. But, what if you need to add or edit the data in the tables? That is what we are exploring in this article.

## The INSERT Statement

In order to insert data into a table, you will use the `INSERT INTO` and `VALUES` statements. The SQL will look like this:

```
:::sql
INSERT INTO table_name (column_1)
VALUES ("some_value");
```

To begin, we need to specify which table we are inserting data into. From there, we need to state which columns you are adding data for by listing them in a comma-separated list enclosed in parenthesis. Lastly, we then set the data for each of those columns using the `VALUES` statement, in a similar list as the column names.

Let's look at a table we explored in an earlier article in this series:

![Example database table of "Owners" with 3 rows in it.](/images/pet-owners-table-filled.png)

In this table, we have a list of pet owners. If we wanted to add a new owner, such as Jessica, we would use this SQL:

```
:::sql
INSERT INTO Owners (name, email, phone)
VALUES ('Jessica', 'fake@fake.com`, '555-1234);
```

In addition to our table of pet owners, we had also looked at our pets table, shown below.

![](/images/pets-table.png)

Now, let's say Jessica has two pets: Brownie and Mr. Whiskers. We can use the same SQL syntax as before but we can pass two sets of values as shown below.

```
:::sql
INSERT INTO Pets (owner_id, name, birthday, type)
VALUES (4, 'Brownie', '02/23/2021', 'dog'),
(4, 'Mr. Whiskers', '12/04/2020', cat');
```

To insert multiple rows, you can include as many value lists after the `VALUES` keyword as you need.

## The UPDATE Statement

UPDATE

\-- Update all

\-- Update with single where

\-- Update with multiple where

NEXT STEPS