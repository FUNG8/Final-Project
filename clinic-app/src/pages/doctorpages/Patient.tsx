import { ListDiagnosis } from "../../components/doctors/DiagnosisList";
import { ListPatients } from "../../components/doctors/PatientList";
import InsertPatientModal from "../../components/doctors/InsertPatientForm";
import { SnackbarProvider } from "notistack";
import { Grid, Zoom } from "@mui/material";
import React, { useEffect } from "react";

export default function Patient() {
  const [checked, setChecked] = React.useState(false);
  useEffect(() => {
    setChecked(true)
  });

  return (
    <div className="App" >

      <SnackbarProvider maxSnack={3}>
        <Grid mx={0}>
          <Zoom in={checked} style={{ transitionDelay: checked ? '100ms' : '0ms' }}>
            <div>
              <InsertPatientModal />
            </div>
          </Zoom>
            <div>
              <ListPatients />
            </div>

          {/* <ListDiagnosis /> */}
        </Grid>
      </SnackbarProvider>
    </div>
  );
}
