import {
  Paper,
  Box,
  Grid,
  Divider,
  Chip,
} from "@mui/material";
import { useShowDiagnosis } from "../../api/diagnosisAPI";
import { useParams } from "react-router-dom";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

interface Diagnosis {
  id: string;
  name: string;
  remarks: string;
  created_at: string;
  instructions: [];
}

interface Instructions {
  instruction_id: number;
  method: string;
  period_hr: number;
  period_day: number;
  medicine_id: number;
  taken_count: number;
  drug_remarks: string;
  medicine_name: string;
  total_quantity: number;
  unit_measurement: string;
  frequency_per_day: number;
  taken_count_today: number;
  dosage_per_serving: number;
}

interface DiagnosisResponse {
  status: string;
  diagnosisResult?: Diagnosis[];
}



export function PatientDiagnosisList() {
  const [patientId, setpatientId] = useState("");
  useEffect(() => {
    const patientToken = localStorage.getItem("patientToken");
    if (patientToken) {
      let decoded: any = jwtDecode(patientToken);
      console.log("token is", decoded)
      const pId = decoded["userId"];
      setpatientId(pId);
    }
  }, []);

  const allDiagnosis: DiagnosisResponse | null = useShowDiagnosis(
    parseInt(patientId!)
  );

  return (
    <Box justifyContent="center" my={1} sx={{ zIndex: -2, height: "auto", "&.Mui-expanded": { height: "auto" } }}>
      {allDiagnosis?.status === "success" &&
        allDiagnosis.diagnosisResult?.map((diagnosis) => (
            <Accordion
              key={diagnosis.id}
              
              sx={{
                marginBottom:2,
                zIndex: 0,
                "&.Mui-expanded": {
                  // Styles for the expanded accordion
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                  marginBottom: 2,
                },
              }}
            >
              <AccordionSummary
                expandIcon={<ArrowDropDownIcon />}
                aria-controls="panel2-content"
                id="panel2-header"
              >
                <Grid xs={12} mx={2} >
                  <Typography> {diagnosis.name}</Typography>
                  <Typography variant="overline" display="block" gutterBottom>
                    {diagnosis.created_at}
                  </Typography>
                </Grid>
              </AccordionSummary>


              <AccordionDetails>
                <Grid xs={12} mx={2} >

                  <Typography variant="body2" gutterBottom>
                    <Typography >
                      Remarks
                    </Typography>
                    {diagnosis.remarks}
                  </Typography>

                  <Divider />

                  <Grid my={2} xs={12} justifyContent="center">
                    <Typography style={{ textAlign: "center" }}>
                      Medicine Instructions
                    </Typography>
                  </Grid>


                  {/* mapping instructions */}
                  {diagnosis.instructions?.map((instruction: any) => (
                    <Paper
                      key={instruction.instruction_id}
                      sx={{
                        marginBottom: 0,
                        padding: 1,
                        backgroundColor: "#8CDBD3",
                        color: "black"
                      }}
                    >

                      <Grid typography="body2" container sx={{ marginTop: 2, marginBottom: 2 }}>

                        <Grid xs={8} fontWeight="bold">Medicine Name</Grid>
                        <Grid xs={4}>{instruction.medicine_name}</Grid>
                        <Grid xs={8} fontWeight="bold">Take In Method</Grid>
                        <Grid xs={4}>{instruction.method}</Grid>
                        <Grid xs={8} fontWeight="bold">Take In Period Days</Grid>
                        <Grid xs={4}>{instruction.period_day}</Grid>
                        <Grid xs={8} fontWeight="bold">Take In Period Hours</Grid>
                        <Grid xs={4}>{instruction.period_hr}</Grid>
                        <Grid xs={8} fontWeight="bold">Unit Measurement</Grid>
                        <Grid xs={4}>{instruction.unit_measurement}</Grid>
                        <Grid xs={8} fontWeight="bold">Frequency Per Day</Grid>
                        <Grid xs={4}>{instruction.frequency_per_day}</Grid>
                        <Grid xs={8} fontWeight="bold">Dosage Per Serving</Grid>
                        <Grid xs={4}>{instruction.dosage_per_serving}</Grid>
                        <Divider />


                        <Grid container xs={12}>
                          <Grid xs={12} fontWeight="bold">Drug Count</Grid>
                          <Grid xs={2}>Total</Grid>
                          <Grid xs={2}>{instruction.total_quantity}
                          </Grid>
                          <Grid xs={2}>Taken</Grid>
                          <Grid xs={2}>{instruction.taken_count}
                          </Grid>
                          <Grid xs={2}>Today:</Grid>
                          <Grid xs={2}>{instruction.taken_count_today}
                          </Grid>
                        </Grid>

                        <Grid xs={12} fontWeight="bold">Drug Remarks:</Grid>
                        <Grid xs={12}>{instruction.drug_remarks}</Grid>

                      </Grid>
                    </Paper>
                  ))}
                </Grid>
              </AccordionDetails>
            </Accordion>
        ))}
    </Box>
  );
}
