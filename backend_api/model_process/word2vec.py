import joblib
import os
import tensorflow as tf
from utils.pre_process import nn_process, WordEmbedding

path = "model_file"


class NaiveBayesModelWrapper:
    MODEL_NAME = "NB"

    classifier = joblib.load(os.path.join(path, "word2vec_nb_pipeline.joblib"))

    def detect(self, text: str):
        result = self.classifier.predict_proba([text])

        return result[0][1]


class LogisticRegressionModelWrapper:
    MODEL_NAME = "LR"

    classifier = joblib.load(os.path.join(path, "word2vec_lr_pipeline.joblib"))

    def detect(self, text: str):
        result = self.classifier.predict_proba([text])

        return result[0][1]


class DecisionTreeModelWrapper:
    MODEL_NAME = "DT"

    classifier = joblib.load(os.path.join(path, "word2vec_dt_pipeline.joblib"))

    def detect(self, text: str):
        result = self.classifier.predict_proba([text])

        return result[0][1]


class RandomForestModelWrapper:
    MODEL_NAME = "RF"

    classifier = joblib.load(os.path.join(path, "word2vec_rf_pipeline.joblib"))

    def detect(self, text: str):
        result = self.classifier.predict_proba([text])

        return result[0][1]


class SupportVectorMachineModelWrapper:
    MODEL_NAME = "SVM"

    classifier = joblib.load(os.path.join(path, "word2vec_svm_pipeline.joblib"))

    def detect(self, text: str):
        result = self.classifier.predict_proba([text])

        return result[0][1]


class RNNModelWrapper:
    MODEL_NAME = "RNN"

    tf_model = tf.keras.models.load_model(
        os.path.join(path, "word2vec_014113_s_model.h5")
    )

    def detect(self, text: str):
        if self.tf_model is None:
            raise RuntimeError("Tensorflow Model not found.")

        result = self.tf_model.predict(nn_process([text], WordEmbedding.Word2Vec))

        return result[[0]]
