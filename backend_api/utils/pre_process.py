import json
import os
from enum import Enum

import numpy as np
import spacy
from keras.utils import pad_sequences

nlp = spacy.load("en_core_web_sm")


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

def get_tokenized_text(doc) -> "list[str]":
    return list(
        filter(
            lambda x: str(x) != "",
            [
                token.lemma_.lower() if not token.is_stop and token.is_alpha else ""
                for token in doc
            ],
        )
    )

def text_cleaning(text: str):
    return " ".join(get_tokenized_text(nlp(text)))