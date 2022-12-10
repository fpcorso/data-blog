---
Title: Creating chord diagram in python to visualize connections
Date: 11-25-2022 08:00:00
Tags: python
Category: Data Visualization
Slug: chord-diagram-python-visualize-connections
Authors: Frank Corso
Summary: TBD
Description: TBD
Status: draft
---
It is often useful to try to visualize the connections between categorical data points. This could help discover a large amount of overlap between two types or maybe types that are normally tied together.

There are a few different ways we can visualize this but one diagram I have started using for data sets without too many different options for the categorical data point is the Chord Diagram.

## What is a Chord Diagram?

INSERT EXAMPLE IMAGE

A chord diagram shows all the possible options for a categorical value and the number of connections between each option. PROVIDE EXAMPLE

The chord diagram is a great way to analyze and view the connections.

## Creating a Chord Diagram in Python

We can use the Python library, [Holoviews](https://holoviews.org/index.html), to help us create our diagram. Holoviews is a library that extends an underlying visualization library, such as MatplotLib. This library offers a variety of diagrams and you can switch which library is it extending (such as MatplotLib vs Bokeh) so we can use the library that best works for your needs.

Holoviews is designed to work great with Pandas, which is what we'll use below. However, there are also methods for using a few different data types.

First, we need to install Holoviews. I'd suggest installing the recommended set up using:

`pip install "holoviews[recommended]"`

Once installed, we can create our Python script or Notebook and get started.

To start, we import the modules we will need and let Holoviews know which library we are extending.

```python
import pandas as pd
import holoviews as hv
from holoviews import opts, dim

hv.extension('matplotlib')
hv.output(fig='svg', size=500)
```

From there, let's create a very basic example data set first.

```python
# Create Pandas dataframe from an example list of dicts.
connections = pd.DataFrame.from_records([
    {'source': 0, 'target': 1, 'value':5},
    {'source': 0, 'target': 2, 'value':15},
    {'source': 0, 'target': 3, 'value':8},
    {'source': 0, 'target': 4, 'value':2},
    {'source': 1, 'target': 2, 'value':45},
    {'source': 1, 'target': 3, 'value':12},
    {'source': 1, 'target': 4, 'value':1},
    {'source': 2, 'target': 3, 'value':19},
])
```

The `Chord` method accepts a dataframe with `source`, `target`, and `value` columns where `source` and `target` are numerical representations of the "to" and "from" categorical options and the `value` is how many connections it has.

We can pass this dataframe to the `Chord` method to get our first diagram:

```python
hv.Chord(connections)
```

![]({static}/images/chord-example-1.svg)

We can add labels to the diagram by passing a "nodes" data set. The nodes will have two columns, `index` for the numerical representation of a value and `name` for the label.

```python
nodes = hv.Dataset(pd.DataFrame.from_records([
    {'index': 0, 'name': "Stuff"},
    {'index': 1, 'name': "Things"},
    {'index': 2, 'name': "Whatnots"},
    {'index': 3, 'name': "Odds & Ends"},
    {'index': 4, 'name': "Cups"},
]), 'index')
hv.Chord((connections, nodes)).opts(opts.Chord(labels='name'))
```

![]({static}/images/chord-example-2.svg)

We're able to start seeing the connections but it's a bit difficult to evaluate with all the lines being the same color.

```python
hv.Chord((connections, nodes)).opts(
    opts.Chord(cmap='Category20', edge_color=dim('source').astype(str), labels='name', node_color=dim('index').astype(str)))
```

![]({static}/images/chord-example-3.svg)

NEXT STEPS