# pip install scikit-learn
# pip install gensim
# pip install -U pip setuptools wheel
# pip install -U spacy
# python -m spacy download en_core_web_sm

import os
import spacy
from joblib import load

MODEL_PATH = "output/count_rf_pipeline.joblib"
PREDICT_TEXT = "Singapore Airlines cargo flight makes emergency landing in Hong Kong after plane’s fire alarm system triggered"


# Load Model
model = load(os.path.abspath(MODEL_PATH))

# Preprocess input
nlp = spacy.load("en_core_web_sm")

# Tokenization
processed_text = " ".join(
    filter(
        None,
        [
            token.lemma_.lower() if not token.is_stop and token.is_alpha else ""
            for token in nlp(PREDICT_TEXT)
        ],
    )
)

result = model.predict([processed_text])
result_prob = model.predict_proba([processed_text])

print(f"Predicting: {PREDICT_TEXT}")
print(f"Result: {result} {result_prob}")
