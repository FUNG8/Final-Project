import Card from "@mui/material/Card";
import PatientProfileBar from "../../components/patients/PatientProfileBar";
import Grid from "@mui/material/Grid";
import PatientBanner from "../../components/patients/PatientBanner";
import PatientPersonalInfo from "../../components/patients/PatientPersonalInfo";
import { PatientDiagnosisList } from "../../components/patients/PatientDiagnosisList";
import PatientProfileBarAdvanced from "../../components/patients/PatientProfileBarAdvanced";

export default function DiagnosisHistory() {


  return (
    <Grid sx={{ height: "auto" }}>
      {/* <PatientProfileBar /> */}
      
      <Card
        sx={{
          zIndex: -2,
          height: "1000",
          padding: 2,
          backgroundColor: "rgb(232, 242, 252, 0.4)",
        }}
      >
        <PatientDiagnosisList />
      </Card>
    </Grid>
  );
}
