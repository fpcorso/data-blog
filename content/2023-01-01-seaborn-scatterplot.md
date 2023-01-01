---
Title: Creating Scatterplot Seaborn
Date: 01-01-2023 09:00:00
Tags: python
Category: Data Visualization
Slug: seaborn-scatterplot
Authors: Frank Corso
Summary: TBD
Description: TBD
Status: draft
---

Scatterplots are a great way to visualize the relationship between two ranges for many data points.

CREATING BASIC SCATTERPLOT

First, let's set up our imports and load in our data.

```python
import pandas as pd
import seaborn as sns

df = pd.read_csv('test.csv')
```


```python
sns.scatterplot(data=df, x='', y='')
```

This creates a very basic scatterplot like this:

INSERT IMAGE

If we had a 3rd dimension, we could turn this into a bubble plot by using the `size` parameter, like this:

```python
sns.scatterplot(data=df, x='', y='', size='')
```

This creates a basic bubble plot like this:

INSERT IMAGE

Now that we looked at a basic scatterplot, let's look at an example using real data with a nice graph that's closer to being "done."

First, the data is SOMETHNG!

We again set up our imports and prepare our data; reading from CSV in this case.

```python
import pandas as pd
import seaborn as sns

df = pd.read_csv('test.csv')
```

SET UP STYLES

CREATE BASIC CHART

CREATE CHART WITH LABELS AND TITLE

CREATE CHART WITH ANNOTATIONS

NEXT STEPS