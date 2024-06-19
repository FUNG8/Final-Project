import { usePatientsInfo } from './patientAPI';

export function ListPatients() {
  const patients = usePatientsInfo();
  console.log(patients)

  return (
    <div>
      <h2>Patients</h2>
      <table>
       
        <tbody >
          {patients && patients.map((patient) => (

            <tr key={patient.id}>
              <td>{patient.id}</td>
              <td>{patient.register_id}</td>
              <td>{patient.name}</td>
              <td>{patient.hkid}</td>
              <td>{patient.birth_date}</td>
              <td>{patient.phone_number}</td>
              <td>{patient.diagnosis_id}</td>
              <td>{patient.emergency_name}</td>
              <td>{patient.emergency_contact}</td>
              <td>{patient.updated_at}</td>
              <td>{patient.created_at}</td>
            </tr>


          ))}
        </tbody>
      </table>
    </div>
  );
};
