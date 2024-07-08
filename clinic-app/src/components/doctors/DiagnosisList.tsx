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

                    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                      <List sx={{ marginTop: 2 }}>
                        <Grid container sx={{ display: "flex", alignItems: "center" }}>
                          <Grid item xs={6}>
                            <ListItemText>Medicine</ListItemText>
                          </Grid>
                          <Grid item xs={6}>
                            <ListItemText>{instructions.medicine_name}</ListItemText>
                          </Grid>
                        </Grid>
                        <Grid container sx={{ display: "flex", alignItems: "center" }}>
                          <Grid item xs={6}>
                            <ListItemText>Method</ListItemText>
                          </Grid>
                          <Grid item xs={6}>
                            <ListItemText>{instructions.method}</ListItemText>
                          </Grid>
                        </Grid>
                      </List>
                    </Box>


                  ))}</Typography>

              </AccordionDetails>
            </Accordion>
            <Box>
            </Box>
          </div>
        ))}


      </Box>
    </div>
  );
}
function setSearchTerm(input: string) {
  throw new Error("Function not implemented.");
}

