// index.js or App.js
import React from 'react';
import ReactDOM from 'react-dom'; // Make sure the path is correct
import App from './App';

ReactDOM.render(
  <div className="flex flex-col min-h-screen">
    <App />
  </div>,
  document.getElementById('root')
);
