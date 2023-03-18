import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.metrics import (
    PrecisionRecallDisplay,
    RocCurveDisplay,
    confusion_matrix,
)


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


def plot_eval(X_test, y_test, y_pred, classifier, title):
    fig, (ax1, ax2, ax3) = plt.subplots(1, 3, figsize=(12, 4))

    # Ax1
    ax1.plot([0, 1], [0, 1], "k--", label="chance level (AUC = 0.5)")
    rfc_disp = RocCurveDisplay.from_estimator(
        classifier, X_test, y_test, ax=ax1, alpha=0.8
    )
    ax1.set_title("ROC Curve")

    # Ax2
    rfc_disp = PrecisionRecallDisplay.from_estimator(
        classifier, X_test, y_test, ax=ax2, alpha=0.8
    )
    ax2.set_title("PR Curve")

    # Ax3
    conf_matrix = confusion_matrix(y_test, y_pred)

    sns.heatmap(conf_matrix, annot=True, fmt="g")
    ax3.set_xlabel("Predicted labels")
    ax3.set_ylabel("True labels")

    ax3.xaxis.set_ticklabels(["False", "True"])
    ax3.yaxis.set_ticklabels(["False", "True"])
    ax3.set_title("Confusion Matrix")

    fig.suptitle(title)

    fig.show()

    return fig
