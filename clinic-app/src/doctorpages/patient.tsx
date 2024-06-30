import { ListPatients } from '../features/patientInfo/patientList';
import CreatePatientModal from '../components/createPatientForm';
 
export default function patient() {

  return (
    <div className="App">
      <CreatePatientModal/>
      
      <ListPatients/>
    </div>
  );
}

