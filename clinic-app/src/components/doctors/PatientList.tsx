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
  Tooltip,
  Zoom,
} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchBar } from "./SearchBar";
import QueueButton from "./QueueButton";
import React from "react";

interface Patient {
  id: string;
}

interface QueueButtonProps {
  patient: Patient;
}

export function ListPatients() {
  const [createdTime, setCreatedTime] = useState<string>('');

  useEffect(() => {
    const formatDate = (date: Date) => {
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();

      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const seconds = String(date.getSeconds()).padStart(2, "0");

      return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    };

    const currentTime = formatDate(new Date());
    setCreatedTime(currentTime);
  }, []);

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
  const [checked, setChecked] = React.useState(false);
  
  useEffect(() => {
    setChecked(true)
  });

  return (
    <div>
      <Zoom in={checked} style={{ transitionDelay: checked ? '200ms' : '0ms' }}>
        <div>
          <SearchBar onSearch={handleSearch} />
        </div>
      </Zoom>
      <Zoom in={checked} style={{ transitionDelay: checked ? '300ms' : '0ms' }}>
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
                      <Tooltip placement={"top"} title="Click to see patient's diagnosis record">
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
      </Zoom>
      <Zoom in={checked} style={{ transitionDelay: checked ? '400ms' : '0ms' }}>
        <div
          style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}
        >
          <Pagination
            count={(patients as any).totalPages || 1}
            onChange={handlePageChange}
          />
        </div>
      </Zoom>
    </div>
  );
}
