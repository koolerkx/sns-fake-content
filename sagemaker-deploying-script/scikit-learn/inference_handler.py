from sagemaker_inference import content_types, decoder, default_inference_handler, encoder, errors
import joblib
import os
import spacy

class InferenceHandler(default_inference_handler.DefaultInferenceHandler):

    def default_model_fn(self, model_dir, context=None):
        """Loads a model. For PyTorch, a default function to load a model cannot be provided.
        Users should provide customized model_fn() in script.

        Args:
            model_dir: a directory where model is saved.
            context (obj): the request context (default: None).

        Returns: A PyTorch model.
        """
        clf = joblib.load(os.path.join(model_dir, "count_rf_pipeline.joblib"))
        return clf

    def default_input_fn(self, input_data, content_type, context=None):
        return input_data.decode()

    def default_predict_fn(self, data, model, context=None):
        nlp = spacy.load("en_core_web_sm")

        # tokenization
        processed_text = " ".join(
            filter(
                None,
                [
                    token.lemma_.lower() if not token.is_stop and token.is_alpha else ""
                    for token in nlp(data)
                ],
            )
        )

        return [model.predict([processed_text]), model.predict_proba([processed_text])]

    def default_output_fn(self, prediction, accept, context=None):
        return encoder.encode(prediction, accept)
