import { usePatientsInfo } from "../../api/patientAPI";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Tooltip
} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchBar } from "./SearchBar";
import QueueButton from "./QueueButton";

interface Patient {
  id: string;
}

interface QueueButtonProps {
  patient: Patient;
}

export function ListPatients() {
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 20;
  const [searchTerm, setSearchTerm] = useState("");
  const patients = usePatientsInfo(currentPage, perPage, searchTerm);
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentPage(currentPage);
  }, []);

  console.log("currentPage", currentPage);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    console.log(value);
    setCurrentPage(value);
  };

  const handleSearch = (input: string) => {
    console.log("typing");
    console.log("check input", input);
    setSearchTerm(input);
    setCurrentPage(1);
  };

  return (
    <div>
      <div>
        <SearchBar onSearch={handleSearch} />
      </div>
      <Box justifyContent="center" mt={4}>
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "0.5rem",
            }}
          >
            <h2>Patients</h2>
          </div>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Gender</TableCell>
                  <TableCell>Blood Type</TableCell>
                  <TableCell>HKID</TableCell>
                  <TableCell>Birth Date</TableCell>
                  <TableCell>Phone Number</TableCell>
                  <TableCell>Emergency Name</TableCell>
                  <TableCell>Emergency Contact</TableCell>
                  <TableCell>Updated At</TableCell>
                  <TableCell>Created At</TableCell>
                  <TableCell>Queue</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {patients.status === "success" &&
                  (patients as any).patientResult.map((patient: any) => (
                    <Tooltip title="Click to see patient's diagnosis record" >
                    <TableRow
                      key={patient.id}
                      style={{
                        cursor: "pointer",
                      }}
                    >
                      <TableCell
                        onClick={() =>
                          navigate(`/doctor/patientDetail/${patient.id}`)
                        }
                      >
                        {patient.id}
                      </TableCell>
                      <TableCell
                        onClick={() =>
                          navigate(`/doctor/patientDetail/${patient.id}`)
                        }
                      >
                        {patient.firstName}
                      </TableCell>
                      <TableCell
                        onClick={() =>
                          navigate(`/doctor/patientDetail/${patient.id}`)
                        }
                      >
                        {patient.lastName}
                      </TableCell>
                      <TableCell
                        onClick={() =>
                          navigate(`/doctor/patientDetail/${patient.id}`)
                        }
                      >
                        {patient.gender}
                      </TableCell>
                      <TableCell
                        onClick={() =>
                          navigate(`/doctor/patientDetail/${patient.id}`)
                        }
                      >
                        {patient.blood}
                      </TableCell>
                      <TableCell
                        onClick={() =>
                          navigate(`/doctor/patientDetail/${patient.id}`)
                        }
                      >
                        {patient.hkid}
                      </TableCell>
                      <TableCell
                        onClick={() =>
                          navigate(`/doctor/patientDetail/${patient.id}`)
                        }
                      >
                        {patient.birth_date}
                      </TableCell>
                      <TableCell
                        onClick={() =>
                          navigate(`/doctor/patientDetail/${patient.id}`)
                        }
                      >
                        {patient.phone_number}
                      </TableCell>
                      <TableCell
                        onClick={() =>
                          navigate(`/doctor/patientDetail/${patient.id}`)
                        }
                      >
                        {patient.emergency_name}
                      </TableCell>
                      <TableCell
                        onClick={() =>
                          navigate(`/doctor/patientDetail/${patient.id}`)
                        }
                      >
                        {patient.emergency_contact}
                      </TableCell>
                      <TableCell
                        onClick={() =>
                          navigate(`/doctor/patientDetail/${patient.id}`)
                        }
                      >
                        {patient.updated_at}
                      </TableCell>
                      <TableCell
                        onClick={() =>
                          navigate(`/doctor/patientDetail/${patient.id}`)
                        }
                      >
                        {patient.created_at}
                      </TableCell>
                      <TableCell>
                        <QueueButton patientId={patient.id} />
                      </TableCell>
                    </TableRow>
                    </Tooltip>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Box>

      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}
      >
        <Pagination
          count={(patients as any).totalPages || 1}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
}
