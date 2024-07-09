
// hahahahaha
import { SnackbarProvider } from "notistack";
import CreatePatientModal from "../../components/doctors/CreatePatientForm";
import { ListDiagnosis } from "../../components/doctors/DiagnosisList";
import { ListPatients } from "../../components/doctors/PatientList";

export default function Patient() {

  return (
    <div className="App">
      <SnackbarProvider maxSnack={3}>
        <CreatePatientModal />

        <ListPatients />
        <ListDiagnosis />
      </SnackbarProvider>
    </div>
  );
}

