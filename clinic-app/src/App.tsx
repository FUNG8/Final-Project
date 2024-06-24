import React from 'react';
import logo from './logo.svg';
import style from './App.module.scss'
import TemporaryDrawer from './components/navbar';
import { blue } from '@mui/material/colors';
import styled from 'styled-components';
import FixedBottomNavigation from './components/bottomnavbar';
import {BrowserRouter, Routes,  Route} from 'react-router-dom'
import Home from './doctorpages/home';
import DoctorLogin from './doctorpages/doctorLogin';
import PatientHome from './patientpages/patientHomePage';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import Patient from './doctorpages/patient';
import Medicine from './doctorpages/medicine';



function App() {

  return (
    <div className="App">
      <TemporaryDrawer/> 
      
      <Routes>
        <Route index  element ={<Home/>}/>
        <Route path = "/doctorlogin" element ={<DoctorLogin/>}/>
        <Route path = "/home" element ={<Home/>}/>
        <Route path = "/patient" element ={<Patient/>}/>
        <Route path = "/medicine" element ={<Medicine/>}/>
        <Route path = "/patientHome" element ={<PatientHome />}/>

      </Routes>
      
     
    </div>
  );
}

export default App;
