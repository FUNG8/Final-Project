import React from 'react';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { useSnackbar } from 'notistack'; // Correct hook from notistack
import { SendPatient } from './SendPatient'; // Assuming this is correct

interface Patient {
  id: string;
}

interface QueueButtonProps {
  patient: Patient;
}

const QueueButton: React.FC<QueueButtonProps> = ({ patient }) => {
  const { enqueueSnackbar } = useSnackbar();

  const handleOpen = () => {
    enqueueSnackbar('On Queue Successful', {
      variant: 'success', // or any other variant like 'error', 'warning', 'info'
      autoHideDuration: 5000,
    });
  };

  const sendPatientAndShowSnackbar = (patientId: string) => {
    SendPatient(patientId);
    handleOpen(); // Show the snackbar after sending the patient
  };

  return (
    <React.Fragment>
      <Button
        sx={{ zIndex: 2 }}
        variant="contained"
        size="small"
        endIcon={<SendIcon />}
        onClick={() => sendPatientAndShowSnackbar(patient.id)}
      >
        Queue
      </Button>
    </React.Fragment>
  );
};

export default QueueButton;