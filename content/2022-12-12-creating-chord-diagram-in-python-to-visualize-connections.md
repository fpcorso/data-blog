---
Title: Visualizing Connections Using Chord Diagrams in Python
Date: 12-12-2022 08:00:00
Tags: python
Category: Data Visualization
Slug: chord-diagram-python-visualize-connections
Authors: Frank Corso
Summary: Looking to visualize connections between different categorical values? Learn how to create a chord diagram!
Description: Looking to visualize connections between different categorical values? Learn how to create a chord diagram!
Status: published
---
It is often helpful to visualize the connections between categorical data points. This could help discover a large amount of overlap between two types or types that are typically tied together.

There are a few different ways we can visualize this, but the chord diagram is one diagram I have started using for data sets without too many different options for the categorical data point.

## What is a Chord Diagram?

A while back, I created the following chord diagram for [Podchaser](https://www.podchaser.com/) while doing some analysis on their podcast category data. It was interesting to see some categories having a lot of connections while others have very few connections. Additionally, some categories didn't have any connections between them.

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Interesting! 🤯<br><br>No, this isn&#39;t a New York City subway map or a failed dreamcatcher.<br><br>We analyzed how categories in the top 1,000 <a href="https://twitter.com/hashtag/podcasts?src=hash&amp;ref_src=twsrc%5Etfw">#podcasts</a> overlap.<br><br>Who knew True Crime and Comedy were such kindred spirits? <a href="https://t.co/UQiQShRDDi">pic.twitter.com/UQiQShRDDi</a></p>&mdash; Podchaser (@Podchaser) <a href="https://twitter.com/Podchaser/status/1570845326575276034?ref_src=twsrc%5Etfw">September 16, 2022</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 

A chord diagram shows all the possible options for a categorical value and the number of connections between each option. The chord diagram is a great way to analyze and view the connections. For example, if you have a dataset of posts with different tags or movies that are in multiple categories, using a chord diagram would be a useful way to see if there are any data points with either a lot of connections or very few connections compared to the average.

## Creating a Chord Diagram in Python

We can use the Python library, [Holoviews](https://holoviews.org/index.html), to help us create our diagram. Holoviews is a library that extends an underlying visualization library, such as MatplotLib. This library offers a variety of graphs, and you can switch which library it is extending (such as MatplotLib or Bokeh) so you can use the library that best works for your needs.

Holoviews is designed to work great with Pandas, which we'll use below. However, there are also methods for using a few different data types.

First, we need to install Holoviews. I'd suggest installing the recommended setup using:

`pip install "holoviews[recommended]"`

Once installed, we can create our Python script or Notebook and get started.

To start, we import the modules we need and let Holoviews know which library we are extending.

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

![A circular graph with lines connecting some points through the middle.]({static}/images/chord-example-1.svg)

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

![The same circular graph as above but with each of the main points being labelled with names such as stuff and things.]({static}/images/chord-example-2.svg)

The `opts` method allows us to pass a variety of options and settings to create our diagram, such as the labels column.

We're able to start seeing the connections, but it's challenging to evaluate with all the lines being the same color. We can use the `opts` method to pass some settings for adjusting edge and node colors.

```python
hv.Chord((connections, nodes)).opts(
    opts.Chord(cmap='Category20', edge_color=dim('source').astype(str), labels='name', node_color=dim('index').astype(str)))
```

![The same graph as above but instead of the lines being black, each data point has its own color and lines match its color.]({static}/images/chord-example-3.svg)

The diagram is looking much better now. We can start to see which nodes have the most connections between them.

Now that we have created a basic diagram, let's look at how this would work for an actual data set.

Your categorical data could be in a variety of formats. For this example, we are looking at a data set that has 2 "types" per entity, and we'll visualize connections between these different types.

I found [a dataset on Kaggle](https://www.kaggle.com/datasets/rounakbanik/pokemon) of all the Pokemon and their types. Pokemon is a video game with hundreds of animal-like creatures with different "types." Pokemon can have 1 or 2 types, and there are 18 potential types.

To make this simple, I'll only look at Pokemon that have 2 types and use pandas value_counts() method to quickly extract out the main connection counts.

```python
import pandas as pd
import holoviews as hv
from holoviews import opts, dim

hv.extension('matplotlib')
hv.output(fig='svg', size=500)
```

```python
pokemon_df = pd.read_csv('pokemon.csv')
two_types_df = pokemon_df[~pokemon_df['type2'].isnull()]
two_types_df['types'] = two_types_df.apply(lambda x: f'{x["type1"]},{x["type2"]}', axis=1)
type_connections = two_types_df['types'].value_counts().to_dict()

"""
type_connections is in the format of:
{
    'normal,flying': 26,
    'ghost,dark': 12
}
"""
```

Now, we have a dict of type combinations and counts. If this were a larger and more complex data set, we'd have to approach this differently, but for this, I'll loop over the type combinations and convert it into a dict of source types with their accompanying target types.

```python
"""
Cycle over our type combinations, split each, and add it to our connections 
dict to end up with a format like:

connections = {
    'normal': {
        'targets': {
            'flying': 26,
            'water': 12
        }
    }
}
"""

connections = {}
for type_combo, value in type_connections.items():
    pk_types = type_combo.split(',')
    for pk_type in pk_types:
        if pk_type not in connections:
            connections[pk_type] = {'targets': {x: value for x in pk_types if x != pk_type}}
        else:
            for target in pk_types:
                if pk_type == target:
                    continue
                if target in connections[pk_type]['targets'].keys():
                    connections[pk_type]['targets'][target] += value
                else:
                    connections[pk_type]['targets'][target] = value
```

Now, we need to convert this to our chords and nodes format. Plus, there might be some source->target inverse (such as normal/flying vs flying/normal) that we want to convert all to the same for our individual chord record.

```python
chords = pd.DataFrame(columns=['source', 'target', 'value'])
nodes_df = pd.DataFrame(columns=['name'])
for pk_type, target_data in connections.items():
    
    # We want to insert into our nodes df and use that index as the numerical representation in the chords dataframe.
    if pk_type not in nodes_df['name'].values:
        nodes_df = nodes_df.append(pd.Series([pk_type], index=nodes_df.columns), ignore_index=True)
    type_id = int(nodes_df[nodes_df['name'] == pk_type].index[0])
    
    
    for target, counts in target_data['targets'].items():
        if target not in nodes_df['name'].values:
            nodes_df = nodes_df.append(pd.Series([target], index=nodes_df.columns), ignore_index=True)
        target_id = int(nodes_df[nodes_df['name'] == target].index[0])

        # During our process in the last code block, we add each count twice:
        # Once for the source and once for the target. So, we want to make sure we add it only once.
        is_already_in = chords[(chords['source'] == target_id) & (chords['target'] == type_id)]
        if len(is_already_in) == 0:
            chords= chords.append(pd.Series([type_id, target_id, counts], index=chords.columns), ignore_index=True)

# Make sure our values are ints.
chords['value'] = chords['value'].astype('int')
```

Now, we can pass our nodes dataframe to the Dataset method and then create our diagram.

```python
nodes = hv.Dataset(nodes_df.reset_index(), 'index')
hv.Chord((chords, nodes)).opts(
    opts.Chord(cmap='Category20', edge_color=dim('source').astype(str), labels='name', node_color=dim('index').astype(str)))
```

![A circular graph with Pokemon types around the outside, such as fire and water, with lines connecting the types to each other.]({static}/images/chord-example-pokemon.svg)

We now have our finished Chord diagram! We can quickly spot that there are a lot of Pokemon with normal & flying. There are also quite a bit of connections between bug and poison, between grass and poison, and between flying and bug.

## Next Steps
Once you work with the Chord diagrams, there are a few things more you can do, such as:

1. Use Bokeh as the main library instead to have an interactive Chord diagram
2. Using the `select` method on the Chord object, you can filter what data in the chords dataframe gets visualized

If you create any fun Chord diagrams, let me know!