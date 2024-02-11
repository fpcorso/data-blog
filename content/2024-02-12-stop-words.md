---
Title: Removing Stop Words Using Python
Date: 02-12-2024 09:00:00
Tags: machine learning, nlp, nltk, scikit, spacy
Category: Data Science
Slug: stop-words
Authors: Frank Corso
Summary: Working with text data for analysis or machine learning? You probably will need to remove stop words. Learn how in this article!
Description: Working with text data for analysis or machine learning? Learn how to remove stop words to avoid them messing up the output.
Status: published
---

When creating machine learning models or doing data analysis on text data, you may quickly discover there are a lot of words that are messing up your output.

For example, let's say you have 100 posts and want to see the most common words used across them. You could count each word instance, sum them up, and then show the top 10.

However, you will find that most of the words in that top ten are words like "the", "an", "and", "a", etc... These words do not provide any value to our analysis and can get in the way of our actual objectives.

We call words like this "stop words" and in this article, I will explore ways you can remove these stop words.

## What are stop words?

Let's say that we wanted to determine the most common topics written about on this blog. One very simplistic approach could be seeing what words I used the most across my blog posts.

So, I can combine all the text across all the blog posts and then create a word count for all instances of each word. For this article, we'll assume I've already cleaned the text and prepared it for this type of analysis.

Our first attempt might look something like this:

```python
from collections import Counter

my_cleaned_text = '' # Some cleaned text we've prepared

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
[('data', 129),
 ('query', 56),
 ('python', 56),
 ('athena', 54),
 ('s3', 47),
 ('table', 41),
 ('aws', 35),
 ('values', 35),
 ('analysis', 33),
 ('seaborn', 31)]
```

This list better represents what this text is about and what meaningful words I've used in my blog posts.

## How do we remove stop words?

So, how can we remove the stop words? We can do this in a few different ways depending on the frameworks you are using, the text you have, and your objectives.

Each library that can remove stop words has options to use different stop word lists. You will want to review the various options to find ones that align with what you want to remove and what you want to keep.

Important Note: Some of the stop word lists have unexpected words in them, such as "computer". If you are removing stop words as part of an important analysis, be sure to carefully review what words are in the list.

### NLTK

One of the most popular Python packages for removing stop words is [NLTK](https://www.nltk.org/). This package has many tools for analyzing and working with text.

If you are using this package, you can use its `word_tokenize` and `FreqDist` functions to create our counted instances list.

From there, we can use its `stopwords` to remove words using its "english" stop words list.

```python
from nltk.probability import FreqDist
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize

# Convert to list of words
tokens = word_tokenize(my_cleaned_text)

# Create frequency distribution, but remove stopwords
fdist = FreqDist(tokens)
for word in stopwords.words('english'):
    if word in fdist:
        del fdist[word]

fdist.most_common(10)
```

```python
[('data', 129),
 ('query', 56),
 ('python', 56),
 ('athena', 54),
 ('s3', 47),
 ('table', 41),
 ('aws', 35),
 ('values', 35),
 ('analysis', 33),
 ('seaborn', 31)]
```

When using this approach, we can also add a few more stop words to our list by using a simple union, such as:

```python
for word in (set(stopwords.words('english')).union({'create', 'need'})):
    if word in fdist:
        del fdist[word]
```

### spaCy

Another popular Python package when working with text data is [spaCy](https://spacy.io/). With spaCy, we can achieve the same thing using its `token.is_stop` property after we convert our text to an nlp doc.

```python
import spacy
from collections import Counter

# Load the spacy model we want to use.
nlp = spacy.load("en_core_web_sm")

# Convert to list of words, removing stop words.
doc = nlp(my_cleaned_text)
words = [token.text for token in doc if not token.is_stop]

# Count the frequency of each word
Counter(words).most_common(10)
```

```python
[('data', 129),
 ('query', 56),
 ('python', 56),
 ('athena', 54),
 ('use', 51),
 ('s3', 47),
 ('table', 41),
 ('aws', 35),
 ('values', 35),
 ('analysis', 33)]
```

Notice how the list that spaCy uses keeps the word `use` so it appears in our list when it did not when using NLTK.

### scikit-learn

While [scikit-learn](https://scikit-learn.org/) isn't the go to for natural language processing and text analysis, we can achieve our goal using its `CountVectorizer`. CountVectorizer will provide us with our words and their frequencies in the scikit way of indexing and feature names, which we can then zip up and sort.

```python
from sklearn.feature_extraction.text import CountVectorizer

# Initialize CountVectorizer with stop words.
vectorizer = CountVectorizer(stop_words='english')

# Get our frequency distribution. Note: This accepts a list so, 
# if we only have one, as we do here, make sure to pass it as a list.
word_freq = vectorizer.fit_transform([my_cleaned_text]).toarray()[0]

# Get our words.
words = vectorizer.get_feature_names_out()

# Create a dictionary of word frequencies.
word_freq_dict = dict(zip(words, word_freq))

# Sort the words based on frequency.
sorted(word_freq_dict.items(), key=lambda x: x[1], reverse=True)[:10]
```

```python
[('data', 129),
 ('query', 56),
 ('python', 56),
 ('athena', 54),
 ('use', 51),
 ('s3', 47),
 ('table', 41),
 ('using', 38),
 ('aws', 35),
 ('values', 35)]
```

## Next Steps

Now that you have worked with using stop words, you should explore using them in any of your text analyses. You can take this further by reviewing the words in the stop words lists and removing or adding words based on your objectives and text. For example, if you are working with tweets from X, you might want to add "rt" or "like" to the list.
