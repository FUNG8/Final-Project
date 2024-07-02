import './home.scss';
import TemporaryDrawer from '../components/doctorNavBar';
import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import WaitingTable from '../components/homTable'
import ConsultTable from '../components/consultingTable'
import { Username } from '../components/username';
import WindowResize from '../features/resizeWindowSize';

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
      </header>
    </>
  );
}