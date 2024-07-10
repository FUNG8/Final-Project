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
import { usePatientWaitingList } from '../../api/patientAPI';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import { Button } from '@mui/material';

JavascriptTimeAgo.addDefaultLocale(en);

// interface PatientWaitingList {
//   status: string;
//   result?: {
//     waitingList: {
//       firstName: string,
//       lastName: string,
//       timestamp: string,
//     },
//     nextPatient: {
//       id: number,
//       firstName: string,
//       lastName: string,
//       status: string
//     }
//   }[];
// }

interface PatientWaitingTime {
  status: string;
  result?: {
    timestamp: string;
  }[];
}

interface PatientWaitingList {
  status: string;
  result?: {
    time: string | number | Date;
    firstName: string;
    lastName: string;
  }[];
}



export default function WaitingList() {
  const patientWaitingList: PatientWaitingList = usePatientWaitingList();
  console.log("this is patient waiting list", (patientWaitingList as any));


  const [waitingList, setWaitingList] = React.useState([
    {
      firstName: 'Hayley',
      lastName: 'Reichel-Watsica',
      timestamp: new Date("2024-07-09T07:25:27.706Z"),
      ticket_number: 1,
      id: 1,
      queue_position: 3
    },
    {
      firstName: 'Tre',
      lastName: 'Stamm',
      timestamp: new Date("2024-07-09T07:25:27.706Z"),
      ticket_number: 2,
      id: 2,
      queue_position: 2
    },
    {
      firstName: 'test1',
      lastName: 'test1',
      timestamp: new Date("2024-07-09T07:25:27.706Z"),
      ticket_number: 3,
      id: 3,
      queue_position: 1
    }
  ]);

  const handleDragEnd = (result: DropResult, provided: any) => {
    if (!result.destination) {
      return;
    }
    console.log("check result after drag end", result.source, result.destination)
    // const updatedPatientList = patientWaitingList.result
    //   ? Array.from(patientWaitingList.result)
    //   : [];

    // if (updatedPatientList.length > 0) {
    //   const [removed] = updatedPatientList.splice(result.source.index, 1);
    //   updatedPatientList.splice(result.destination.index, 0, removed);

    //   // setPatientWaitingList({
    //   //   result: updatedPatientList,
    //   // });
    // }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="patientList" type="group" >
        {(provided: any) => (
          <div ref={provided.innerRef} {...provided.droppableProps} >
            <TableContainer component={Paper} style={{ maxHeight: 600 }}>
              <Table stickyHeader sx={{ minWidth: 100 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>First Name</TableCell>
                    <TableCell>Last Name</TableCell>
                    <TableCell>Check In Time</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>

                  {/* {waitingList.map((row: any) => ( */}
                  {patientWaitingList.result?.map((row: any) => (
                    row.status === "waiting" ? (
                      <Draggable key={row.id} draggableId={`patient-${row.id}`} index={row.queue_position}>
                        {(provided: any) => (
                          <TableRow
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                            sx={{ '&:last-child td, &:last-child th': { border: 0, height: 20 } }}
                          >
                            <TableCell component="th" scope="row">
                              {row.firstName}
                            </TableCell>
                            <TableCell>{row.lastName}</TableCell>
                            <TableCell>
                              <TimeAgo date={row.timestamp} />
                            </TableCell>
                          </TableRow>
                        )}
                      </Draggable>
                    ) : null
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}


