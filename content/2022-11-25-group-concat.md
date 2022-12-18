---
Title: Group concat
Date: 12-27-2022 08:00:00
Tags: mysql,subquery
Category: SQL
Slug: mysql-group-concat
Authors: Frank Corso
Summary: TBD
Description: TBD
Status: draft
---
When analyzing data in your MySQL database or querying for data, there are times when you have data points that could have multiple values. For example, a post might have multiple tags or an order might have multiple products.

Querying for these are fairly straightforward, but sometimes you want results where a single row in the response includes both the parent data and the children data.

There are several ways we can do this but the easiest is using GROUP_CONCAT. GROUP_CONCAT can take a group of data points and convert it into a comma-separated list as a single value. I tend to use this function several times a week at least.

## Example Using GROUP_CONCAT

The most basic way to use this function is just grouping together values from a single table.

Let's say we have a "Survey" table that contains user research surveys. This table might have a `title` column for what the user named the survey.

If we wanted to get a comma-separated list of all the names, we could do something like this SQL:

```sql
SELECT GROUP_CONCAT(title)
FROM Survey;
```

```
Post-sale survey,Random Test Survey,Testing Potential Survey,what does this do?,My Survey
```

Of course, you wouldn't normally get all values of a column for the whole database so this would normally contain a WHERE statement like this:

```sql
SELECT GROUP_CONCAT(title)
FROM Survey
WHERE user_id = 17;
```

```
Post-sale survey,My Survey
```

This allows us to quickly get a list of values from the table.

We can also adjust the separator if we didn't want to use commas. Using the `SEPARATOR` keyword will let us change that as in this SQL:

```sql
SELECT GROUP_CONCAT(title SEPARATOR '; ')
FROM Survey
WHERE user_id = 17;
```

```
Post-sale survey; My Survey
```

Using GROUP_CONCAT on a single table is helpful to quickly see a list of values. I use this when I am grouping by certain values within the table for analysis. 

While using this within a table is useful, the greater usefulness of GROUP_CONCAT comes when you are getting values from multiple tables.

## Example Using GROUP_CONCAT In Subquery

Let's say we had our `Survey` table and then a `Question` table that had questions within the surveys. The `Question` table has a variety of columns but the ones we care about would be `survey_id`, which tells us which survey it belongs to, and `title` which is the question itself.

Now, let's say we wanted to perform a query to get all surveys by a user and include a list of all questions in each survey. We can do this using GROUP_CONCAT in a SELECT subquery.

```sql
SELECT title, (
    SELECT GROUP_CONCAT(title)
    FROM Question
    WHERE survey_id = Survey.id
) as questions
FROM Survey
WHERE user_id = 17;
```

| title            | questions                                                                             |
|------------------|---------------------------------------------------------------------------------------|
| Post-sale Survey | How easy was our checkout process?,What almost stopped you from making this purchase? |
| My Survey        | Test Question,Another Fake Question                                                   |


## Example Using GROUP_CONCAT In Subquery With JOIN

While this works well for a lot of use cases already, you will often have a many-to-many relationship that you want to pull into this query.

Let's say we have a third and fourth table, `Tag` and `Survey_Tag`. These tables create a many-to-many relationship for different tags people can attach to their surveys for filtering and reporting purposes.

We can update our previous query to pull in both the questions and the tags by using a JOIN in the tags subquery. Depending on how larger your dataset is and how well it's optimized, you might need to be more narrow in your queries to avoid timeouts or this taking a long time. However, assuming our database is an average size, this SQL would work:

```sql
SELECT title, (
    SELECT GROUP_CONCAT(title)
    FROM Question
    WHERE survey_id = Survey.id
) as questions, (
    SELECT GROUP_CONCAT(title)
    FROM Survey_Tag
    LEFT JOIN Tag ON Survey_Tag.tag_id = Tag.id
    WHERE Survey_Tag.survey_id = Survey.id
) as tags
FROM Survey
WHERE user_id = 17;
```

| title            | questions                                                                             | tags                          |
|------------------|---------------------------------------------------------------------------------------|-------------------------------|
| Post-sale Survey | How easy was our checkout process?,What almost stopped you from making this purchase? | checkout,revenue,sales funnel |
|  My Survey       | Test Question,Another Fake Question                                                   | random,testing                |

