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

If the cost of a false positive is high, then we want to have a high precision. For example, let's say we are creating tests for detecting cancer. We might have an initial screening test for those who might have cancer. We then have a second test that detects cancer and, if it returns a positive result, we recommend invasive procedures such as chemotherapy or surgery. In this second test, we want to have a high precision as we don't want to go down the path of these invasive procedures to patients who don't have cancer. 

### Recall/Sensitivity

$$Recall = \frac{True Positives}{True Positives + False Negatives}$$

Recall is the number of true positives divided by the number of true positives plus the number of false negatives. It is a measure of how many of the actual positive cases were correctly predicted.

A good way to remember recall is that it answers the question "Out of all items that are actually positive, how many were correctly predicted to be positive?".

### F1 Score

$$F1 Score = \frac{2 * Precision * Recall}{Precision + Recall}$$

We often want a single metric that can tell us how well our model is performing while also taking into account both precision and recall. This is what F1 score (and the F-beta score it is based on) does.

In math, there are different types of mean. If we used the arithmetic mean -- what most people think of when we say "mean" or "average" -- then we would put equal weight on precision and recall. If we had two models, one with 100% precision with 1% recall and one with 45% precision and 43% recall, the first model would have an arithmetic mean of 50.5% while the second model would have an arithmetic mean of 44%. However, we would probably want to use the second model as it has a better balance of precision and recall.

Instead, we use something called the harmonic mean. This works similar to the arithmetic mean except that it leans more towards the lower number, i.e. a much worse value will pull down the second value more. So, the same two models above would instead have a harmonic mean of 2% and 44% respectively. This means that the second model is better than the first model.

### Specificity

$$Specificity = \frac{True Negatives}{True Negatives + False Positives}$$

Specificity is more common in medical models. It is the number of true negatives divided by the number of true negatives plus the number of false positives. It is a measure of how many of the negative predictions were actually correct.

A good way to remember specificity is that it answers the question "Out of all items that are actually negative, how many were correctly predicted to be negative?".

## Next Steps

