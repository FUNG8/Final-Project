import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import PatientBanner from "../../components/patients/PatientBanner";
import PatientPersonalInfo from "../../components/patients/PatientPersonalInfo";
import { PatientDiagnosisList } from "../../components/patients/PatientDiagnosisList";
import PatientProfileBarAdvanced from "../../components/patients/PatientProfileBarAdvanced";

export default function Profile() {


  return (
    <Grid sx={{ height: "auto" }}>
      <PatientBanner />
      <PatientProfileBarAdvanced/>
      <Card
        sx={{
          height: 500,
          padding: 2,
          backgroundColor: "rgb(232, 242, 252, 0.4)",
        }}
      >
        <PatientPersonalInfo />
      </Card>
      {/* <Card
        sx={{
          zIndex: -2,
          height: "1000",
          padding: 2,
          backgroundColor: "rgb(232, 242, 252, 0.4)",
        }}
      >
        <PatientDiagnosisList />
      </Card> */}
    </Grid>
  );
}
