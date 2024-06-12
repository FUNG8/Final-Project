import React from 'react';
import logo from './logo.svg';
import style from './App.module.scss'
import TemporaryDrawer from './components/navbar';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <TemporaryDrawer/>
        
      </header>
    </div>
  );
}

export default App;
