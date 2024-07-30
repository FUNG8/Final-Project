import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import PatientBanner from "../../components/patients/PatientBanner";
import PatientPersonalInfo from "../../components/patients/PatientPersonalInfo";
import { PatientDiagnosisList } from "../../components/patients/PatientDiagnosisList";
import PatientProfileBarAdvanced from "../../components/patients/PatientProfileBarAdvanced";
import { Typography } from "@mui/material";

export default function DiagnosisHistory() {


  return (
    <Grid sx={{ height: "auto" }}>
      {/* <PatientProfileBar /> */}

      <Grid
        container
        alignItems={"center"}
        justifyContent={"space-between"}
        sx={{ display: "flex" }}
      >
        <Grid xs={12} alignItems={"center"}
          justifyContent={"space-between"} >
          <Typography textAlign={"center"}>Diagnosis History</Typography>

        </Grid>

      </Grid>
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
