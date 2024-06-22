import { usePatientsInfo } from './patientAPI';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { SetStateAction, useEffect, useState } from 'react';

export function ListPatients() {
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 20;
  const patients = usePatientsInfo(currentPage, perPage);

  useEffect(() => {
    setCurrentPage(1);
  }, []);

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };
  
  return (
    <div>
      <Box justifyContent="center" mt={4}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.5rem' }}>
            <h2>Patients</h2>
          </div>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Register ID</TableCell>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Gender</TableCell>
                  <TableCell>Blood Type</TableCell>
                  <TableCell>HKID</TableCell>
                  <TableCell>Birth Date</TableCell>
                  <TableCell>Phone Number</TableCell>
                  <TableCell>Diagnosis ID</TableCell>
                  <TableCell>Emergency Name</TableCell>
                  <TableCell>Emergency Contact</TableCell>
                  <TableCell>Updated At</TableCell>
                  <TableCell>Created At</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {patients && patients.map((patient) => (
                  <TableRow key={patient.id}>
                    <TableCell>{patient.id}</TableCell>
                    <TableCell>{patient.register_id}</TableCell>
                    <TableCell>{patient.firstName}</TableCell>
                    <TableCell>{patient.lastName}</TableCell>
                    <TableCell>{patient.gender}</TableCell>
                    <TableCell>{patient.blood}</TableCell>
                    <TableCell>{patient.hkid}</TableCell>
                    <TableCell>{patient.birth_date}</TableCell>
                    <TableCell>{patient.phone_number}</TableCell>
                    <TableCell>{patient.diagnosis_id}</TableCell>
                    <TableCell>{patient.emergency_name}</TableCell>
                    <TableCell>{patient.emergency_contact}</TableCell>
                    <TableCell>{patient.updated_at}</TableCell>
                    <TableCell>{patient.created_at}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Box>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
        <Pagination count={10} onChange={handlePageChange} />
      </div>
    </div>
  );
}