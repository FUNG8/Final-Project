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



export function ListDiagnosis() {
  let { patientId } = useParams();
  const allDiagnosis: DiagnosisResponse | null = useShowDiagnosis(
    parseInt(patientId!)
  );

  return (
    <Box justifyContent="center" mt={4}>
      {allDiagnosis?.status === "success" &&
        allDiagnosis.diagnosisResult?.map((diagnosis) => (
          <Accordion
            key={diagnosis.id}
            sx={{
              margin: 2,
              "&.Mui-expanded": {
                // Styles for the expanded accordion
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                // backgroundColor: "#9a9ca1",

                margin: 2,
              },
            }}
          >
            <AccordionSummary
              expandIcon={<ArrowDropDownIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
            >
              <Grid xs={4} sx={{ margin: 2 }}>
                <Typography>Diagnosis ID: {diagnosis.id}</Typography>
              </Grid>
              <Grid xs={8} sx={{ margin: 2 }}>
                <Typography>Symptoms: {diagnosis.name}</Typography>
              </Grid>
            </AccordionSummary>
            <Divider />
            <AccordionDetails>
              <Typography sx={{ margin: 2 }}>
                Remarks: {diagnosis.remarks}
              </Typography>
              <Divider />
              <Typography sx={{ margin: 2 }}>
                Diagnosis Time: {diagnosis.created_at}
              </Typography>
              <Divider />
              <Typography sx={{ margin: 2 }}>
                {/* mapping instructions */}
                {diagnosis.instructions?.map((instruction: any) => (
                  <Paper
                    key={instruction.instruction_id}
                    sx={{
                      marginBottom: 2,
                      padding: 2,
                      backgroundColor: "#9a9ca1"
                    }}
                  >
                    <Grid container sx={{ marginTop: 2, marginBottom: 2 }}>
                      <Grid xs={2}>Medicine ID:</Grid>
                      <Grid xs={2}>{instruction.medicine_id}</Grid>
                      <Grid xs={2}>Medicine Name:</Grid>
                      <Grid xs={6}>{instruction.medicine_name}</Grid>
                    </Grid>
                    <Grid container sx={{ marginTop: 2, marginBottom: 2 }}>
                      <Grid xs={2}>Take In Method:</Grid>
                      <Grid xs={2}>{instruction.method}</Grid>
                      <Grid xs={2}>Take In Period Day:</Grid>
                      <Grid xs={2}>{instruction.period_day}</Grid>
                      <Grid xs={2}>Take In Period Hours:</Grid>
                      <Grid xs={2}>{instruction.period_hr}</Grid>
                    </Grid>
                    <Grid container sx={{ marginTop: 2, marginBottom: 2 }}>
                      <Grid xs={2}>Unit Measurement:</Grid>
                      <Grid xs={2}>{instruction.unit_measurement}</Grid>
                      <Grid xs={2}>Frequency Per Day:</Grid>
                      <Grid xs={2}>{instruction.frequency_per_day}</Grid>
                      <Grid xs={2}>Dosage Per Serving:</Grid>
                      <Grid xs={2}>{instruction.dosage_per_serving}</Grid>
                    </Grid>
                    <Grid container sx={{ marginTop: 2, marginBottom: 2 }}>
                      <Grid xs={2}>Drug Remarks:</Grid>
                      <Grid xs={10}>{instruction.drug_remarks}</Grid>
                    </Grid>
                    <Divider />
                    <Grid container sx={{ marginTop: 2, marginBottom: 2 }}>
                      <Grid xs={2}>Total Quantity:</Grid>
                      <Grid xs={2}>
                        <Chip label={instruction.total_quantity} />
                      </Grid>
                      <Grid xs={2}>Taken Count:</Grid>
                      <Grid xs={2}>
                        <Chip label={instruction.taken_count} />
                      </Grid>
                      <Grid xs={2}>Taken Count Today:</Grid>
                      <Grid xs={2}>
                        <Chip label={instruction.taken_count_today} />
                      </Grid>
                    </Grid>
                  </Paper>
                ))}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
    </Box>
  );
}
