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

Scatterplots are a great way to visualize the relationship between two ranges for many data points. This is useful if you are looking for trends or outliers in your data set.

In Python, we can use the Seaborn library to easily generate scatterplots.

## Creating Our First Scatterplot

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

## Creating a Scatterplot with Real Data

Now that we looked at a basic scatterplot, let's look at an example using real data with a nice graph that's closer to being "done."

First, the data is SOMETHNG!

We again set up our imports and prepare our data; reading from CSV in this case.

```python
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

df = pd.read_csv('test.csv')
```

### Setting Up Our Styles

Now, we can set up some styling options to apply to all of our Seaborn charts. We can do this using Seaborn's `set_theme` method. We can pass the method one of Seaborn's built-in styles to get started like this:

```python
sns.set_theme('white')
```

### Creating Our Chart

Now that we have applied our styles, we can start building our final graph. Seaborn makes these easy by having a `scatterplot` method. We can pass our data set to the method and define which data point goes along which axis.

```python
ax = sns.scatterplot(data=df, x='', y='')
```

INSERT IMAGE

Next, we can add our title and labels for the chart.

```python
plt.title('')
plt.xlabel('')
plt.ylabel('')
```

INSERT IMAGE

Our chart is starting to look good. But, there are some interesting data points in the graph. It might be useful to add an annotation with some additional details.

```python
ax.what()
```

INSERT IMAGE

## Next Steps
