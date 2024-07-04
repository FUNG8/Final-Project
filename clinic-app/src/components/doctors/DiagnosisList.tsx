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
} from "@mui/material";
import { SetStateAction, useEffect, useState } from "react";
import { SearchBar } from "./SearchBar";
import { useShowDiagnosis } from "../../api/diagnosisAPI";
import { useParams } from "react-router-dom";

interface Diagnosis {
    id: string;
    name: string;
  }
  
  interface DiagnosisResponse {
    status: string;
    diagnosisResult?: Diagnosis[];
  }

export function ListDiagnosis() {
  let {patientId} = useParams();
  const diagnosis: DiagnosisResponse | null = useShowDiagnosis(parseInt(patientId!));


  return (
    <div>
      <Box justifyContent="center" mt={4}>
        {diagnosis?.status === "success" && diagnosis.diagnosisResult?.map((diagnosis) => (
          <div key={diagnosis.id}>
            {diagnosis.name}
          </div>
        ))}
      </Box>
    </div>
  );
}
function setSearchTerm(input: string) {
  throw new Error("Function not implemented.");
}
