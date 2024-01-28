import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.tsx';
import reportWebVitals from './reportWebVitals';
import { store } from './redux/store.ts';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

const rootElement: HTMLElement | null = document.getElementById('root');

if (rootElement) {
  ReactDOM.render(
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>,
    rootElement
  );
} else {
  console.error("Element with id 'root' not found in the document.");
}

reportWebVitals();
