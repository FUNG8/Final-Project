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

JavascriptTimeAgo.addDefaultLocale(en);

interface PatientWaitingList {
  status: string;
  result?: {
    time: string | number | Date;
    firstName: string;
    lastName: string;
  }[];
}


export default function HomeTable() {
  const patientWaitingList: PatientWaitingList = usePatientWaitingList();
  console.log(patientWaitingList.result?.[0]?.firstName);

  const handleDragEnd = (result: DropResult, provided: any) => {
    if (!result.destination) {
      return;
    }

    const updatedPatientList = Array.from(patientWaitingList.result || []);
    const [removed] = updatedPatientList.splice(result.source.index, 1);
    updatedPatientList.splice(result.destination.index, 0, removed);

    // setPatientWaitingList({
    //   result: updatedPatientList,
    // });
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="patientList" type="group" >
        {(provided: any) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
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
                  {patientWaitingList.result?.map((row: any, index: number) => (
                    <Draggable key={index} draggableId={`patient-${index}`} index={index} >
                      {(provided: any) => (
                        <TableRow
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell component="th" scope="row">
                            {row.firstName}
                          </TableCell>
                          <TableCell>{row.lastName}</TableCell>
                          <TableCell>
                            <TimeAgo date={new Date()} />
                          </TableCell>
                        </TableRow>
                      )}
                    </Draggable>
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


