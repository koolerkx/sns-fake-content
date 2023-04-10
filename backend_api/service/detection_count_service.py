from model_process.count import NaiveBayesModelWrapper, LogisticRegressionModelWrapper, DecisionTreeModelWrapper, RandomForestModelWrapper, SupportVectorMachineModelWrapper

class DetectionCountService():
    AVAILABLE_MODEL_LIST = [
        NaiveBayesModelWrapper(),
        LogisticRegressionModelWrapper(),
        DecisionTreeModelWrapper(),
        RandomForestModelWrapper(),
        SupportVectorMachineModelWrapper()
    ]

    def detect(self, model_name: str, text: str):
        ret = [e for e in self.AVAILABLE_MODEL_LIST if e.MODEL_NAME.lower() == model_name.lower()]

        if len(ret) == 0:
            raise RuntimeError("Model not found.")

        # calls the detection services to process the image file and return results
        return ret[0].detect(text)
