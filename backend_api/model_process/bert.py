import os

from transformers import BertForSequenceClassification, BertTokenizer
from scipy.special import softmax


class BERTModelWrapper:
    MODEL_NAME = "BERT"
    checkpoint = os.path.abspath(f"model_file/bert/checkpoint")
    tokenizer = os.path.abspath(f"model_file/bert/tokenizer")

    def detect(self, text: str):
        model = BertForSequenceClassification.from_pretrained(self.checkpoint)
        tokenizer = BertTokenizer.from_pretrained(self.tokenizer)

        model_inputs = tokenizer(
            text,
            padding="max_length",
            truncation=True,
            max_length=128,
            return_tensors="pt",
        )

        output = model(model_inputs["input_ids"])
        return softmax(output["logits"].detach().numpy())[0][1]
