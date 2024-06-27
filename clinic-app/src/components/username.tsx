
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';

export function Username() {
  const [name, setName] = useState('');
  useEffect(() => {
    const storedName = localStorage.getItem('clinicToken');
    if (storedName) {
      let decoded :any= jwtDecode(storedName);
      const username =  decoded["username"]
      setName(username)
    }
  }, []);

  return (
    <div>
      <h2>Welcome, {name}!</h2>
    </div>
  );
}
