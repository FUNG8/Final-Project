import React from 'react';
import logo from './logo.svg';
import style from './App.module.scss';
import TemporaryDrawer from '../../components/doctors/DoctorNavBar';
import { blue } from '@mui/material/colors';
import { ListPatients } from '../../components/doctors/PatientList';
import { Margin } from '@mui/icons-material';

import DoctorLogInForm from '../../components/doctors/DoctorLogInForm';
import { MuiTelInput } from "mui-tel-input";

export default function DoctorLogin() {
 
  return (
    <div className="App">
      <header className="App-header">
        
      </header>
      <DoctorLogInForm />
    </div>
  );
}