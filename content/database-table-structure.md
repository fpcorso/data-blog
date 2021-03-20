Title: Learn How Databases and Tables Are Structured
Date: 2021-02-01 08:20
Category: SQL
Tags: table
Slug: learn-how-databases-tables-structured
Series: SQL 101
Authors: Frank Corso
Summary: Just getting started with SQL? Let's learn a high-level overview of how databases and tables are structured!
Description: Just getting started with SQL? Let's learn a high-level overview of how databases and tables are structured!
Status: published

If you are just starting to learn SQL (or even if you know it!), it is essential to understand how databases and tables are structured.

Each site or project will have its own database. The databases will contain most or all of the data for the project.

There are a lot of different database technologies and platforms including [MySQL](https://www.mysql.com/), [PostgreSQL](https://www.postgresql.org/), [MariaDB](https://mariadb.org/), and more. But, before you jump into any of them, let's take a high-level overview of how the databases are structured.

To do so, we will explore structuring a very basic database for a pet groomer, which will include all the pet owners, each of their pets, and which toys the pets like.

I'll be creating something called an "entity-relationship diagram" to demonstrate how databases are structured. While these are usually fairly complex yet useful, I am creating a very simplified version for learning purposes. However, I encourage you to [learn more about them](https://www.smartdraw.com/entity-relationship-diagram/) as you continue learning SQL as they can be valuable in creating models and representations for databases you are working with.

## What Are Tables?

Within the database will be a series of tables. Each of these tables will represent a main concept or thing, referred to as an "entity." For example, one of our tables will contain all of our pet owners. Another table will include all of their pets.

These tables look a lot like spreadsheets with rows and columns. However, while represented that way, they are actually very different in how they work and how the database stores the data.

## Setting Up Our Pet Owners Table

We want to store many things about each pet owner in our table, including their name, email, and phone number. These are called our pet owner's "attributes."

Here is a very basic diagram of our pet owners, displayed as an "entity-relationship diagram":

![Diagram showing pet owners in the middle with name, email, and phone connecting to it.]({static}/images/erm-pet-owners.png)

These different attributes will become the "columns" of our table, where each attribute is its own column, as shown in the table.

![Owners table with columns for id, name, email, and phone.]({static}/images/pet-owners-table.png)

Now, you may have noticed there was an additional column we didn't have listed as an attribute. The "id" column is our "primary key." The primary key is what represents this data elsewhere in the database as well as throughout any application or site that uses the database.

Let's add a few people into our pet owners table.

![Owners table with three new rows in it.]({static}/images/pet-owners-table-filled.png)

As you can see, each entry we add into the table becomes a new "row" in the table. And, each entry gets its own primary key assigned to it.

## Setting Up Our Pets Table Using One-to-Many Relationship

Our pets will also have some data about them including their name, type of animal, and their birthday.

![Diagram showing pets in the middle with name, type, and birthday connecting to it.]({static}/images/erm-pets.png)

The tables for our pet owners and their pets will be related. We want to know who owns which pet. This will be a "relationship," which is what we call the way two tables are connected.

There are many types of relationships that you will come across as you learn SQL. For now, we will stick with one of the most common, called the "One to Many" relationship. In this connection, a row in one table can be connected to many rows in another table.

For example, in our database, one pet owner can own many pets, but each pet will only have one owner.

![Diagram showing the pet and owners diagrams connected by a line.]({static}/images/erm-owners-pets.png)

Let's add a few pets into a pets table.

![Pets table with three rows in it representing the three pets.]({static}/images/pets-table.png)

Now, you might have noticed another column that wasn't an attribute: the "owner_id" column. This is called a "foreign key." A foreign key is an identifier that matches a row's primary key from another table. This column tells us which pet owner owns this animal.

For example, if we look for "Frank" in our pet owners table, we see his id is 1. If we look in the pets table at the owner_id column and find the 1, we can see that he has two pets: Bambino and Skittles.

## Setting Up Our Toys Table Using Many-to-Many Relationship

Let's add one more thing to our pet groomer's database. Maybe our pet groomer likes to surprise the pets with a toy they like. So, we need to know which toys which pets like. The toys may have a few attributes like name, color, and cost.

Next, let's consider what type of relationship this table will have with our pets table. Each pet might like multiple toys, like our one-to-many relationship for pet owners and pets. However, each toy could be liked by multiple pets too.

This is where the 2nd most common relationship comes in: the "Many to Many" relationship.

![Diagram showing the pet and toy diagrams connected by a line.]({static}/images/erm-pets-toys.png)

In a many-to-many relationship, each row in each table can be attached to multiple rows in the other table. For example, the pet Bambino might like both the ball and the mouse. But, the ball might be liked by the pets Bambino and Spot. 

In the one-to-many relationship before, we added a foreign key to represent which one row the pets were attached to. However, since Bambino likes two toys, we couldn't add both toys into a single column for the pet. Likewise, since the ball is liked by two pets, we couldn't add both pets into a single column for the toy either. 

Instead, in a many-to-many relationship, we'll create a separate table to represent this relationship.

![Tables for toys and for pet and toys.]({static}/images/pet-toy-table.png)

So, we will create a 3rd table for toys but then create a 4th table too. In this 4th table, which we'll call "pet_toy," we will keep a record of which pets like which toys. You may notice that pet_id and toy_id look similar to the owner_id from before, and you would be right. Each of these columns will be a foreign key that represents the pet or toy from their respective table.

So, if we want to say Bambino likes the ball and mouse toys, we would add two new rows as shown.

![Pet toy table with two rows filled in. Both with matching values in the pet id column.]({static}/images/pet-toy-table-filled.png)

Then, to add the toys that Spot likes, we will add a few more rows.

![Pet toy table with four rows filled in.]({static}/images/pet-toy-table-filled-2.png)

With our four tables set up, our database for the pet groomer is now ready!

## Next Steps

Now that you have a high-level overview of how databases are structured, you are ready to start learning how to get data out of the database using SQL. Or, if you want to learn more about the structure first, I would encourage you to learn about the different types of columns, including INT, VARCHAR, and TEXT.

