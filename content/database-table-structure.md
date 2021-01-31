Title: XXXXX
Date: 2021-02-01 08:20
Category: SQL
Tags: table
Slug: xxxxx
Authors: Frank Corso
Summary: Just getting started with SQL? Learn how databases and tables are structured!
Series: SQL 101
Status: draft

If you are just starting to learn SQL (or even if you know it!), it is important to learn how databases and tables are structured.

Each site or project will have its own database. The databases will contain all the data for the project.

There are a lot of different database technologies and platforms including MySQL, PostgreSQL, MariaDB, and more. But, before you jump into any of them, let's review how they are structured.

To do so, we will explore structuring a very basic database for a pet groomer which will include all the pet owners and each of their pets.

Our Tables

Within the database will be a series of tables. Each of these tables will represent a main concept or thing. For example, one of our tables will contain all of our pet owners.

INSERT IMAGE

Another table will contain all of their pets.

INSERT IMAGE

These tables look a lot like spreadsheets with rows and columns. However, while represented that way, they are actually very different in how they work and how the database stores the data.

There are many things about each pet owner we would like to store in our table including their name, email, and phone number. These are called our pet owner's "attributes".

INSERT IMAGE

These different attributes will become the "columns" of our table where each attribute is its own column as shown in the table.

INSERT IMAGE

Now, you may have noticed there was an additional column we didn't have listed as an attribute. The "id" column is our "primary key." The primary key is what represents this data elsewhere in the database as well as throughout any application or site that uses the database.

Let's add a few people into our pet owners table.

INSERT IMAGE

As you can see, each entry into the table becomes a new "row" in the table. And, each entry gets its own primary key assigned to it.


RELATIONSHIPS

ONE TO MANY

MANY TO MANY(?)

NEXT STEPS


