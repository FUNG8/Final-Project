import React from 'react';
import style from './App.module.scss';
import TemporaryDrawer from '../components/doctorNavBar';
import { ListPatients } from '../components/patientList';
import { Margin } from '@mui/icons-material';

import PatientLoginForm from '../components/patientLoginForm';

export default function doctorLogin() {
  return (
    <div className="App">
      <header className="App-header">
        
      </header>
      <PatientLoginForm />
    </div>
  );
}