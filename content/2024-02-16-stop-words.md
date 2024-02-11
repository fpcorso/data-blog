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

So, I can combine all the text across all of the blog posts and then create a word count for all instances of each word. For this article, we'll assume I've already cleaned the text and prepared it for this type of analysis.

Our first attempt might look something like this:

```python
from collections import Counter

my_cleaned_text = '' # Some cleaned text we've prepared, possibly also used lemmatization/stemming

Counter(my_cleaned_text.split()).most_common(10)
```

```python
[('the', 510),
 ('to', 280),
 ('a', 222),
 ('we', 159),
 ('in', 148),
 ('and', 142),
 ('of', 133),
 ('data', 129),
 ('this', 126),
 ('you', 124)]
```

We can see that most of our top words are not really "topics" but rather filler words, such as "the" and "to". The "stop words" are messing up our analysis. If we removed stop words, we would get a different set like this:

```python
['data',
 'python',
 'sql',
 'athena',
 's3',
 'table',
 'aws',
 'query',
 'analysis',
 'seaborn']
```

As you can see, this list better represents what this text is about and what meaningful words I've used in my blog posts.

## How do we remove stop words?

TODO: Include note about weirdness in stop word lists.

### NLTK

### spaCy

### scikit-learn

## Next Steps
