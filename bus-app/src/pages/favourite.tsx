import React from 'react';
import logo from './logo.svg';
import style from './App.module.scss'
import TemporaryDrawer from '../components/navbar';
import { blue } from '@mui/material/colors';
import styled from 'styled-components';
import FixedBottomNavigation from '../components/bottomnavbar';





export default function favourite() {

  return (
    <div className="App">
      <header className="App-header">
        <TemporaryDrawer/>
        <p>favourite</p>
        <FixedBottomNavigation  />
        
      </header>
    </div>
  );
}
