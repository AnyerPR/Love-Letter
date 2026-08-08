// Ensure window.fetch has both getter and setter in iframe environments to prevent polyfill errors
if (typeof window !== 'undefined' && window.fetch) {
  try {
    let currentFetch = window.fetch;
    Object.defineProperty(window, 'fetch', {
      configurable: true,
      enumerable: true,
      get: () => currentFetch,
      set: (fn) => {
        currentFetch = fn;
      },
    });
  } catch {
    // Already defined or restricted
  }
}

import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
