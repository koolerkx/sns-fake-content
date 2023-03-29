import spacy
import pandas as pd
from tqdm import tqdm

# spacy.prefer_gpu()
nlp = spacy.load("en_core_web_sm")

def text_preprocess(raw_texts: pd.Series) -> "list[list[str]]":
    # Tokenization
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

    texts: "list[list[str]]" = []
    for doc in tqdm(nlp.pipe(raw_texts, n_process=-1), total=raw_texts.shape[0]):
        texts.append(get_tokenized_text(doc))

    return texts
