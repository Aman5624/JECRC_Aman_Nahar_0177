import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

//simple React component
/*function App() {
  return (
    <div className="App">
      <h1>Welcome to My React App!</h1>
      <p>This is rendered by React, not vanilla JavaScript.</p>
    </div>
  );
}*/


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);


