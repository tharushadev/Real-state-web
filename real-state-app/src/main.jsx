/**
 * Main entry point for the PropertyFinder application
 * 
 * This file initializes React and renders the App component
 * into the DOM root element.
 */

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// Get the root element
const container = document.getElementById('root');

// Create a root and render the app
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
