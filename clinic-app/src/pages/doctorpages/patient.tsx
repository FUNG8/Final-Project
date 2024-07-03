import React from 'react';
import logo from './logo.svg';
import style from './App.module.scss'
import TemporaryDrawer from '../../components/doctors/DoctorNavBar';
import { blue } from '@mui/material/colors';
import styled from 'styled-components';
import { ListPatients } from '../../components/doctors/PatientList';
import CreatePatientModal from '../../components/doctors/CreatePatientForm';
 
export default function patient() {

  return (
    <div className="App">
      <CreatePatientModal/>
      
      <ListPatients/>
    </div>
  );
}

