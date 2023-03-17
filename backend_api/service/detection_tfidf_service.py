from utils.str_to_number import str_to_number
from model_process.tf_idf_svm import TFIDFSVMModelWrapper
from model_process.tf_idf_naive_bayes import TFIDFNBModelWrapper
from model_process.tf_idf_random_forest import TFIDFRFModelWrapper
from model_process.tf_idf_cnn import TFIDFCNNModelWrapper
from model_process.tf_idf_rnn import TFIDFRNNModelWrapper

class DetectionTFIDFService():
    AVAILABLE_MODEL_LIST = [
        TFIDFSVMModelWrapper(),
        TFIDFNBModelWrapper(),
        TFIDFRFModelWrapper(),
        TFIDFCNNModelWrapper(),
        TFIDFRNNModelWrapper(),
    ]

    def detect(self, model_name: str, text: str):
        ret = [e for e in self.AVAILABLE_MODEL_LIST if e.MODEL_NAME.lower() == model_name.lower()]

        if len(ret) == 0:
            raise RuntimeError("Model not found.")

        # calls the detection services to process the image file and return results
        return ret[0].detect(text)
