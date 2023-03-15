from utils.str_to_number import str_to_number

class BERTModelWrapper:
    MODEL_NAME = "BERT"

    def load(self):
        pass

    def detect(self, text: str):
        return str_to_number(text)