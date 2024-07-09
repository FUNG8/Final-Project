// hahahahaha
import { ShowPatientInfo } from "../../components/doctors/ShowPatientInfo";

import { ListDiagnosis } from "../../components/doctors/DiagnosisList";



export default function PatientInfo() {

  return (
    <div className="App">

      <ShowPatientInfo />

      <ListDiagnosis />
      {/* <ListDiagnosisCopy/> */}
    </div>
  );
}
