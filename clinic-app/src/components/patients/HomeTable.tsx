// hahahahaha
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TimeAgo from 'react-time-ago';
import en from 'javascript-time-ago/locale/en'
import JavascriptTimeAgo from 'javascript-time-ago';
import PublishIcon from '@mui/icons-material/Publish';

JavascriptTimeAgo.addDefaultLocale(en);

function createData(
  first_name: string,
  last_name: string,
  time: string
) {
  return { first_name, last_name, time };
}

const initialRows = [
    createData('Sunny', 'Bay', '2023-06-24T15:00:57Z'),
    createData('John', 'Doe', '2023-06-24T15:00:57Z'),
    createData('Jane', 'Smith', '2023-06-24T15:00:57Z'),
    createData('Alice', 'Johnson', '2023-06-24T15:00:57Z'),
    createData('Bob', 'Brown', '2023-06-24T15:00:57Z'),
    createData('Charlie', 'Davis', '2023-06-24T15:00:57Z'),
    createData('David', 'Evans', '2023-06-24T15:00:57Z'),
    createData('Eve', 'Foster', '2023-06-24T15:00:57Z'),
    createData('Frank', 'Green', '2023-06-24T15:00:57Z'),
    createData('Grace', 'Harris', '2023-06-24T15:00:57Z'),
    createData('Hank', 'Ives', '2023-06-24T15:00:57Z'),
    createData('Ivy', 'Jones', '2023-06-24T15:00:57Z'),
    createData('Jack', 'King', '2023-06-24T15:00:57Z'),
    createData('Karen', 'Lee', '2023-06-24T15:00:57Z'),
    createData('Leo', 'Miller', '2023-06-24T15:00:57Z'),
  ];



export default function BasicTable() {
  const [rows, setRows] = React.useState(initialRows);
  const handleIconClick = (index: number) => {
    const selectedRow = rows[index];
    const newRows = [selectedRow, ...rows.filter((_, i) => i !== index)];
    setRows(newRows);
  };


  return (
    <TableContainer component={Paper} style={{ maxHeight: 450 }}>
      <Table stickyHeader sx={{ minWidth: 100 }} aria-label="simple table">
        <TableHead>
          <TableRow>
              
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Check In Time</TableCell>
            <TableCell>Consult</TableCell>
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
                <TimeAgo date={new Date(row.time)} />
              </TableCell>
              <TableCell>
              {index === 0 ? (
                  'Next Consult'
                ) : (
                  <PublishIcon onClick={() => handleIconClick(index)} style={{ cursor: 'pointer' }} />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}