---
Title: Creating A Heatmap Chart In Seaborn
Date: 11-25-2022 09:00:00
Tags: python,seaborn,heatmap
Category: Data Visualization
Slug: seaborn-heatmap
Authors: Frank Corso
Summary: TBD
Description: TBD
Status: draft
---

Heatmaps are a great way to visualize frequency or ranges of a multi-dimensional dataset. For example, you could quickly show which features are used the most for users on different paid plans of a SAAS app. You could also show which fields of a GraphQL API are used the most between different customer personas. Or, you can compare different months in different years for a specific event, such as number of sales or amount of rainfall.

This is useful if you are looking for trends or outliers in your data set. This could be in your early analysis to see what you want to look deeper into or it could be when sharing findings with stakeholders or a broader audience.

In Python, we can use [the Seaborn library]((https://seaborn.pydata.org)) to easily generate heatmaps. If you are new to Seaborn, you can glance through [my "Creating Your First Chart Using Seaborn" article](https://frankcorso.dev/seaborn.html) to get a quick sense of how Seaborn works. 

## Creating Our First Heatmap

First, let's set up our imports and load our data. For this first graph, we'll use fake data showing how many users are using a specific feature on specific plans. I have used a similar chart in the past to show which features are used the most (or the least) on different plans.

```python
import pandas as pd
import seaborn as sns

fake_data = [{
    'index': 'Starter Plan',
    'Feature A': 96,
    'Feature B': 43,
    'Feature C': 16
},{
    'index': 'Growth Plan',
    'Feature A': 93,
    'Feature B': 58,
    'Feature C': 76
}, {
    'index': 'Business Plan',
    'Feature A': 98,
    'Feature B': 87,
    'Feature C': 45
}]
fake_df = pd.DataFrame.from_records(fake_data, index='index')
```

Seaborn has many different methods for creating charts. For heatmaps, we can [use the `heatmap` method](https://seaborn.pydata.org/generated/seaborn.heatmap.html). This method accepts a dataset along with what should be along each axis.

For our fake dataset, our code will look like this:

```python
sns.heatmap(data=fake_df)
```

This creates a very basic heatmap like this:

![A basic heatmap graph with no labels or title. Shows some data points have higher or lower values than normal.]({static}/images/seaborn-heatmap/heatmap-1.png)

We can quickly see that feature A is used across all plans; however, feature B is used much more on the "Business" plan and feature C is rarely used on the "Starter" plan. Of course, this is fake data with only 3 features, so it would be easy to see this in a table. However, if you had a large dataset with many features, this would be a quick way to see which features are used the most or the least.

## Creating a Heatmap with Real Data

Now that we looked at a basic heatmap, let's look at an example using actual data with a nicer graph that's closer to being "done."

First, the data is ["IMDB Top 10,000 movies (Updated August 2023)" on Kaggle](https://www.kaggle.com/datasets/ashutoshdevpura/imdb-top-10000-movies-updated-august-2023). This data set provides us with the top movies, their metascores, and other metadata about the movie. Let's see if there are any interesting findings when we examine metascores based on genre and age-rating. I downloaded the data set and cleaned up some of the data already.

We again set up our imports read in from the CSV I created when preparing the data.

```python
import pandas as pd
import seaborn as sns

df = pd.read_csv('IMDB-top-10000-movies.csv')
```

### Setting Up Our Styles

Now, we can set up some styling options to apply to all of our Seaborn charts. We can do this using Seaborn's `set_theme` method. We can pass the method one of [Seaborn's built-in styles](https://seaborn.pydata.org/tutorial/aesthetics.html#seaborn-figure-styles) to get started like this:

```python
sns.set_theme('white')
```

While that gets us started, I usually make several additional tweaks to this. I tend to use [Matplotlib's rcParams system](https://matplotlib.org/stable/tutorials/introductory/customizing.html#matplotlib-rcparams). This sets the default values for all charts you'll create after you set them. This looks like this:

```python
primary_color = '#2A8737'
secondary_color = '#104547'
tick_size = 8
rc_params = {
    "axes.spines.right": False,
    "axes.spines.top": False,
    "axes.spines.bottom": False,
    "axes.spines.left": False,
    "axes.titlecolor": primary_color,
    "axes.titlesize": 24,
    "axes.titlelocation": "left",
    "axes.titlepad": 20,
    "axes.labelsize": 10,
    "axes.labelpad": 15,
    "figure.figsize":(12, 8),
    "xtick.labelcolor": secondary_color,
    "xtick.labelsize": tick_size,
    "ytick.labelcolor": secondary_color,
    "ytick.labelsize": tick_size,
    "yaxis.labellocation": "center",
    "text.color": secondary_color,
    "font.size": 14
}
sns.set_theme(style="white", rc=rc_params)
```

I encourage you to review both [Seaborn's aesthetics guide](https://seaborn.pydata.org/tutorial/aesthetics.html#seaborn-figure-styles) and [Matplotlib's rcParams guide](https://matplotlib.org/stable/tutorials/introductory/customizing.html#matplotlib-rcparams) and tweak the values until you find some styling that you like.

### Creating Our Chart

NEXT STEPS