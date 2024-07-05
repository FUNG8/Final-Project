// hahahahaha
import './home.scss';
import TemporaryDrawer from '../../components/doctors/DoctorNavBar';
import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import WaitingTable from '../../components/patients/HomeTable'
import ConsultTable from '../../components/patients/ConsultingTable'
import styled from 'styled-components';
import { FormControlLabel, Paper, Slide, Switch } from '@mui/material';
import Grid from '@mui/material/Grid';

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

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    flexGrow: 1,
  }));

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

  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  return (
    <>
      <TemporaryDrawer />

      {/* <header
        className="App-header"
        style={{
          display: 'flex',
          justifyContent: 'space-around',
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
              <div className='manyContainer'>
                <div className='smallContainer'>Total Patient
                  <div className='inSmContainer'>22</div>
                </div>
                <div className='smallContainer'>Pending
                  <div className='inSmContainer'>21</div>
                </div>
                <div className='smallContainer'>Completed
                  <div className='inSmContainer'>6</div>
                </div>
              </div>
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
              <WaitingTable />
            </Box>
          )}
        </Box>
      </header> */}
      <body>
        {/* <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Item>xs=8</Item>
            </Grid>
            <Grid item xs={4}>
              <Item>xs=4</Item>
            </Grid>
            <Grid item xs={4}>
              <Item>xs=4</Item>
            </Grid>
            <Grid item xs={8}>
              <Item>xs=8</Item>
            </Grid>
          </Grid>
        </Box> */}
        <Box
        sx={{
          height: 180,
          width: 130,
          position: 'relative',
          zIndex: 1,
        }}
      >
        <FormControlLabel
          control={<Switch checked={checked} onChange={handleChange} />}
          label="Show"
        />
        <Slide direction="up" in={checked} mountOnEnter unmountOnExit>
          {icon}
        </Slide>
      </Box>
      </body>

    </>
  );
}