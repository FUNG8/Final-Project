// hahahahaha
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
    Button,
    styled,
    makeStyles,
    Grid,
} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { useEffect, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import { useNavigate } from "react-router-dom";
import { SearchBar } from "./SearchBar";
import { SendPatient } from "./SendPatient";

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
                
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.5rem' }}>
                        <h2>Patients</h2>
                    </div>
                
            </Box >
            <TableContainer component={Paper} sx={{rowGap: '8px'}}>
                <Table  sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow >
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
                            <TableCell>Queue the Patient</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody sx={{rowGap: '8px'}}>
                        {patients.status === "success" &&
                            (patients as any).patientResult.map((patient: any) => (
                                <TableRow key={patient.id}

                                    style={{
                                        cursor: 'pointer',
                                    }}
                                    sx={{  marginBottom: '8px','&:last-child td, &:last-child th': { border: 0 } }}
                                >

                                    <TableCell onClick={() => navigate(`/doctor/patientDetail/${patient.id}`)}>{patient.id}</TableCell>
                                    <TableCell onClick={() => navigate(`/doctor/patientDetail/${patient.id}`)}>{patient.firstName}</TableCell>
                                    <TableCell onClick={() => navigate(`/doctor/patientDetail/${patient.id}`)}>{patient.lastName}</TableCell>
                                    <TableCell onClick={() => navigate(`/doctor/patientDetail/${patient.id}`)}>{patient.gender}</TableCell>
                                    <TableCell onClick={() => navigate(`/doctor/patientDetail/${patient.id}`)}>{patient.blood}</TableCell>
                                    <TableCell onClick={() => navigate(`/doctor/patientDetail/${patient.id}`)}>{patient.hkid}</TableCell>
                                    <TableCell onClick={() => navigate(`/doctor/patientDetail/${patient.id}`)}>{patient.birth_date}</TableCell>
                                    <TableCell onClick={() => navigate(`/doctor/patientDetail/${patient.id}`)}>{patient.phone_number}</TableCell>
                                    <TableCell onClick={() => navigate(`/doctor/patientDetail/${patient.id}`)}>{patient.emergency_name}</TableCell>
                                    <TableCell onClick={() => navigate(`/doctor/patientDetail/${patient.id}`)}>{patient.emergency_contact}</TableCell>
                                    <TableCell onClick={() => navigate(`/doctor/patientDetail/${patient.id}`)}>{patient.updated_at}</TableCell>
                                    <TableCell onClick={() => navigate(`/doctor/patientDetail/${patient.id}`)}>{patient.created_at}</TableCell>
                                    <TableCell>
                                        <Button sx={{ zIndex: 2 }}
                                            variant="contained"
                                            size="small"
                                            endIcon={<SendIcon />}
                                            onClick={() => SendPatient(patient.id)}
                                        >
                                            Queue
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <div
                style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}
            >
                <Pagination
                    count={(patients as any).totalPages || 1}
                    onChange={handlePageChange}
                />
            </div>
        </div >
    );
}




