from sagemaker_inference import content_types, decoder, default_inference_handler, encoder, errors
import os
import torch
import json
from transformers import AutoTokenizer, AutoModelForSequenceClassification

class InferenceHandler(default_inference_handler.DefaultInferenceHandler):
    def default_model_fn(self, model_dir):
        tokenizer = AutoTokenizer.from_pretrained(os.path.join(model_dir, "tokenizer"))
        model = AutoModelForSequenceClassification.from_pretrained(os.path.join(model_dir, "checkpoint"))
        return (model, tokenizer)

    def default_input_fn(self, input_data, content_type):
        if content_type == content_types.JSON:
            input_data = json.loads(input_data)
            return input_data.get("text", "")
        return input_data.decode('utf-8')

    def default_predict_fn(self, data, model):
        text = data.strip()
        inputs = model[1](text, return_tensors='pt')
        outputs = model[0](**inputs)
        logits = outputs.logits.detach().numpy()[0]
        return logits

    def default_output_fn(self, prediction, accept):
        return encoder.encode(prediction, accept)
