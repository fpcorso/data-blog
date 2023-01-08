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

fake_data = [{
    'price': 1,
    'size': 2
}, {
    'price': 2,
    'size': 4
}, {
    'price': 3,
    'size': 4.2
}, {
    'price': 2.5,
    'size': 6
}, {
    'price': 4,
    'size': 1.2
}, {
    'price': 1.5,
    'size': 3
}, {
    'price': 2.5,
    'size': 5
}]

fake_df = pd.DataFrame.from_records(fake_data)
```


```python
sns.scatterplot(data=fake_df, x='size', y='price')
```

This creates a very basic scatterplot like this:

INSERT IMAGE

We can quickly see that there is a trend where as the size gets larger the price increases. However, it also easy to notice the outlier where the price is 4 and the size is 1.

## Creating a Scatterplot with Real Data

Now that we looked at a basic scatterplot, let's look at an example using real data with a nicer graph that's closer to being "done."

First, the data is the "Fortune Top 1000 Companies by Revenue 2022" dataset on Kaggle. This data set lists the Fortune 500 companies, and a few stats for the 2021 year, such as their market value and profits for 2021. Let's see if there are any interesting findings when we compare market values with a company's profits.

We again set up our imports and prepare our data. I downloaded the data set and cleaned up some of the data already. Then, we read in from the CSV I created.

```python
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

df = pd.read_csv('fortune-500-2022-prepared.csv')
```

### Setting Up Our Styles

Now, we can set up some styling options to apply to all of our Seaborn charts. We can do this using Seaborn's `set_theme` method. We can pass the method one of [Seaborn's built-in styles](https://seaborn.pydata.org/tutorial/aesthetics.html#seaborn-figure-styles) to get started like this:

```python
sns.set_theme('white')
```

While that gets us started, I normally make several additional tweaks to this. I tend to use [Matplotlib's rcParams system](https://matplotlib.org/stable/tutorials/introductory/customizing.html#matplotlib-rcparams). This sets the default values for all charts you'll create after you set them. This looks like this:

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
    "figure.figsize":(20, 10),
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

Now that we have applied our styles, we can start building our final graph. Seaborn makes these easy by having a `scatterplot` method. We can pass our data set to the method and define which data point goes along which axis.

```python
ax = sns.scatterplot(data=df, x='market_value', y='profit', color='#2A8737', legend=False)
```

INSERT IMAGE

Next, we can add our title and labels for the chart.

```python
ax.set_title('Fortune 500 Companies Market Value and Profits for 2021')
ax.set_xlabel('Market Value')
ax.set_ylabel('Profits')
```

INSERT IMAGE

It is also normally best practice to add some text telling the viewer what the source of the data is. This is helpful in case they want to dig deeper into the data. Additionally, it helps tell them how old the data is. This is useful in a variety of settings, even if you are only sharing charts within internal tools, such as Slack.

We could pass x and y values that are based on the data set (the default) but I like setting the transform to match the axis size as it tends to be easier for me to find the right values for where I am putting the text.

```python
ax.text(1, -.15, 'Source: Fortune Top 1000 Companies by Revenue 2022 on Kaggle', fontsize=12, horizontalalignment='right', transform=ax.transAxes)
```

Our chart is starting to look good. But, there are some interesting data points in the graph. It might be useful to add an annotation or two with some additional details. We can do this using the `annotate` method.

```python
ax.annotate(text='Apple', xy=(2849537,94680))
```

INSERT IMAGE

Having some text on top of the point is okay but we can make this a little nicer by moving the text a little away from the point and using an arrow.

```python
ax.annotate(text='Apple', xy=(2840000,94680), ha='center', xytext=(-75, -5), textcoords='offset points', arrowprops=dict(width=5, headwidth=10, color=secondary_color))
ax.annotate(text='Berkshire \n Hathaway', xy=(790942,89795), ha='center', xytext=(100, -10), textcoords='offset points', arrowprops=dict(width=5, headwidth=10, color=secondary_color))
ax.annotate(text='Tesla', xy=(1123707,5519), ha='center', xytext=(100, -5), textcoords='offset points', arrowprops=dict(width=5, headwidth=10, color=secondary_color))
ax.annotate(text='JPMorgan \n Chase', xy=(412526,48334), ha='center', xytext=(140, -10), textcoords='offset points', arrowprops=dict(width=5, headwidth=10, color=secondary_color))
```

INSERT IMAGE

Of course, what you annotate and how you label+title your chart will depend on the story you are telling. If you are more focused on the scenario where most of the Fortune 500 companies, while big companies, are dwarfed by the top companies, we would probably handle this chart differently.

## Next Steps

Great! We now have a basic chart that shows the relationship we wanted to visualize. If we are just reviewing this ourselves or sharing with a few team members, we probably have already done more work than we needed to. But, if you are planning on sharing this with a wider group or publicly, there are a few more things you could consider:

* The market value labels are not intuitive for all audiences. You can try replacing those with something like just "1 Trillion", "2 Trillion", and "3 Trillion".
* Some of the spacing could be tweaked to be nicer. For example: The axis labels are a bit close to the tick values and the annotations could use some more "breathing" room.
* The font sizes we currently have probably could be tweaked a bit more to create a better visual difference between the different text.