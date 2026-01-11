import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Must match the ID defined in bsmart-card-designer.php
const rootElement = document.getElementById('bsmart-card-root');

if (!rootElement) {
  console.error("Critical Error: Could not find container #bsmart-card-root to mount the React App.");
} else {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}