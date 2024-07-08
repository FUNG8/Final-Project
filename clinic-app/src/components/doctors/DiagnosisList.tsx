import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Pagination,
  Grid,
  CssBaseline,
  Divider,
  List,
  ListItemIcon,
  ListItemButton,
  ListItemText,
  Chip,
} from "@mui/material";
import { SetStateAction, useEffect, useState } from "react";
import { SearchBar } from "./SearchBar";
import { useShowDiagnosis } from "../../api/diagnosisAPI";
import { useParams } from "react-router-dom";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AOS from 'aos';
import 'aos/dist/aos.css';

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
  unit_measurement: number;
  frequency_per_day: number;
  taken_count_today: number;
  dosage_per_serving: number;
}

interface DiagnosisResponse {
  status: string;
  diagnosisResult?: Diagnosis[];
}

interface InstructionResponse {
  status: string;
  instructionsResult?: Instructions[];

}

export function ListDiagnosis() {
  let { patientId } = useParams();
  const diagnosis: DiagnosisResponse | null = useShowDiagnosis(parseInt(patientId!));
  const instructions: InstructionResponse | null = useShowDiagnosis(parseInt(patientId!));

  // function createData(
  //   method: string,
  //   period_hr: number,
  //   period_day: number,
  //   medicine_id: number,
  //   taken_count: number,
  //   drug_remarks: string,
  //   medicine_name: string,
  //   total_quantity: number,
  //   unit_measurement: number,
  //   frequency_per_day: number,
  //   taken_count_today: number,
  //   dosage_per_serving: number
  // ) {
  //   return { 
  //     medicine_id, 
  //     medicine_name, 
  //     method, period_hr, 
  //     period_day, 
  //     taken_count, 
  //     drug_remarks, 
  //     total_quantity, 
  //     unit_measurement, 
  //     frequency_per_day, 
  //     taken_count_today, 
  //     dosage_per_serving };
  // }

  // const rows = [
  //   createData('Medicine_id ',{instrictopm}),
  //   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  //   createData('Eclair', 262, 16.0, 24, 6.0),
  //   createData('Cupcake', 305, 3.7, 67, 4.3),
  //   createData('Gingerbread', 356, 16.0, 49, 3.9),
  //   createData('Frozen yoghurt',),
  //   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  //   createData('Eclair', 262, 16.0, 24, 6.0),
  //   createData('Cupcake', 305, 3.7, 67, 4.3),
  //   createData('Gingerbread', 356, 16.0, 49, 3.9),
  //   createData('Gingerbread', 356, 16.0, 49, 3.9),
  //   createData('Gingerbread', 356, 16.0, 49, 3.9)
  // ];


  return (

    <div>
      <Box justifyContent="center" mt={4}>
        {diagnosis?.status === "success" && diagnosis.diagnosisResult?.map((diagnosis) => (
          <div key={diagnosis.id}>
            <Accordion
              sx={{
                margin: 2,
                "&.Mui-expanded": {
                  // Styles for the expanded accordion
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                  backgroundColor: "#f5f5f5",
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
                  {instructions?.status === "success" && instructions.instructionsResult?.map((instructions) => (

                    <Paper key={instructions.instruction_id} sx={{ marginBottom: 2, padding: 2 }}>
                      <Grid container sx={{ marginTop: 2, marginBottom: 2 }}>
                        <Grid xs={2}>Medicine ID:</Grid>
                        <Grid xs={2}>{instructions.medicine_id}</Grid>
                        <Grid xs={2}>Medicine Name:</Grid>
                        <Grid xs={6}>{instructions.medicine_name}</Grid>
                      </Grid>
                      <Grid container sx={{ marginTop: 2, marginBottom: 2 }}>
                        <Grid xs={2}>Take In Method:</Grid>
                        <Grid xs={2}>{instructions.method}</Grid>
                        <Grid xs={2}>Take In Period Day:</Grid>
                        <Grid xs={2}>{instructions.period_day}</Grid>
                        <Grid xs={2}>Take In Period Hours:</Grid>
                        <Grid xs={2}>{instructions.period_hr}</Grid>
                      </Grid>
                      <Grid container sx={{ marginTop: 2, marginBottom: 2 }}>
                        <Grid xs={2}>Unit Measurement:</Grid>
                        <Grid xs={2}>{instructions.unit_measurement}</Grid>
                        <Grid xs={2}>Frequency Per Day:</Grid>
                        <Grid xs={2}>{instructions.frequency_per_day}</Grid>
                        <Grid xs={2}>Dosage Per Serving:</Grid>
                        <Grid xs={2}>{instructions.dosage_per_serving}</Grid>
                      </Grid>
                      <Grid container sx={{ marginTop: 2, marginBottom: 2 }}>
                        <Grid xs={2}>Drug Remarks:</Grid>
                        <Grid xs={10}>{instructions.drug_remarks}</Grid>
                      </Grid>
                      <Divider />
                      <Grid container sx={{ marginTop: 2, marginBottom: 2 }}>
                        <Grid xs={2}>Total Quantity:</Grid>
                        <Grid xs={2}><Chip label={instructions.total_quantity} /></Grid>
                        <Grid xs={2}>Taken Count:</Grid>
                        <Grid xs={2}><Chip label={instructions.taken_count} /></Grid>
                        <Grid xs={2}>Taken Count Today:</Grid>
                        <Grid xs={2}><Chip label={instructions.taken_count_today} /></Grid>
                      </Grid>
                    </Paper>
                  ))}</Typography>


              </AccordionDetails>
            </Accordion>

          </div>
        ))}


      </Box>
    </div>
  );
}
function setSearchTerm(input: string) {
  throw new Error("Function not implemented.");
}

