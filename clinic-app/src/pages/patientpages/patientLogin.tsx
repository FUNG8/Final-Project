import React from 'react';
import style from './App.module.scss';
import TemporaryDrawer from '../../components/doctors/DoctorNavBar';
import { ListPatients } from '../../components/doctors/PatientList';
import { Margin } from '@mui/icons-material';

import PatientLoginForm from '../../components/patients/PatientLoginForm';

export default function doctorLogin() {
  return (
    <div className="App">
      <header className="App-header">
        
      </header>
      <PatientLoginForm />
    </div>
  );
}