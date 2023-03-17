from utils.str_to_number import str_to_number

class TFIDFRNNModelWrapper:
    MODEL_NAME = "RNN"

    def load(self):
        pass

    def detect(self, text: str):
        return str_to_number(text)