import joblib
import os
import tensorflow as tf
from utils.pre_process import nn_process, WordEmbedding

path = "model_file"


class NaiveBayesModelWrapper:
    MODEL_NAME = "NB"

    def detect(self, text: str):
        classifier = joblib.load(os.path.join(path, "FastText_nb_pipeline.joblib"))
        result = classifier.predict_proba([text])

        return result[0][1]


class LogisticRegressionModelWrapper:
    MODEL_NAME = "LR"

    def detect(self, text: str):
        classifier = joblib.load(os.path.join(path, "FastText_lr_pipeline.joblib"))
        result = classifier.predict_proba([text])

        return result[0][1]


class DecisionTreeModelWrapper:
    MODEL_NAME = "DT"

    def detect(self, text: str):
        classifier = joblib.load(os.path.join(path, "FastText_dt_pipeline.joblib"))
        result = classifier.predict_proba([text])

        return result[0][1]


class RandomForestModelWrapper:
    MODEL_NAME = "RF"

    def detect(self, text: str):
        classifier = joblib.load(os.path.join(path, "FastText_rf_pipeline.joblib"))
        result = classifier.predict_proba([text])

        return result[0][1]


class SupportVectorMachineModelWrapper:
    MODEL_NAME = "SVM"

    def detect(self, text: str):
        classifier = joblib.load(os.path.join(path, "FastText_svm_pipeline.joblib"))
        result = classifier.predict_proba([text])

        return result[0][1]


class RNNModelWrapper:
    MODEL_NAME = "RNN"

    def detect(self, text: str):
        tf_model = tf.keras.models.load_model(
            os.path.join(path, "fasttext_nn_010233_s_model.h5")
        )

        if tf_model is None:
            raise RuntimeError("Tensorflow Model not found.")

        result = tf_model.predict(nn_process([text], WordEmbedding.Word2Vec))

        return result[[0]]
