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

There are a lot of different database technologies and platforms including MySQL, PostgreSQL, MariaDB, and more. But, before you jump into any of them, let's take a high-level overview of how they are structured.

To do so, we will explore structuring a very basic database for a pet groomer which will include all the pet owners, each of their pets, and which toys the pets like.

I'll be creating something called an "entity relationship diagram" to demonstrate how databases are structured. While these can be complex yet useful, I am creating a very simplified version for learning purposes. However, I encourage you to learn more about them as you continue learning SQL as they can be valuable in creating models and representations for databases you are working with.

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

Our pets will also have some data about them including their name, type of animal, and their birthday.

INSERT IMAGE

The tables for our pet owners and their pets will be related. We want to know who owns which pet. This is will be a "relationship" which is what we call the way two tables are connected.

There are many types of relationships which you will comes across as you learn SQL. For now, we will stick with one of the most common called the "One to Many" relationship. In this connection, a row in one table can be connected to many rows in another table.

For example, in our database, one pet owner can own many pets but each pet will only have one owner.

INSERT IMAGE

Let's add a few pets into our pets table.

INSERT IMAGE

Now, you might have noticed another column that wasn't an attribute: the "owner_id" column. This is called a "foreign key." A foreign key is an identifier that matches another tables primary key. This column tells use which pet owner owns this animal.

For example, if we look for "Frank" in our pet owners table, we see his id is 1. If we look in the pets table at the pet_owner_id column and find the 1, we can see that his pet is Bambino the cat.

Let's add one more thing to our pet groomer's database. Maybe our pet groomer likes to surprise the pets with a toy they like. So, we need to know which toys which pets like. The toys may have a few attributes like name, color, and cost.

INSERT IMAGE

Next, let's consider what type of relationship this table will have with our pets table. Each pet might like multiple toys, like our one-to-many relationship for pet owners and pets. However, each toy could be liked by multiple pets too.

This is where the 2nd most common relationship comes in: the "Many to Many" relationship.

INSERT IMAGE

In a many-to-many relationship, each row in each table can be attached to multiple rows in the other table. For example, the pet Bambino might like both the ball and the mouse. But, the ball might be liked by the pets Bambino and Spot. 

In the one-to-many relationship before, we added a foreign key to represent which one row the pets were attached to. However, since Bambino and Spot both like two toys, we couldn't add both toys into a single column for the pet. Likewise, since the ball is liked by two pets, we couldn't add both pets into a single column for the toy either. 

Instead, in a many-to-many relationship, we'll create a separate table to represent this relationship.

INSERT IMAGE

In this 4th table, called "PetToys," we will keep a record of which toys which pets like. You may notice that pet_id and toy_id look similar to the owner_id from before and you would be right. Each of these columns will be a foreign key that represents the pet or toy from their respective table.

So, if we want to say Bambino likes the ball and mouse toys, we would add two new rows as shown.

INSERT IMAGE

Then, to add the toys that Spot likes, we will add a few more rows.

INSERT IMAGE

With our 4 tables set up, our database for the pet groomer is now ready!

NEXT STEPS

Now that you have a high-level overview of how databases are structured, you are ready to start learning how to get data out of the database using SQL. Or, if you want to learn more about the structure first, I would encourage you to learn about the different types of columns including INT, VARCHAR, and TEXT.

