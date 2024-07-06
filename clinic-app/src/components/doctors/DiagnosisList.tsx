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
  created_at: string;
  remarks: string;
  id: string;
  name: string;
}

interface DiagnosisResponse {
  status: string;
  diagnosisResult?: Diagnosis[];
}

export function ListDiagnosis(){
  const {patientId} =useParams();
  const diagnosis = useShowDiagnosis(parseInt(patientId!));

console.log('front end ', diagnosis)
  return(
    <div>hi diag</div>

  )
}



// export function ListDiagnosis() {
//   let { patientId } = useParams();
//   const diagnosis: DiagnosisResponse | null = useShowDiagnosis(parseInt(patientId!));
//   return (
    
//     <div>
//       <Box justifyContent="center" mt={4}>
//         {diagnosis?.status === "success" && diagnosis.diagnosisResult?.map((diagnosis) => (


//           <div key={diagnosis.id}>
//             <Accordion
//               sx={{
//                 margin: 2,
//                 "&.Mui-expanded": {
//                   // Styles for the expanded accordion
//                   boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
//                   backgroundColor: "#f5f5f5",
//                   margin: 2,
//                 },
//               }}
//             >
//               <AccordionSummary
//                 expandIcon={<ArrowDropDownIcon />}
//                 aria-controls="panel2-content"
//                 id="panel2-header"
//               >
//                 <Grid xs={4} sx={{ margin: 2 }}>
//                   <Typography>Diagnosis ID: {diagnosis.id}</Typography>
//                 </Grid>
//                 <Grid xs={8} sx={{ margin: 2 }}>
//                   <Typography>Symptoms: {diagnosis.name}</Typography>
//                 </Grid>
//               </AccordionSummary>
//               <Divider />
//               <AccordionDetails>
//                 <Typography sx={{ margin: 2 }}>
//                   Remarks: {diagnosis.remarks}
//                 </Typography>
//                 <Divider />
//                 <Typography sx={{ margin: 2 }}>
//                   Diagnosis Time: {diagnosis.created_at}
//                 </Typography>
//               </AccordionDetails>
//             </Accordion>
//           </div>
//         ))}
//       </Box>
//     </div>
//   );
// }
// function setSearchTerm(input: string) {
//   throw new Error("Function not implemented.");
// }

