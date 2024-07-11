import { ListDiagnosis } from "../../components/doctors/DiagnosisList";
import { ListPatients } from "../../components/doctors/PatientList";
import InsertPatientModal from "../../components/doctors/InsertPatientForm";
import { SnackbarProvider } from "notistack";
import { Grid } from "@mui/material";

export default function Patient() {
  return (
    <div className="App" >

      <SnackbarProvider maxSnack={3}>
        <Grid mx={5}>
          <InsertPatientModal />

          <ListPatients />
          <ListDiagnosis />
        </Grid>
      </SnackbarProvider>
    </div>
  );
}
