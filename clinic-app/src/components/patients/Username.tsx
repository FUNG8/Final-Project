// hahahahaha
import { Box,  Typography } from '@mui/material';
import { jwtDecode } from 'jwt-decode';
import  { useEffect, useState } from 'react';

export function Username() {
  const [name, setName] = useState('');
  useEffect(() => {
    const storedName = localStorage.getItem('clinicToken');
    if (storedName) {
      let decoded: any = jwtDecode(storedName);
      const name = decoded["name"]
      setName(name)
    }
  }, []);

  return (
    <Box textAlign="center">
      <Typography variant="h2" fontWeight="bold" fontFamily="Arial, sans-serif">
        Welcome, {name}!
      </Typography>
    </Box>
  );
}
