import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';


const useStyles:any = makeStyles({
  app: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: '50%',
    margin: '20px',
  },
  title: {
    fontSize: '30px',
    fontFamily: 'monospace',
    fontWeight: 'bold',
  },
  titleMessage: {
    fontSize: '20px',
    fontFamily: 'monospace',
  },
  medicineDetailContainer: {
    display: 'grid',
    gap: '10px',
    margin: '10px',
    fontSize: '20px',
    fontFamily: 'monospace',
  },
  medicineRow: {
    display: 'flex',
    alignItems: 'center',
  },
  yesCheckbox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  checkbox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: '10px',
  },
});

export default function MedicineConfirmation(){
  const classes = useStyles();

  return (
    <div id="app" className={classes.app}>
      <div className={classes.title}>Confirmations</div>
      <div className={classes.titleMessage}>Have you taken the Medicine Yet?</div>

      <Grid container className={classes.medicineDetailContainer}>
        <Grid container item xs={12} className={classes.medicineRow}>
          <Grid item xs={8}>Medicine Name:</Grid>
        </Grid>
        <Grid container item xs={12} className={classes.medicineRow}>
          <Grid item xs={8}>Drug Shape:</Grid>
        </Grid>
        <Grid container item xs={12} className={classes.medicineRow}>
          <Grid item xs={8}>Drug Color:</Grid>
        </Grid>
        <Grid container item xs={12} className={classes.medicineRow}>
          <Grid item xs={8}>Method:</Grid>
        </Grid>
        <Grid container item xs={12} className={classes.medicineRow}>
          <Grid item xs={8}>Dosage:</Grid>
        </Grid>
        <Grid container item xs={12} className={classes.checkbox}>
          Click Me! I have taken! <Checkbox />
        </Grid>
      </Grid>
    </div>
  );
};
