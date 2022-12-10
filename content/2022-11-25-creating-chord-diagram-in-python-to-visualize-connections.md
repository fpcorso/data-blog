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

If the data point you are trying to visualize has fewer than a dozen or possible options, the chord diagram is a great way to analyze and view the connections.

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
# stuff
connections = []
```

The `Chord` method accepts a dataframe with `source`, `target`, and `value` columns where `source` and `target` are numerical representations of the "to" and "from" categorical options and the `value` is how many connections it has.

We can pass this dataframe to the `Chord` method to get our first diagram:

```python
hv.Chord(connections)
```

![]({static}/images/chord-example-1.svg)

We can add labels to the diagram by passing a "nodes" data set. The nodes will have two columns, `index` for the numerical representation of a value and `name` for the label.

```python
nodes = []
hv.Chord((connections, nodes))
```

NEXT STEPS