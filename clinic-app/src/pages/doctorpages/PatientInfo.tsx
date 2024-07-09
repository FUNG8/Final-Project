// hahahahaha

import { Box, FormControlLabel, Paper, Slide, Switch } from "@mui/material";
import { ShowPatientInfo } from "../../components/doctors/ShowPatientInfo";
import { useState } from "react";
import React from "react";
import { ListDiagnosis } from "../../components/doctors/DiagnosisList";
import { ListDiagnosisCopy } from "../../components/doctors/DiagnosisListCopy";



export default function PatientInfo() {

  return (
    <div className="App">

      <ShowPatientInfo />

      <ListDiagnosis />
      <ListDiagnosisCopy/>
    </div>
  );
}
