// hahahahaha
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';




function createData(
  first_name: string,
  last_name: string,
) {
  return { first_name, last_name ,status: 'Consulting'};
}

const initialRows = [
    createData('Sunny', 'Bay'),
    createData('Mary', 'Lam'),
  ];

export default function BasicTable() {
    const [rows, setRows] = React.useState(initialRows);

    const handleStatusChange = (index: number) => {
      const newRows = [...rows];
      newRows[index].status = 'Complete';
      setRows(newRows);
    };

  return (
    <TableContainer component={Paper} style={{ maxHeight: 400 }}>
      <Table stickyHeader sx={{ minWidth: 100 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key={row.last_name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              
              <TableCell component="th" scope="row">
                {row.first_name}
              </TableCell>
              <TableCell>{row.last_name}</TableCell>
              <TableCell>
              {row.status === 'Consulting' ? (
                  <button onClick={() => handleStatusChange(index)}>Consulting</button>
                ) : (
                  'Complete'
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
