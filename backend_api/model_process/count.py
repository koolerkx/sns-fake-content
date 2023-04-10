import joblib
import os

path = 'model_file'

class NaiveBayesModelWrapper():
    MODEL_NAME = "NB"
    
    classifier = joblib.load(os.path.join(path, "count_nb_pipeline.joblib"))

    def detect(self, text: str):
        result = self.classifier.predict_proba([text])
        
        return result[0][1]
    
class LogisticRegressionModelWrapper():
    MODEL_NAME = "LR"

    classifier = joblib.load(os.path.join(path, "count_lr_pipeline.joblib"))

    def detect(self, text: str):
        result = self.classifier.predict_proba([text])
        
        return result[0][1]

class DecisionTreeModelWrapper():
    MODEL_NAME = "DT"

    classifier = joblib.load(os.path.join(path, "count_dt_pipeline.joblib"))

    def detect(self, text: str):
        result = self.classifier.predict_proba([text])
        
        return result[0][1]

class RandomForestModelWrapper():
    MODEL_NAME = "RF"

    classifier = joblib.load(os.path.join(path, "count_rf_pipeline.joblib"))

    def detect(self, text: str):
        result = self.classifier.predict_proba([text])
        
        return result[0][1]

class SupportVectorMachineModelWrapper():
    MODEL_NAME = "SVM"

    classifier = joblib.load(os.path.join(path, "count_svm_pipeline.joblib"))

    def detect(self, text: str):
        result = self.classifier.predict_proba([text])
        
        return result[0][1]