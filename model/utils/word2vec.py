import numpy as np
import skimage.measure

from sklearn.base import BaseEstimator, TransformerMixin


class GensimVectorizer(BaseEstimator, TransformerMixin):
    def __init__(self, model):
        super().__init__()
        self.model = model

    def fit(self, X, y=None):
        return self

    def transform(self, texts):
        words = set(self.model.wv.index_to_key)

        vect = [np.array([self.model.wv[i] for i in ls if i in words]) for ls in texts]

        vect_avg = []
        for v in vect:
            if v.size:
                vect_avg.append(v.mean(axis=0))
            else:
                vect_avg.append(np.zeros(self.model.wv.vector_size, dtype=np.float32))

        return vect_avg
