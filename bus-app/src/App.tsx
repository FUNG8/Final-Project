import React from 'react';
import logo from './logo.svg';
import style from './App.module.scss'
import TemporaryDrawer from './components/navbar';
import { blue } from '@mui/material/colors';
import styled from 'styled-components';
import FixedBottomNavigation from './components/bottomnavbar';
import {BrowserRouter, Routes,  Route} from 'react-router-dom'
import Home from './pages/home';


function App() {



  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route index element ={<Home/>}/>
        <Route path = "/home" element ={<Home/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
