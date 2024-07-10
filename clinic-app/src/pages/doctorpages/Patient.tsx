import { ListDiagnosis } from "../../components/doctors/DiagnosisList";
import { ListPatients } from "../../components/doctors/PatientList";
import InsertPatientModal from "../../components/doctors/InsertPatientForm";
import { SnackbarProvider } from "notistack";

export default function Patient() {
  return (
    <div className="App">
      <SnackbarProvider maxSnack={3}>
        <InsertPatientModal />

        <ListPatients />
        <ListDiagnosis />
      </SnackbarProvider>
    </div>
  );
}
