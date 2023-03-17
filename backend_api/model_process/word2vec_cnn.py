from utils.str_to_number import str_to_number

class Word2VecCNNModelWrapper:
    MODEL_NAME = "CNN"

    def load(self):
        pass

    def detect(self, text: str):
        return str_to_number(text)