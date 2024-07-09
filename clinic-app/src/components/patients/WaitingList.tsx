import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TimeAgo from "react-time-ago";
import en from "javascript-time-ago/locale/en";
import JavascriptTimeAgo from "javascript-time-ago";
import { usePatientWaitingList } from "../../api/patientAPI";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface PatientWaitingList {
  status: string;
  result?: {
    timestamp: Date;
    firstName: string;
    lastName: string;
    ticket_id: number;
  }[];
}

JavascriptTimeAgo.addDefaultLocale(en);

export default function WaitingList() {
  // const [newList, setNewList] = React.useState<any>([]);

  const queryClient = useQueryClient();

  const rearrangeMutation = useMutation({
    mutationFn: (updatedPositions: any) =>
      fetch(`${process.env.REACT_APP_API_ENDPOINT}/homePatient/patientQueue`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tickets: updatedPositions }),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["PatientWaitingList"] });
    },
  });

  const waitingList: PatientWaitingList = usePatientWaitingList();
  console.log(waitingList);
  const handleDragEnd = async (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const updatedList = Array.from(waitingList.result!);
    
    const [removed] = updatedList.splice(result.source.index, 1);
    console.log("check removed", removed, result.source.index);
    console.log(result.destination.index);
    updatedList.splice(result.destination.index, 0, removed);

    const updatedPositions = updatedList.map((item, index) => ({
      ...item,
      queue_position: index + 1,
    }));
    console.log(updatedPositions);

    rearrangeMutation.mutate(updatedPositions);
  };

  return waitingList.status === "loading" ? (
    <h1>Loading</h1>
  ) : (
    <TableContainer component={Paper} style={{ maxHeight: 800 }}>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="patientList" type="group">
          {(provided) => (
            <Table
              stickyHeader
              sx={{ minWidth: 100 }}
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Check In Time</TableCell>
                </TableRow>
              </TableHead>
              <TableBody ref={provided.innerRef} {...provided.droppableProps}>
                {waitingList.result!.map((row, index) => (
                  <Draggable
                    key={row.ticket_id}
                    draggableId={`patient-${row.ticket_id}`}
                    index={index}
                  >
                    {(provided) => (
                      <TableRow
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        sx={{
                          "&:last-child td, &:last-child th": {
                            border: 0,
                            height: 20,
                          },
                        }}
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
                ))}
                {provided.placeholder}
              </TableBody>
            </Table>
          )}
        </Droppable>
      </DragDropContext>
    </TableContainer>
  );
}
