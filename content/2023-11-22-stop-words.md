---
Title: Stop Words
Date: 02-16-2024 09:00:00
Tags: machine learning, nlp, scikit
Category: Data Science
Slug: stop-words
Authors: Frank Corso
Summary: TBD
Description: TBD
Status: draft
---

When creating machine learning models or doing data analysis on text data, you may quickly discover there are a lot of words that are messing up your output.

For example, let's say you have 100 posts and wanted to see what were the most common words being used in across them. You could count each word instance, sum them up, and then show the top 10.

However, you will find that most of the words in that top ten are words like "the", "an", "and", "a", etc... These words do not provide any value to our analysis and can get in the way of our actual objectives.

We call words like this "stop words" and in this article, I will explore ways you can remove these stop words.

## What are stop words?

Let's say that we wanted to determine the most common topics written about on this blog. One very simplistic approach could be to simply see what words are used the most.

So, I can combine all the text across all of the blog posts and then create a word count for all instances of each word.

## How do we remove stop words?

TODO: Include note about weirdness in stop word lists.

### NLTK

### spaCy

### scikit-learn

## Next Steps
