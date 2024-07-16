import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import PatientBanner from "../../components/patients/PatientBanner"
import { useFetchDataToDiagnosis, useFetchDataToProfile } from "../../api/patientAPI";
import { jwtDecode } from "jwt-decode";





export default function PatientPersonalInfo() {
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



  return (
    <div>

      {profileDetails.status === "success" ?
        <Grid container spacing={2} sx={{ mt: 1 }}>
          {/* title */}
          <Grid sx={{ fontSize: 30, padding: 2 }}>
            {profileDetails.result.firstName}{profileDetails.result.lastName}
            <br/>
            Personal Details
          </Grid>
          {/* content */}
          <Grid typography={"body2"} container spacing={3} sx={{ padding: 1, fontSize: 18, ml: 1 }}>

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
        </Grid> : <></>}

    </div>
  );
}