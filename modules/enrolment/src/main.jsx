import { StrictMode } from 'react'; // Helps identify issues in development
import { createRoot } from 'react-dom/client'; // React 18 root API
import './index.css'; // Tailwind + global styles
import App from './App.jsx'; // Main App component

// Mount your React app into the #root div in index.html
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
