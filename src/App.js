import React from 'react';
import Routes from './components';
import Header from './components/Header';
import './App.css';

function App() {
  return (
    // Add another components like - Header and Footer etc. and alongwith that other functionalities
    <div>
      <Header />
      <Routes />
    </div>
  );
}

export default App;
