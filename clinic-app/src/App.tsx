import React from 'react';
import logo from './logo.svg';
import style from './App.module.scss'
import TemporaryDrawer from './components/navbar';
import { blue } from '@mui/material/colors';
import styled from 'styled-components';
import FixedBottomNavigation from './components/bottomnavbar';
import {BrowserRouter, Routes,  Route} from 'react-router-dom'
import Home from './pages/home';
import DoctorLogin from './pages/doctorLogin';
import History from './pages/history';
import  Favourite  from './pages/favourite';
import PatientHome from './pages/patientHomePage';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'



function App() {

  return (
    <div className="App">
      <TemporaryDrawer/> 
      
      <Routes>
        <Route index  element ={<Home/>}/>
        <Route path = "/doctorlogin" element ={<DoctorLogin/>}/>
        <Route path = "/home" element ={<Home/>}/>
        <Route path = "/history" element ={<History/>}/>
        <Route path = "/favourite" element ={<Favourite/>}/>
        <Route path = "/patientHome" element ={<PatientHome />}/>

      </Routes>
      
     
    </div>
  );
}

export default App;
