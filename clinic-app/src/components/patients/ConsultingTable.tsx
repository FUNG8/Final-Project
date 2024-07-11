// hahahahaha
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { NextConsultingPatient, usePatientWaitingList } from '../../api/patientAPI';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';




interface PatientWaitingList {
  status: string;
  consulting?: {
    id: string;
    firstName: string;
    lastName: string;
    status: string;
  }[];
}

export default function ConsultingList() {
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [showCompleted, setShowCompleted] = useState(false);

  const patientWaitingList: PatientWaitingList = usePatientWaitingList();
  console.log("showmeeeee showmeeee showwww showww meeee", (patientWaitingList as any));

  const queryClient = useQueryClient()

  const updatingNextPatient = useMutation({
    mutationFn: async () => NextConsultingPatient(),
    onSuccess: (message: any) => {
      console.log(message);
      // invalidate query so to update the page immediately
      queryClient.invalidateQueries({ queryKey: ["PatientWaitingList"] });
      queryClient.invalidateQueries({ queryKey: ["NumberWaitingList"] });
      queryClient.invalidateQueries({ queryKey: ["CompletedPatientNumber"] });

    },
  });
  console.log("this is the updating Next Patient message:", updatingNextPatient)

  React.useEffect(() => {
    if (isButtonClicked) {
      const interval = setInterval(() => {
        console.log('Interval callback');
        clearInterval(interval);
      }, 2000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [isButtonClicked]);

  return (
    <TableContainer component={Paper} style={{ maxHeight: 400 }}>
      <Table stickyHeader sx={{ minWidth: 100 }} aria-label="simple table">
        <TableHead >
          <TableRow >
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(patientWaitingList as any).result?.map((patient: any) => (
            patient.status === "consulting" ? (
              <TableRow
                key={patient.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0, height: 20 } }}
              >
                <TableCell component="th" scope="row">
                  {patient.firstName}
                </TableCell>
                <TableCell>{patient.lastName}</TableCell>
                <TableCell>
                  <TableCell>
                    {showCompleted ? (
                      <span>Completed</span>
                    ) : (
                      <Button
                        sx={{ margin: 0 }}
                        variant="contained"
                        size="small"
                        onClick={() => {
                          updatingNextPatient.mutate();
                          setIsButtonClicked(true);
                          setShowCompleted(true);
                          setTimeout(() => setShowCompleted(false), 2000);
                        }}
                      >
                        Consulting
                      </Button>
                    )}
                  </TableCell>
                </TableCell>
              </TableRow>
            ) : null
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

