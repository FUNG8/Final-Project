import React from 'react';
import logo from './logo.svg';
import style from './App.module.scss';
import TemporaryDrawer from '../components/doctorNavBar';
import { blue } from '@mui/material/colors';
import { ListPatients } from '../components/patientList';
import { Margin } from '@mui/icons-material';

import DoctorLogInForm from '../components/doctorLogInForm';

export default function doctorLogin() {
  return (
    <div className="App">
      <header className="App-header">
        
      </header>
      <DoctorLogInForm />
    </div>
  );
}