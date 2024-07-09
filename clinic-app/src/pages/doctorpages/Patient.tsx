
// hahahahaha
import { ListDiagnosis } from "../../components/doctors/DiagnosisList";
import { ListPatients } from "../../components/doctors/PatientList";
import InsertPatientModal from "../../components/doctors/InsertPatientForm";

export default function Patient() {

  return (
    <div className="App">

      <InsertPatientModal/>

      <ListPatients/>
      <ListDiagnosis/>
    </div>
  );
}

