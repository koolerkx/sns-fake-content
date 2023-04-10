from sagemaker_inference import content_types, decoder, default_inference_handler, encoder, errors
import os
import numpy as np
import tensorflow as tf
from keras.utils import pad_sequences
import json

class InferenceHandler(default_inference_handler.DefaultInferenceHandler):

    def default_model_fn(self, model_dir, context=None):
        tf_model = tf.keras.models.load_model(os.path.join(model_dir, "model.h5"))
        indices = json.load(open(os.path.join(model_dir, "embedding.json")))
        return {
            "indices": indices,
            "predictor": tf_model
        }

    def default_input_fn(self, input_data, content_type, context=None):
        return input_data.decode()

    def default_predict_fn(self, data, model, context=None):
        PADDING_LENGTH = 128
        supported_words = set(model["indices"].keys())

        text_index = [[model["indices"][word] if word in supported_words else 0 for word in data.split(" ")]]
        text_index = pad_sequences(text_index, maxlen=PADDING_LENGTH)
        vectorized = np.array(text_index)

        # tokenization
        return model["predictor"].predict(vectorized)

    def default_output_fn(self, prediction, accept, context=None):
        return encoder.encode(prediction, accept)
