import Card from "@mui/material/Card";
import PatientProfileBar from "../../components/patients/PatientProfileBar"
import Grid from "@mui/material/Grid";
import PatientBanner from "../../components/patients/PatientBanner"
import { useFetchDataToDiagnosis, useFetchDataToProfile } from "../../api/patientAPI";
import { jwtDecode } from "jwt-decode";
import PatientPersonalInfo from "../../components/patients/PatientPersonalInfo";
import PatientDiagnosisHistory from "../../components/patients/PatientDiagnosisHistory";
import { ListDiagnosis } from "../../components/doctors/DiagnosisList";
import { PatientDiagnosisList } from "../../components/patients/PatientDiagnosisList";





export default function Profile() {
  const hkid = (jwtDecode(localStorage.getItem("patientToken")!) as any).hkid
  const profileDetails: any = useFetchDataToProfile(hkid);
  const diagnosisDetails: any = useFetchDataToDiagnosis(hkid);
  console.log(profileDetails)
  console.log(diagnosisDetails)


  return (
    <Grid sx={{height:"auto"}}>
      <PatientBanner />
      <PatientProfileBar />
      <Card sx={{ height: 500, padding: 2, backgroundColor: 'rgb(232, 242, 252, 0.4)' }}>
        <PatientPersonalInfo />
      </Card>
      <Card sx={{zIndex:-2, height: "1000", padding: 2, backgroundColor: 'rgb(232, 242, 252, 0.4)' }}>
        <PatientDiagnosisList />
      </Card>

    </Grid>
  );
}