import matplotlib.pyplot as plt
import numpy as np
import seaborn as sns
from sklearn.metrics import confusion_matrix


def plot_cf(y, pred_y, title):
    conf_matrix = confusion_matrix(y, pred_y)

    fig, ax = plt.subplots()

    sns.heatmap(conf_matrix, annot=True, fmt="g")
    ax.set_xlabel("Predicted labels")
    ax.set_ylabel("True labels")

    ax.xaxis.set_ticklabels(["False", "True"])
    ax.yaxis.set_ticklabels(["False", "True"])

    plt.title(title)

    return plt
