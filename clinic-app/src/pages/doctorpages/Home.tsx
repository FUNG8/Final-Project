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
import HomeTable from '../../components/patients/HomeTable';
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts';
import MedicineConsumption from '../../components/doctors/MedicineConsumption';
import PatientNumber from '../../components/doctors/PatientNumber';
import { Margin } from '@mui/icons-material';

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

  // const Item = styled(Paper)(({ theme }) => {
  //   console.log(theme)
  //  return  {
  //   // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  //   backgroundColor: "#1A2027",
  //   ...theme.typography.body2,
  //   padding: theme.spacing(1),
  //   textAlign: 'center',
  //   color: theme.palette.text.secondary,
  //   margin: 8
  // }});



  return (

    <div className="App">
      <Grid sx={{ paddingLeft: 20 }}>
        <Username />
      </Grid>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>

          <Grid item xs={8}>

            <Grid sx={{ display: "flex" }}>
              <Paper>
                <p>Number of Patients</p>
                <PatientNumber />
              </Paper>
              <Paper>
                <p>Medicine Consumption</p>
                <MedicineConsumption />
              </Paper>
            </Grid>

          </Grid>
          <Grid item xs={4}>
            <Paper> <div className="waitingList">Consulting</div>
              <ConsultTable />
              <div className="waitingList">Waiting List</div>
              <HomeTable />
            </Paper>
          </Grid>

        </Grid>
      </Box>

    </div>

  );
}