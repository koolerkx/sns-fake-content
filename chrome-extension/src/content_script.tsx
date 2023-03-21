import React from 'react';
import ReactDOM from 'react-dom';
import App from './inject-scripts/App';

// append to body
const el = document.createElement("div");
el.id = "koolerkx-fake-news-detector"
document.body.appendChild(el);

// render portal
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById(el.id)
);