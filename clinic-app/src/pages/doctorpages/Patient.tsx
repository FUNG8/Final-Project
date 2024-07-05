
// hahahahaha
import CreatePatientModal from "../../components/doctors/CreatePatientForm";
import { ListDiagnosis } from "../../components/doctors/DiagnosisList";
import { ListPatients } from "../../components/doctors/PatientList";

export default function Patient() {

  return (
    <div className="App">

      <CreatePatientModal/>

      <ListPatients/>
      <ListDiagnosis/>
    </div>
  );
}

