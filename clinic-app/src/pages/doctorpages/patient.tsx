
import { ListPatients } from '../../components/doctors/PatientList';
import CreatePatientModal from '../../components/doctors/CreatePatientForm';
 
export default function patient() {

  return (
    <div className="App">
      <CreatePatientModal/>
      
      <ListPatients/>
    </div>
  );
}

