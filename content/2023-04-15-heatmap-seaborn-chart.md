---
Title: Creating A Scatterplot Chart In Seaborn
Date: 11-25-2022 09:00:00
Tags: python,seaborn,heatmap
Category: Data Visualization
Slug: seaborn-heatmap
Authors: Frank Corso
Summary: TBD
Description: TBD
Status: draft
---

Heatmaps are a great way to visualize frequency or ranges of a multi-dimensional dataset. For example, you could quickly show which features are used the most for users on different paid plans of a SAAS app. Or, you could show which fields of a GraphQL API are used the most between different customer personas. 

This is useful if you are looking for trends or outliers in your data set. This could be in your early analysis to see what you want to look deeper into or it could be when sharing findings with stakeholders or a broader audience.

In Python, we can use [the Seaborn library]((https://seaborn.pydata.org)) to easily generate heatmaps. If you are new to Seaborn, you can glance through [my "Creating Your First Chart Using Seaborn" article](https://frankcorso.dev/seaborn.html) to get a quick sense of how Seaborn works. 

## Creating Our First Heatmap

First, let's set up our imports and load our data. For this first graph, we'll use fake data showing XXXX.

```python
import pandas as pd
import seaborn as sns

fake_data = []

fake_df = pd.DataFrame.from_records(fake_data)
```

Seaborn has many different methods for creating charts. For heatmaps, we can [use the `heatmap` method](https://seaborn.pydata.org/generated/seaborn.heatmap.html). This method accepts a dataset along with what should be along each axis.

For our fake dataset, our code will look like this:

```python
sns.heatmap(data=fake_df)
```

This creates a very basic heatmap like this:

![A basic heatmap graph with no labels or title. Shows XXXX.]({static}/images/seaborn-scatterplot-example-1.png)

We can quickly see that XXX.

## Creating a Heatmap with Real Data

### Setting Up Our Styles

### Creating Our Chart

NEXT STEPS