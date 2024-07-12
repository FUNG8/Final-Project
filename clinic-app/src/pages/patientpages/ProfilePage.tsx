import Card from "@mui/material/Card";
import PatientProfileBar from "../../components/patients/PatientProfileBar"
import Grid from "@mui/material/Grid";
import PatientBanner from "../../components/patients/PatientBanner"
import { useFetchDataToDiagnosis, useFetchDataToProfile } from "../../api/patientAPI";
import { jwtDecode } from "jwt-decode";
import "./ProfilePage.scss"

// interface ProfileDetails {
//   firstName: string;
//   lastName: string;
//   birth_date: string;
//   gender: string;
//   phone_number: string;
//   emergency_contact: number;
//   emergency_name: string;
//   created_at: Date;
//   name: string;
// };



export default function Profile() {
  const hkid = (jwtDecode(localStorage.getItem("patientToken")!) as any).hkid
  const profileDetails: any = useFetchDataToProfile(hkid);
  const diagnosisDetails: any = useFetchDataToDiagnosis(hkid);
  // console.log(profileDetails)
  // console.log(diagnosisDetails)

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
      <PatientBanner />
      <PatientProfileBar />
      {profileDetails.status === "success" ?
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} md={6}>
            <Card sx={{ height: 500, padding: 2, backgroundColor: 'rgb(232, 242, 252, 0.4)' }}>
              <Grid sx={{ fontSize: 30, padding: 2, fontFamily: "monospace" }}>
                Personal Details
              </Grid>
              <Grid container spacing={3} sx={{ padding: 1, fontFamily: "monospace", fontSize: 18, ml: 1 }}>

                <Grid item xs={12} sm={8} >
                  <div className="detailsContainer">
                    First Name: {profileDetails.result.firstName}
                  </div>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <div className="detailsContainer">
                    Last Name : {profileDetails.result.lastName}
                  </div>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <div className="detailsContainer">
                    Birth: {formattedBirthDate}
                  </div>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <div className="detailsContainer">
                    Gender : {profileDetails.result.gender}
                  </div>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <div className="detailsContainer">
                    Phone Number : {profileDetails.result.phone_number}
                  </div>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <div className="detailsContainer">
                    Emergency Name : {profileDetails.result.emergency_name}
                  </div>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <div className="detailsContainer">
                    Emergency Contact : {profileDetails.result.emergency_contact}
                  </div>
                </Grid>
              </Grid>
            </Card>
          </Grid>
          {diagnosisDetails.message = "success" ? <Grid item xs={12} md={6}>
            <Card sx={{ height: 500, padding: 2, backgroundColor: 'rgb(232, 242, 252, 0.4)' }}>
              <Grid sx={{ fontSize: 30, padding: 2, fontFamily: "monospace" }}>
                Diagnosis History
              </Grid>
              <Grid container spacing={3} sx={{ padding: 1, fontFamily: "monospace", fontSize: 18, ml: 1 }}>
                <Grid item xs={12} sm={6}>
                  <div className="detailsContainer">
                    Date: {formattedDiagnosisDate}
                    {/* Date: {diagnosisDetails ? diagnosisDetails.created_at : " "} */}
                  </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <div className="detailsContainer">
                    Diagnosis: {diagnosisDetails ? diagnosisDetails.name : " "}
                  </div>
                </Grid>
              </Grid>
            </Card>
          </Grid> : <></>}
        </Grid> : <></>}

    </div>
  );
}