Title: How To Select Data From Databases Using SQL
Date: 2021-03-22 08:20
Category: SQL
Tags: select
Slug: select-data-from-database-using-sql
Series: SQL 101
Authors: Frank Corso
Summary: Learn how to get data from a database using the SELECT, WHERE, and LIMIT statements.
Description: Learn how to get data from a database using the SELECT, WHERE, and LIMIT statements.
Status: published

In [my previous article]({filename}/2021-02-01-database-table-structure.md), I wrote about how databases and tables are structured. In this article, I will explore how to query those tables to get data from them.

We use a language called `SQL` for querying databases. The implementation for SQL will differ slightly between different database types, such as MySQL vs. Postgres, but the majority of the language will be consistent across all database engines.

For most queries, you will have a series of statements -- these are usually all uppercase for readability -- and ending with a semi-colon. For many database engines, the semi-colon is optional, but some require it. Additionally, if we are running multiple queries in a row within the same action, you will need the semi-colon to tell the engine when each statement ends. So, I tend to always use a semi-colon.

For most database engines, white space does not matter, so you could write a query like:

```
:::sql
SELECT name FROM Customer WHERE LTV > 25;
```

as

```
:::sql
SELECT name
FROM Customer
WHERE LTV > 25;
```

For readability, I tend to have each main statement on its own line unless I am writing the query inside some code, such as in a Python script.

Now that we covered the basics, let's look at what these statements are and how to use them.

## The SELECT and FROM Statements

In order to begin selecting data, we need to learn the two most common SQL statements: SELECT and FROM. In the most basic usage, these statements work like this:

* Using the `SELECT` statement, we specify exactly what we want to retrieve from our database.
* Using the `FROM` statement, we specify what table we are retrieving data from.

Let's look at a very basic example. We will use our Pets table that we outlined in my previous article. It looks like this:

![Pets table with three rows in it representing the three pets.]({static}/images/learn-how-databases-tables-structured/pets-table.png) 

If we wanted to get all the data from this table, we would use this query:

```
:::sql
SELECT *
FROM Pets;
```

In a `SELECT` statement, the `*` is the same as "get all columns". If we use this command in our database with the Pets table, we would see all the columns and rows of the table.

But, maybe the table has a lot of columns, and we only need 2 or 3. Instead of using `*`, we can list the columns we want to retrieve. This is almost always the preferred way as you are only searching for and retrieving the data you actually need.

Let's get only the name and animal type of each pet. The SQL query will look like this:

```
:::sql
SELECT name, type
FROM Pets;
```

This will give us something that looks like this:

![Name and animal type for three pets.]({static}/images/select-data-from-database-using-sql/pets-table-name-type.png) 

## The WHERE Statement

For the majority of queries, it is unlikely that you will want to select all rows within a table. Instead, you will probably be only looking at specific rows. This is when we use the `WHERE` statement.

The `WHERE` statement takes a condition (or multiple conditions) and returns rows only when those conditions are true, such as if a column equals a certain value. If the column type is numerical, such as INT, you can use comparison operators, such as `>` or `<`.

Let's say we want to only get the name and birthday for only pets that are cats. We would only want rows where `type` is equal to `cat`. The SQL would look like this:

```
:::sql
SELECT name, birthday
FROM Pets
WHERE type = 'cat';
```

This will give us something that looks like this:

![Name and birthday for only cat pets.]({static}/images/select-data-from-database-using-sql/pets-table-name-bday-cats.png) 

You can also have multiple conditions in your `WHERE` statement using either `AND` or `OR`. Let's say we wanted to get all dogs named "Spot". The SQL query would be:

```
:::sql
SELECT name, birthday
FROM Pets
WHERE type = 'dog' AND name = 'Spot';
```

which would return this:

![Name and birthday for dogs named Spot.]({static}/images/select-data-from-database-using-sql/pets-table-dog-spot.png) 

## The LIMIT Statement

For many queries, you may only want to look at the first set of rows that match your `WHERE` condition. This is where the `LIMIT` statement comes in.

Using the `LIMIT` statement, we can specify how many rows to return. More importantly, the database will stop searching once it reaches this limit. If your table has two million rows, searching all the rows can take a while. Limiting the results to just the first matching rows can significantly speed up how fast the query can return results.

Let's say we only want the name and birthday of the first dog in our Pets table. Our SQL would be:

```
:::sql
SELECT name, birthday
FROM Pets
WHERE type = 'dog'
LIMIT 1;
```

## Next Steps

You are now ready to get out and start querying some data from databases. But, we have only looked at the most basic versions of each of these statements, and there is much more that you can do.

You will want to look into aggregation functions, such as `COUNT()` and `SUM()`, as well as more advanced statements, such as `ORDER BY`, `GROUP BY`, and `HAVING`. Lastly, you will want to learn about joining tables together using `JOIN`.

Be sure to subscribe below to get notified when the next entry in this SQL 101 series (and other articles on SQL + data) is published!


