import React from 'react';
import ReactDOM from 'react-dom';

import { instance } from './state';
import App from './App';
import GlobalContext from './contexts'
import './globals.css';

ReactDOM.render(
  <React.StrictMode>
    <GlobalContext.Provider value={instance}>
      <App />
    </GlobalContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
