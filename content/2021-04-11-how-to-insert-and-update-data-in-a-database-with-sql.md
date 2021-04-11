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
VALUES ("Jessica", "fake@fake.com", "555-1234");
```

In addition to our table of pet owners, we had also looked at our pets table, shown below.

![](/images/pets-table.png)

Now, let's say Jessica has two pets: Brownie and Mr. Whiskers. We can use the same SQL syntax as before but we can pass two sets of values as shown below.

```
:::sql
INSERT INTO Pets (owner_id, name, birthday, type)
VALUES (4, "Brownie", "02/23/2021", "dog"),
(4, "Mr. Whiskers", "12/04/2020", "cat");
```

To insert multiple rows, you can include as many value lists after the `VALUES` keyword as you need.

## The UPDATE Statement

Once you have data in your tables, there will be many times where you need to update that data. To do this, we use the `UPDATE` statement. The syntax looks like this:

```
:::sql
UPDATE table_name
SET column_name = "some value"
WHERE column_name = "some other value";
```

Notice the `WHERE` statement in this SQL. If your update SQL does not have a `WHERE` condition, it will update the value for all the records in the table. It is important to remember to almost always use the `WHERE` condition.

Let's say that when we entered the information for "Mr. Whiskers" that we accidentally put in the wrong birthday. To update his birthday, we can use this SQL:

```
:::sql
UPDATE Pets
SET birtday = "12/14/2020"
WHERE id = 5;
```

With our WHERE statement, we are only updating the value for the birthday column where the id is 5, which is the row for Mr. Whiskers.

We can update as many columns as we want during this SQL. Let's say that we accidentally entered the wrong birthday and misspelled Brownie's name when we entered her into the table. We can update her row using this SQL:

```
:::sql
UPDATE Pets
SET birtday = "02/13/2021", name = "Brownie"
WHERE id = 4;
```

Like with the SELECT statement, we can use as many conditions in the WHERE statement as needed. So, if we wanted to update