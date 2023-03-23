import React, { ChangeEvent, SyntheticEvent, useCallback, useEffect, useMemo, useState } from "react";
import ReactDOM from "react-dom";

const Popup = () => {

  const [ apiEndpoint, setApiEndpoint ] = useState('http://localhost:3000/v1/detect/');
  const [ modelName, setModelName ] = useState('tfidf-svm');

  const options = useMemo(() => [
    "tfidf-svm",
    "tfidf-nb",
    "tfidf-rf",
    "tfidf-cnn",
    "tfidf-rnn",
    "word2vec-svm",
    "word2vec-rf",
    "word2vec-cnn",
    "word2vec-rnn",
    "bert",
    "xlnet",
  ], []);

  useEffect(() => {
    chrome.storage.sync.get(['model-name', 'api-endpoint'])
      .then(e => {
        const a = e['api-endpoint'];
        const m = e['model-name'];
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

  const onChangeModel = useCallback((e: SyntheticEvent<HTMLSelectElement, Event>) => {
    setModelName(e.currentTarget.value);
  }, []);

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
            {options.map((e) => (
              <option key={e} value={e}>{e}</option>
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
