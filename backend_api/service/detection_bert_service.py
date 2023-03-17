from model_process.bert import BERTModelWrapper

class DetectionBERTService():
    def detect(self, text: str):
        # calls the detection services to process the image file and return results
        return BERTModelWrapper().detect(text)
