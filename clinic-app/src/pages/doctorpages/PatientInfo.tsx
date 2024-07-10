// hahahahaha

import {
  Box,
  FormControlLabel,
  Grid,
  Paper,
  Slide,
  Switch,
} from "@mui/material";
import { ShowPatientInfo } from "../../components/doctors/ShowPatientInfo";

import { ListDiagnosis } from "../../components/doctors/DiagnosisList";
import InsertDiagnosisModal from "../../components/doctors/InsertDiagnosisForm";

export default function PatientInfo() {
  return (
    <div className="App">
      <Grid mx={5}>
        <InsertDiagnosisModal />

        <ShowPatientInfo />

        <ListDiagnosis />
      </Grid>
    </div>
  );
}
