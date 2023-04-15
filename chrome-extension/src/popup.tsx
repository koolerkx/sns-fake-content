import React, {
  ChangeEvent,
  SyntheticEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import ReactDOM from "react-dom";

type ModelOption = {
  displayName: string;
  value: string;
  default?: boolean;
};

const Popup = () => {
  const [apiEndpoint, setApiEndpoint] = useState(
    "http://localhost:3000/v1/detect/"
  );
  const [modelName, setModelName] = useState("tfidf-svm");

  const options = useMemo(
    (): ModelOption[] => [
      { displayName: "BOW/ SVM", value: "bow-svm" },
      { displayName: "BOW/ Naive Bayes", value: "bow-nb" },
      { displayName: "BOW/ Decision Tree", value: "bow-dt" },
      { displayName: "BOW/ Random Forest", value: "bow-rf" },
      { displayName: "BOW/ Logistic Regression", value: "bow-lr" },
      { displayName: "BOW/ RNN", value: "bow-rnn" },
      { displayName: "TF-IDF/ SVM", value: "tfidf-svm", default: true },
      { displayName: "TF-IDF/ Naive Bayes", value: "tfidf-nb" },
      { displayName: "TF-IDF/ Decision Tree", value: "tfidf-dt" },
      { displayName: "TF-IDF/ Random Forest", value: "tfidf-rf" },
      { displayName: "TF-IDF/ Logistic Regression", value: "tfidf-lr" },
      { displayName: "TF-IDF/ RNN", value: "tfidf-rnn" },
      { displayName: "Word2Vec/ Naive Bayes", value: "word2vec-nb" },
      { displayName: "Word2Vec/ Logistic Regression", value: "word2vec-lr" },
      { displayName: "Word2Vec/ Decision Tree", value: "word2vec-dt" },
      { displayName: "Word2Vec/ Random Forest", value: "word2vec-rf" },
      { displayName: "Word2Vec/ Support Vector Machine", value: "word2vec-svm" },
      { displayName: "Word2Vec/ RNN", value: "word2vec-rnn" },
      { displayName: "FastText/ Naive Bayes", value: "fasttext-nb" },
      { displayName: "FastText/ Logistic Regression", value: "fasttext-lr" },
      { displayName: "FastText/ Decision Tree", value: "fasttext-dt" },
      { displayName: "FastText/ Random Forest", value: "fasttext-rf" },
      { displayName: "FastText/ Support Vector Machine", value: "fasttext-svm" },
      { displayName: "FastText/ RNN", value: "fasttext-rnn" },
      { displayName: "Transformer/ BERT", value: "transformer-bert" },
      { displayName: "Transformer/ XLNet", value: "transformer-xlnet" },
    ],
    []
  );

  useEffect(() => {
    chrome.storage.sync.get(["model-name", "api-endpoint"]).then((e) => {
      const a = e["api-endpoint"];
      const m = e["model-name"];
      if (a) {
        setApiEndpoint(a);
      }
      if (m) {
        setModelName(m);
      }
    });
  }, []);

  const onChangeEndpoint = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setApiEndpoint(e.currentTarget.value);
  }, []);

  const onChangeModel = useCallback(
    (e: SyntheticEvent<HTMLSelectElement, Event>) => {
      setModelName(e.currentTarget.value);
    },
    []
  );

  useEffect(() => {
    chrome.storage.sync.set({ "api-endpoint": apiEndpoint });
  }, [apiEndpoint]);

  useEffect(() => {
    chrome.storage.sync.set({ "model-name": modelName });
  }, [modelName]);

  return (
    <div>
      <div>
        api endpoint:
        <div>
          <input type="text" onChange={onChangeEndpoint} value={apiEndpoint} />
        </div>
      </div>

      <div>
        model name:
        <div>
          <select onChange={onChangeModel} value={modelName}>
            {options.map((it) => (
              <option key={it.value} value={it.value} selected={it.default}>
                {it.displayName}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>,
  document.getElementById("root")
);
