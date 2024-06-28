import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Button } from '@mui/material';
import { SetStateAction, useEffect, useState } from 'react';
import { useShowPatientInfo } from './showPatientInfoAPI';



export function ShowPatientInfo() {
    let [patientId, setPatientId] = useState(1)
    const patients = useShowPatientInfo(patientId);


  return (
    <div>
      <Box justifyContent="center" mt={4}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.5rem' }}>
            <h2>Patient Details</h2>
          </div>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Gender</TableCell>
                  <TableCell>Blood Type</TableCell>
                  <TableCell>HKID</TableCell>
                  <TableCell>Birth Date</TableCell>
                  <TableCell>Phone Number</TableCell>
                  <TableCell>Emergency Name</TableCell>
                  <TableCell>Emergency Contact</TableCell>
                  <TableCell>Updated At</TableCell>
                  <TableCell>Created At</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Box>
    </div>
  );
}
