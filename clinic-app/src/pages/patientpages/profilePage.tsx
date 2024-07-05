// hahahahaha
import Card from "@mui/material/Card";
import PatientProfileBar from "../../components/patients/PatientProfileBar"
import Grid from "@mui/material/Grid";
import PatientBanner from "../../components/patients/PatientBanner"
import { StyleContainer } from "./PatientPageConatinerStyle";

export default function Profile() {





  return (
    <div>
      <PatientBanner />
      <PatientProfileBar />
      
      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: 500, padding: 2, backgroundColor: 'rgb(232, 242, 252, 0.4)' }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <StyleContainer title="First Name : ">
                  {/* content goes here */}
                </StyleContainer>
              </Grid>
              <Grid item xs={12} sm={6}>
                <StyleContainer title="Last Name :">
                  {/* content goes here */}
                </StyleContainer>
              </Grid>
              <Grid item xs={12} sm={6}>
                <StyleContainer title="Birthday :">
                  {/* content goes here */}
                </StyleContainer>
              </Grid>
              <Grid item xs={12} sm={6}>
                <StyleContainer title="Gender :">
                  {/* content goes here */}
                </StyleContainer>
              </Grid>
              <Grid item xs={12} sm={6}>
                <StyleContainer title="Phone Number :">
                  {/* content goes here */}
                </StyleContainer>
              </Grid>
              <Grid item xs={12} sm={6}>
                <StyleContainer title="Emergency Contact Name :">
                  {/* content goes here */}
                </StyleContainer>
              </Grid>
              <Grid item xs={12} sm={6}>
                <StyleContainer title="Emergency Contact Number :">
                  {/* content goes here */}
                </StyleContainer>
              </Grid>
            </Grid>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card sx={{ height: 500, padding: 2, backgroundColor: 'rgb(232, 242, 252, 0.4)' }}>
            <Grid sx={{ fontSize: 30, padding: 2, fontFamily: "monospace" }}>
              Diagnosis History
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <StyleContainer title="Date:">
                  {/* content goes here */}
                </StyleContainer>
              </Grid>
              <Grid item xs={12} sm={6}>
                <StyleContainer title="Name:">
                  {/* content goes here */}
                </StyleContainer>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>

    </div>
  );
}