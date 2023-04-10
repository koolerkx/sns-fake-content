import json
import os
from enum import Enum

import numpy as np
from keras.utils import pad_sequences


class WordEmbedding(Enum):
    Word2Vec = "word2vec"
    FastText = "fasttext"


def nn_process(texts, type: WordEmbedding):
    PADDING_LENGTH = 128

    embedding_file = open(os.path.abspath(f"model_file/{type.value}.json"), "r")
    embedding_dict = json.loads(embedding_file.read())
    embedding_file.close()

    supported_words = set(embedding_dict.keys())

    text_index = [
        [embedding_dict[word] if word in supported_words else 0 for word in sentence]
        for sentence in texts
    ]
    text_index = pad_sequences(text_index, maxlen=PADDING_LENGTH)
    return np.array(text_index)
