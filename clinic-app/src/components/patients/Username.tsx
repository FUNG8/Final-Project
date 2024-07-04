
import { Paper, styled } from '@mui/material';
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';

export function Username() {
  const [name, setName] = useState('');
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    flexGrow: 1,
  }));

  useEffect(() => {
    const storedName = localStorage.getItem('clinicToken');
    if (storedName) {
      let decoded :any= jwtDecode(storedName);
      const username =  decoded["username"]
      setName(username)
    }
  }, []);

  return (
    <Item>
      <h2>Welcome, {name}!</h2>
    </Item>
  );
}
