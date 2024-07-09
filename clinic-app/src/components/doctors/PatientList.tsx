
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
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.5rem' }}>
                        <h2>Patients</h2>
                    </div>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <Grid>
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
                                    </TableRow>
                                </Grid>
                            </TableHead>

                            <TableBody>
                                {patients.status === "success" &&
                                    (patients as any).patientResult.map((patient: any) => (
                                        <Grid>
                                            <TableRow
                                                key={patient.id}
                                                onClick={() => navigate(`/doctor/patientDetail/${patient.id}`)}
                                                style={{
                                                    cursor: 'pointer',
                                                }}
                                            >
                                                <TableCell>{patient.id}</TableCell>
                                                <TableCell>{patient.firstName}</TableCell>
                                                <TableCell>{patient.lastName}</TableCell>
                                                <TableCell>{patient.gender}</TableCell>
                                                <TableCell>{patient.blood}</TableCell>
                                                <TableCell>{patient.hkid}</TableCell>
                                                <TableCell>{patient.birth_date}</TableCell>
                                                <TableCell>{patient.phone_number}</TableCell>
                                                <TableCell>{patient.emergency_name}</TableCell>
                                                <TableCell>{patient.emergency_contact}</TableCell>
                                                <TableCell>{patient.updated_at}</TableCell>
                                                <TableCell>{patient.created_at}</TableCell>
                                            </TableRow>

                                            <Grid>
                                                <TableCell>
                                                    <QueueButton patientId={patient.id} />
                                                </TableCell>
                                            </Grid>
                                        </Grid>
                                    ))}


                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </Box >

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

