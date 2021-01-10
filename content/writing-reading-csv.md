Title: Reading From and Writing to CSV Files in Python
Date: 2021-01-11 08:20
Category: Python
Tags: csv
Slug: reading-from-writing-to-csv-files-python
Series: Python 101
Authors: Frank Corso
Summary: Need to work with CSV files in Python? Learn how to open, read, and write to CSV files!
Status: published

One of the most common things you will do in Python is working with CSV files. Whether it is to create a CSV file with data from an API or perform some analysis on an existing CSV, working with CSV files is an essential step in learning Python.

## Opening Files in Python

When working with files, your first step is to open the file. In Python, this looks like this:

```
:::python
fh = open('somefile.csv')
``` 

The open function the file and return a file object, usually set to an `fh` variable for "File Handler". By default, [Python's open function](https://docs.python.org/3/library/functions.html#open) will open in reading mode. You can change this with the `mode` argument. If you wanted to open a file, delete everything in it, and then start writing to it, you would use:

```
:::python
fh = open('somefile.csv' mode='w')
```

Or, to open for reading and writing, you would use:

```
:::python
fh = open('somefile.csv' mode='r+')
```

Lastly, if you wanted to open the file to write to but keep the existing data, you use `a` for "append" like this:

```
:::python
fh = open('somefile.csv' mode='a')
```

Once you open the file, you need to close it using the `close()` method:

```
:::python
fh.close()
```

Instead of using the `close()` method, you can also use [the `with` statement](https://docs.python.org/3/reference/compound_stmts.html#with). Since I often forget to close the file (resulting in many issues), this is my preferred approach when I only need to open one file.

```
:::python
fh = open('somefile.csv' mode='w')

# Do stuff

fh.close()
```

is the same as

```
:::python
with open('somefile.csv' mode='w') as fh:
    # Do stuff
```

## Opening CSV Files in Python

While the above works with a lot of CSV files, there are two more arguments to the `open()` function you may need to use.

### Newlines

The first is the `newlines` argument. Depending on how the CSV was created and where it may be used, the newlines may be saved a few different ways. So, we want to turn on "universal newlines mode" but return the actual unaltered line endings by setting the newline argument like this:

```
:::python
with open('somefile.csv', newline='') as fh:
    # Do stuff
```

### Encoding

Depending on the encoding of the file, you may also need to specify the `encoding` argument. This would look like this:

```
:::python
with open('somefile.csv', newline='', encoding='utf-8') as fh:
    # Do stuff
```

## Reading and Writing Your First CSV File

To get started, let's do a simple exercise of writing a row to a new file and then reading that row.

To work with CSV files, we first need to [import the `csv` module](https://docs.python.org/3/library/csv.html).

```
:::python
import csv
```

Then, we will use it's `writer()` method to create a writer object that will perform the writing for us. We will then use its `writerow()` method to write a row in our CSV.

```
:::python
with open('example_one.csv', mode='w', newline='') as fh: # Open our file.
    csv_writer = csv.writer(fh) # Create our writer object.
    csv_writer.writerow(['Frank', 'Corso']) # Write our row of data.
```

Each item in the list given to `writerow()` will be in a different column within the CSV.

Now that we have our CSV created, we can now read it to get the first row. This time, we will use csv's `reader()` method to create a reader object which can be iterated over.

```
:::python
with open('example_one.csv', newline='') as fh: # Open our file.
    csv_reader = csv.reader(fh) # Create our reader object.
    for row in csv_reader: # Iterate over each row.
        print(row) # Print entire row
        print(row[0], row[1]) # Print only certain columns
```
```
:::python
['Frank', 'Corso']
Frank Corso
```

Each `row` in this example would be one row within the CSV file with each item corresponding to a column in the row.

## Reading and Writing CSV Files With Headers

Instead of using `writer()` and `reader()`, we can use `DictReader()` and `DictWriter()` when working with headers in our CSV file.

If we wanted to write the same data from above but set the columns as "FirstName" and "LastName", our code would look very similar. The main difference is that `DictWriter()` requires fieldnames to know the names of the columns.

```
:::python
with open('example_two.csv', mode='w', newline='') as fh: # Open our file.
    columns = ['FirstName', 'LastName'] # Define our columns.
    csv_writer = csv.DictWriter(fh, fieldnames=columns) # Create our writer object.
    csv_writer.writeheader() # Write our header row.
    csv_writer.writerow({'FirstName': 'Frank', 'LastName': 'Corso'}) # Write our row of data.
```

If the CSV you are reading from has headers, you can use the `DictReader()` method instead to not only skip the header row but also create dictionaries for the rows instead of just lists.

We will use similar code to before with only a slight change:

```
:::python
with open('example_two.csv', newline='') as fh:
    csv_reader = csv.DictReader(fh) # Create our reader object, automatically using the first row as the column names.
    for row in csv_reader: # Iterate over each row.
        print(row) # Print entire row
        print(row['FirstName'], row['LastName']) # Print only certain columns
```
```
:::python
{'FirstName': 'Frank', 'LastName': 'Corso'}
Frank Corso
```

## Next Steps

Now that you can read and write CSV files, what will you do with them? You can:

1. download data from an API and save it to a CSV
2. clean data from a raw CSV and create a new "processed" CSV
3. analyze data from a CSV
4. and much more!

If you are analyzing data from CSV's, your next step may be learning [pandas, the data analysis module](https://pandas.pydata.org), which can load CSV files and Excel files.