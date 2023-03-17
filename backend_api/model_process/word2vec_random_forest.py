from utils.str_to_number import str_to_number

class Word2VecRFModelWrapper:
    MODEL_NAME = "RF"

    def load(self):
        pass

    def detect(self, text: str):
        return str_to_number(text)