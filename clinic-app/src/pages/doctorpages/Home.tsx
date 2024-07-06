// hahahahaha
import './Home.scss';
import TemporaryDrawer from '../../components/doctors/DoctorNavBar';
import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import ConsultTable from '../../components/patients/ConsultingTable'
import styled from 'styled-components';
import { FormControlLabel, Paper, Slide, Switch } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Username } from '../../components/patients/Username';
import ManyContainer from './ManyContainer';
import  HomeTable  from '../../components/patients/HomeTable';

const icon = (
  <Paper sx={{ m: 1, width: 100, height: 100 }} elevation={4}>
    <svg>
      <Box
        component="polygon"
        points="0,100 50,00, 100,100"
        sx={{
          fill: (theme) => theme.palette.common.white,
          stroke: (theme) => theme.palette.divider,
          strokeWidth: 1,
        }}
      />
    </svg>
  </Paper>
);


export default function Home() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    // Handler to call on window resize
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);



  return (
    <>
      <TemporaryDrawer />

      <header
        className="App-header"
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'flex-start',
        }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'flex-start',
            width: '80%',
            margin: 5,
            gap: 2, // Adds space between columns
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: windowWidth > 800 ? '70%' : '100%', // Adjust width based on window width
              gap: 2, // Adds space between Box 1 and Box 2
            }}
          >
            <Box
              sx={{
                border: '2px solid #1976d2',
                borderRadius: 3,
                height: { xs: 150, md: 200 },
                width: '100%',
              }}
            >
              <div className='welcomeContainer'><Username /></div>
              <ManyContainer />
            </Box>
            <Box
              sx={{
                border: '2px solid #1976d2',
                borderRadius: 3,
                height: { xs: 250, md: 500 },
                width: '100%',
              }}
            >
              <div></div>
            </Box>
          </Box>
          {windowWidth > 500 && (
            <Box
              sx={{
                border: '2px solid #1976d2',
                borderRadius: 3,
                height: { xs: 400, md: 720 },
                width: '30%',
              }}
            >
              <div className="waitingList">Consulting...</div>
              <ConsultTable />
              <div className="waitingList">Waiting List...</div>
              <HomeTable/>
            </Box>
          )}
        </Box>
      </header>
    </>
  );
}