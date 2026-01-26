import React from 'react';
import ReactDOM from 'react-dom/client';
import Index from './Index.tsx';  // Your main app component
import './index.css';  // Global styles

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Index />
  </React.StrictMode>
);
