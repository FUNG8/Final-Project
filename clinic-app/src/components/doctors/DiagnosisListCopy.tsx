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
  
  
  
  export function ListDiagnosis() {
    let { patientId } = useParams();
    const diagnosis = useShowDiagnosis(parseInt(patientId!));
  
  
  
    return (
  
      <div>
        <Box justifyContent="center" mt={4}>
          {diagnosis && diagnosis.status === "success" && (diagnosis as any).diagnosisResult?.map((diagnosis: any) => (
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
                    {diagnosis && diagnosis.status === "success" && (diagnosis as any).diagnosisResult?.map((diagnosis: any) => (
  
  
                      <Paper key={diagnosis.instructions.instruction_id} sx={{ marginBottom: 2, padding: 2 }}>
                        <Grid container sx={{ marginTop: 2, marginBottom: 2 }}>
                          <Grid xs={2}>Medicine ID:</Grid>
                          <Grid xs={2}>{diagnosis.instructions.medicine_id}</Grid>
                          <Grid xs={2}>Medicine Name:</Grid>
                          <Grid xs={6}>{diagnosis.instructions.medicine_name}</Grid>
                        </Grid>
                        <Grid container sx={{ marginTop: 2, marginBottom: 2 }}>
                          <Grid xs={2}>Take In Method:</Grid>
                          <Grid xs={2}>{diagnosis.instructions.method}</Grid>
                          <Grid xs={2}>Take In Period Day:</Grid>
                          <Grid xs={2}>{diagnosis.instructions.period_day}</Grid>
                          <Grid xs={2}>Take In Period Hours:</Grid>
                          <Grid xs={2}>{diagnosis.instructions.period_hr}</Grid>
                        </Grid>
                        <Grid container sx={{ marginTop: 2, marginBottom: 2 }}>
                          <Grid xs={2}>Unit Measurement:</Grid>
                          <Grid xs={2}>{diagnosis.instructions.unit_measurement}</Grid>
                          <Grid xs={2}>Frequency Per Day:</Grid>
                          <Grid xs={2}>{diagnosis.instructions.frequency_per_day}</Grid>
                          <Grid xs={2}>Dosage Per Serving:</Grid>
                          <Grid xs={2}>{diagnosis.instructions.dosage_per_serving}</Grid>
                        </Grid>
                        <Grid container sx={{ marginTop: 2, marginBottom: 2 }}>
                          <Grid xs={2}>Drug Remarks:</Grid>
                          <Grid xs={10}>{diagnosis.instructions.drug_remarks}</Grid>
                        </Grid>
                        <Divider />
                        <Grid container sx={{ marginTop: 2, marginBottom: 2 }}>
                          <Grid xs={2}>Total Quantity:</Grid>
                          <Grid xs={2}><Chip label={diagnosis.instructions.total_quantity} /></Grid>
                          <Grid xs={2}>Taken Count:</Grid>
                          <Grid xs={2}><Chip label={diagnosis.instructions.taken_count} /></Grid>
                          <Grid xs={2}>Taken Count Today:</Grid>
                          <Grid xs={2}><Chip label={diagnosis.instructions.taken_count_today} /></Grid>
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
  
  