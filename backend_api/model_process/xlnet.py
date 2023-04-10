import os
from transformers import XLNetForSequenceClassification, XLNetTokenizer
from scipy.special import softmax


class XLNetModelWrapper:
    MODEL_NAME = "XLNET"
    checkpoint = os.path.abspath(f"model_file/xlnet/checkpoint")
    tokenizer = os.path.abspath(f"model_file/xlnet/tokenizer")

    def detect(self, text: str):
        model = XLNetForSequenceClassification.from_pretrained(self.checkpoint)
        tokenizer = XLNetTokenizer.from_pretrained("xlnet-base-cased")
        
        model_inputs = tokenizer(
            text,
            padding="max_length",
            truncation=True,
            max_length=128,
            return_tensors="pt",
        )

        output = model(model_inputs["input_ids"])
        return softmax(output["logits"].detach().numpy())[0][1]
