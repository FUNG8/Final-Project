import React from 'react';
import logo from './logo.svg';
import style from './App.module.scss'
import TemporaryDrawer from '../components/doctorNavBar';
import { blue } from '@mui/material/colors';
import styled from 'styled-components';
import FixedBottomNavigation from '../components/patients/bottomnavbar';
import { ListPatients } from '../features/patientInfo/patientList';
import CreatePatientModal from '../components/createPatientForm';
 
export default function patient() {

  return (
    <div className="App">
      <CreatePatientModal/>
      
      <ListPatients/>
    </div>
  );
}

