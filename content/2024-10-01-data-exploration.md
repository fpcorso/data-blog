---
Title: TBD
Date: 10-04-2024 09:00:00
Tags: 
Category: Data Science
Slug: data-exploration
Authors: Frank Corso
Summary: TBD
Description: TBD
Status: draft
---

INTRO

## What is Exploratory Data Analysis?

An important step of working with data, the exploratory data analysis process requires you to review individual attributes (AKA variables, columns, etc...) of the dataset as well as how the attributes work with each other. We want to understand what areas might be a concern as well as what areas might be useful.

This process can help both by quickly understanding what the data looks like and identifying ways that you will be able to use the data.

The goal of this data exploration step is to evaluate the integrity and value of the dataset as well as identifying issues that you may need to fix or adjust.

Some questions you will want to answer include:

1. Are there any missing values?
2. Are there any outliers?
3. What does the distribution of the data look like?
4. Are any attributes skewed?
5. What is the variability of the attributes?
6. Are some attributes correlated?
7. Are there any errors in the data?

For example, if I am exploring a dataset that I want use to answer bigger questions such as "Can we predict when a customer might be about to churn?" or "Is there an ideal podcast episode length?", then I need to see if the dataset can actually answer those questions and do so reliably.

## Ways to do data exploration

The way one would approach this exploration will depend on how the dataset might be used. If you are using the data in a specific analysis project might require a different level of exploration than if you are using the data for a machine learning model.

The exploration can be done in a variety of places, including spreadsheet software (Excel), Python, and R. My examples below will be in Python using Pandas but the same steps and principles can be done in most other analysis tools.

In most cases, I start by analyzing each variable individually (univariate analysis) to understand what it looks. I then move on to exploring how two attributes might be related (bivariate analysis). Then, if it makes sense to do so, I might do explore relationships across multiple variables (multivariate Analysis), especially if this is a large, 25+ attribute dataset I might be using in machine learning.

Let's explore these approaches individually.

### Univariate Analysis

In this first step of exploration, one looks at individual attributes. We want to see what the data looks like and identify potential issues.

Some potential issues might include:

1. Missing values,
2. Incorrect values,
3. Outliers

For example, let's look at some sample data points for a "height" attribute from a dataset about people:

> **Height (in inches)**: 63, 0, 64, 66, 70, 67, 78, 65, 182, 66

There are two things to observe in this sample. First, the `0` which in many data sets represent a missing value though this could also have been an incorrect value. Second, the 182 would mean the person is over 15 ft tall which is impossible. This was likely entered incorrectly.



### Bivariate Analysis

### Multivariate Analysis

## Next Steps


OUTLINE
- INTRO
- WHAT IS EXPLORATORY DATA ANALYSIS?
- APPROACHES
-- Univariate Analysis
-- Bivariate Analysis
-- Multivariate Analysis
- NEXT STEPS

** Include visualization examples and sample Python code in each of the approaches

POTENTIAL KEYWORDS
Data Exploration
Data Profiling
Data Discovery
Data Inspection
Data Investigation
Statistical Analysis
Data Analysis
Data Visualization
Data Cleaning
Data Preprocessing
Data Quality
Data Integrity
Data Validation
Statistical Modeling
Machine Learning
Data Science
Business Intelligence