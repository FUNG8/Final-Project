import React from 'react';
import logo from './logo.svg';
import style from './App.module.scss';
import TemporaryDrawer from '../components/navbar';
import { blue } from '@mui/material/colors';
import styled from 'styled-components';
import FixedBottomNavigation from '../components/bottomnavbar';
import { ListPatients } from '../features/patientInfo/patientList';
import { Margin } from '@mui/icons-material';

import DoctorLogInForm from '../components/doctorLogInForm';

export default function doctorLogin() {
  return (
    <div className="App">
      <header className="App-header">
        <p>home</p>
      </header>
      <DoctorLogInForm />
    </div>
  );
}