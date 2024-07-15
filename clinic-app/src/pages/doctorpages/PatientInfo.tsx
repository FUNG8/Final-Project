// hahahahaha

import {
  Grid,
  Zoom,
} from "@mui/material";
import { ShowPatientInfo } from "../../components/doctors/ShowPatientInfo";
import { ListDiagnosis } from "../../components/doctors/DiagnosisList";
import InsertDiagnosisModal from "../../components/doctors/InsertDiagnosisForm";
import { useEffect } from "react";
import React from "react";

export default function PatientInfo() {
  const [checked, setChecked] = React.useState(false);

  useEffect(() => {
    setChecked(true)
  });
  return (
    <div className="App">
      <Grid mx={5}>
        <Zoom in={checked} style={{ transitionDelay: checked ? '100ms' : '0ms' }}>
          <div>
            <InsertDiagnosisModal />
          </div>
        </Zoom>
        <Zoom in={checked} style={{ transitionDelay: checked ? '200ms' : '0ms' }}>
          <div>
            <ShowPatientInfo />
          </div>
        </Zoom>
        <Zoom in={checked} style={{ transitionDelay: checked ? '300ms' : '0ms' }}>
          <div>
            <ListDiagnosis />
          </div>
        </Zoom>


      </Grid>
    </div>
  );
}
