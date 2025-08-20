import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// import { createRoot } from './react-dom/client'; // Note the '/client'
// import App from './App';

// const root = createRoot(document.getElementById('root'));
// root.render(<App />);