import React from 'react';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { SendPatient } from './SendPatient';
import { useSnackbar } from 'notistack';

interface QueueButtonProps {
  patientId: string;
}

const QueueButton: React.FC<QueueButtonProps> = ({ patientId }) => {
  console.log(`Patient ${patientId} is being sent...`);
  const { enqueueSnackbar } = useSnackbar();

  const handleOpen = () => {
    enqueueSnackbar('On Queue Successful', {
      variant: 'success',
      autoHideDuration: 5000,
    });
  };

  const sendPatientAndShowSnackbar = (id: string) => {
    SendPatient(id);
    handleOpen(); // Show the snackbar after sending the patient
  };

  return (
    <Button
      sx={{ zIndex: 2 }}
      variant="contained"
      size="small"
      endIcon={<SendIcon />}
      onClick={() => sendPatientAndShowSnackbar(patientId)}
    >
      Queue
    </Button>
  );
};

export default QueueButton;



