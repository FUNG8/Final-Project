// hahahahaha
import { Box, Paper, styled, Typography } from '@mui/material';
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';

export function Username() {
  const [name, setName] = useState('');
  useEffect(() => {
    const storedName = localStorage.getItem('clinicToken');
    if (storedName) {
      let decoded: any = jwtDecode(storedName);
      const username = decoded["username"]
      setName(username)
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
