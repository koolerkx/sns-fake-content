from model_process.xlnet import XLNetModelWrapper

class DetectionXLNetService():
    def detect(self, text: str):
        # calls the detection services to process the image file and return results
        return XLNetModelWrapper().detect(text)
