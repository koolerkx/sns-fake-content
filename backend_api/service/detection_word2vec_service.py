from utils.str_to_number import str_to_number
from model_process.word2vec_svm import Word2VecSVMModelWrapper
from model_process.word2vec_random_forest import Word2VecRFModelWrapper
from model_process.word2vec_cnn import Word2VecCNNModelWrapper
from model_process.word2vec_rnn import Word2VecRNNModelWrapper

class DetectionWord2VecService():
    AVAILABLE_MODEL_LIST = [
        Word2VecSVMModelWrapper(),
        Word2VecRFModelWrapper(),
        Word2VecCNNModelWrapper(),
        Word2VecRNNModelWrapper(),
    ]

    def detect(self, model_name: str, text: str):
        ret = [e for e in self.AVAILABLE_MODEL_LIST if e.MODEL_NAME.lower() == model_name.lower()]

        if len(ret) == 0:
            raise RuntimeError("Model not found.")

        # calls the detection services to process the image file and return results
        return ret[0].detect(text)
