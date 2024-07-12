import Card from "@mui/material/Card";
import PatientProfileBar from "./PatientProfileBar"
import Grid from "@mui/material/Grid";
import PatientBanner from "./PatientBanner"
import { useFetchDataToDiagnosis, useFetchDataToProfile } from "../../api/patientAPI";
import { jwtDecode } from "jwt-decode";





export default function PatientDiagnosisHistory() {
  const hkid = (jwtDecode(localStorage.getItem("patientToken")!) as any).hkid
  const profileDetails: any = useFetchDataToProfile(hkid);
  const diagnosisDetails: any = useFetchDataToDiagnosis(hkid);
  console.log(profileDetails)
  console.log(diagnosisDetails)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const formattedBirthDate = profileDetails?.result?.birth_date
    ? formatDate(profileDetails.result.birth_date)
    : 'Date not available';

  const formattedDiagnosisDate = diagnosisDetails && diagnosisDetails.created_at
    ? formatDate(diagnosisDetails.created_at)
    : 'Date not available';

  return (
    <div>
      {diagnosisDetails && diagnosisDetails.message === "success" && (
          <Grid container spacing={2} sx={{ mt: 1 }}>
              {/* title */}
              <Grid
                sx={{
                  fontSize: 30,
                  padding: 2,
                  fontFamily: 'monospace',
                }}
              >
                Diagnosis History
              </Grid>
              {/* content */}
              <Grid
                container
                spacing={3}
                sx={{
                  padding: 1,
                  fontFamily: 'monospace',
                  fontSize: 18,
                  ml: 1,
                }}
              >
                <Grid item xs={12} sm={6}>
                  <div className="detailsContainer">
                    Date: {formattedDiagnosisDate}
                  </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <div className="detailsContainer">
                    Diagnosis: {diagnosisDetails ? diagnosisDetails.name : ' '}
                  </div>
                </Grid>
              </Grid>
          </Grid>
      )}
    </div>
  )
}