---
Title: TBD
Date: 10-30-2023 10:00:00
Tags: accuracy
Category: Python
Slug: machine-learning-metrics-overview
Authors: Frank Corso
Summary: TBD
Description: TBD
Status: draft
---

When using machine learning to solve a classification problem, such as spam detection and fraud detection, it is important to measure the model's performance to see how well the model solves the problem. There are a variety of metrics that can be used for this with the most common being accuracy, precision, recall, sensitivity, specificity, and F1 score.

## Confusion Matrix

Before we explore the metrics, we first need to discuss how we label a correct prediction. We can use the "confusion matrix" to help us understand this. The confusion matrix is a table that shows the number of correct and incorrect predictions made by the model compared to the actual outcomes.

INSERT CONFUSION MATRIX IMAGE

Along the side of the matrix, we have the actual outcomes. For example, this could be "spam" and "not spam" for spam detection -- though this is more usually labelled positive and negative in most evaluations. Along the top side of the matrix, we have the predicted values, again normally labelled as positive and negative. The four created cells give us the four categories of predictions:

1. **True Positive (TP)**: The model correctly predicted the positive class. For example, if the item was spam and the model predicted it to be spam, it would be a true positive.
2. **False Positive (FP)**: The model incorrectly predicted the positive class. For example, if the item was not spam and the model predicted it to be spam, it would be a false positive. In medical models, this would be called a Type 1 error where the model predicted that the healthy patient was sick.
3. **False Negative (FN)**: The model incorrectly predicted the negative class. For example, if the item was spam and the model predicted it to be not spam, it would be a false negative. In medical models, this would be called a Type 2 error where the model predicted that the sick patient was healthy.
4. **True Negative (TN)**: The model correctly predicted the negative class. For example, if the item was not spam and the model predicted it to be not spam, it would be a true negative.

## Metrics

To calculate our various metrics, we collect the total number of each of these prediction categories. For example, if we had 1000 items in our dataset, we could have 300 true positives, 100 false positives, 50 false negatives, and 550 true negatives. We can then use these numbers to calculate our metrics.

### Accuracy

$$Accuracy = \frac{True Positives + True Negatives}{Total Predictions}$$

Accuracy is the most common metric used to evaluate a model. It is calculated by dividing the number of correct predictions by the total number of predictions.

For example, if we had 1000 emails in our dataset and our model correctly predicted whether each email was spam or not spam 900 times, our accuracy would be 90% (900/1000).

While this may seem straightforward, accuracy can be misleading when dealing with datasets that only have small amounts of positive cases. For example, lets say we had 10000 patients where 10 were sick. If we built a model that just assumes all patients are healthy, we would correctly predict the healthy patients 9990 times and incorrectly predict the sick patients 10 times which gives us an accuracy of 99.9%. While this is a high accuracy, it is not a good model as it is not predicting any of the sick patients.

### Precision

$$Precision = \frac{True Positives}{True Positives + False Positives}$$

Precision is the number of true positives divided by the number of true positives plus the number of false positives. It is a measure of how many of the positive predictions were actually correct.

A good way to remember precision is that it answers the question "Out of all items the model predicted to be positive, how many actually were positive?".

### Recall/Sensitivity

$$Recall = \frac{True Positives}{True Positives + False Negatives}$$

A good way to remember recall is that it answers the question "Out of all items that are actually positive, how many were correctly predicted to be positive?".

### F1 Score

$$F1 Score = \frac{2 * Precision * Recall}{Precision + Recall}$$

### Specificity

$$Specificity = \frac{True Negatives}{True Negatives + False Positives}$$

A good way to remember specificity is that it answers the question "Out of all items that are actually negative, how many were correctly predicted to be negative?".


NEXT STEPS