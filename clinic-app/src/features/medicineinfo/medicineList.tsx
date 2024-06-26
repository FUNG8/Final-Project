import { useMedicineInfo } from "./medicineAPI";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Pagination } from '@mui/material';
import { SetStateAction, useEffect, useState } from 'react';
import { SearchBar } from "../../components/searchBar";

export function ListMedicine() {
    const [currentPage, setCurrentPage] = useState(1);
    const perPage = 20;
    const [searchTerm, setSearchTerm] = useState('');
    const medicine = useMedicineInfo(currentPage, perPage, searchTerm)

    useEffect(() => {
        setCurrentPage(currentPage);
    }, []);

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        console.log(value)
        setCurrentPage(value);
    };

    const handleSearch = (input: string) => {
        console.log("typing")
        console.log("check input", input)
        setSearchTerm(input);
    };


    return (
        <div>
            <div>
                <SearchBar onSearch={handleSearch} />
            </div>
            <Box justifyContent="center" mt={4}>
                <div>
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.5rem' }}>
                        <h2>Medicine</h2>
                    </div>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Medicine Name</TableCell>
                                    <TableCell>Generic Drug</TableCell>
                                    <TableCell>Description</TableCell>
                                    <TableCell>Dosage</TableCell>
                                    <TableCell>Unit Measurement</TableCell>
                                    <TableCell>Type</TableCell>
                                    <TableCell>Drug Shape</TableCell>
                                    <TableCell>Color</TableCell>
                                    <TableCell>Updated At</TableCell>
                                    <TableCell>Created At</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {medicine && medicine.status === "success" && (medicine as any).medicineResult?.map((medicine: any) => (
                                    <TableRow key={medicine.id}>
                                        <TableCell>{medicine.id}</TableCell>
                                        <TableCell>{medicine.name}</TableCell>
                                        <TableCell>{medicine.generic_drug}</TableCell>
                                        <TableCell>{medicine.description}</TableCell>
                                        <TableCell>{medicine.dosage}</TableCell>
                                        <TableCell>{medicine.unit_measurement}</TableCell>
                                        <TableCell>{medicine.type}</TableCell>
                                        <TableCell>{medicine.drug_shape_id}</TableCell>
                                        <TableCell>{medicine.color}</TableCell>
                                        <TableCell>{medicine.updated_at}</TableCell>
                                        <TableCell>{medicine.created_at}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </Box>

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
                <Pagination count={(medicine as any).totalPages || 1} onChange={handlePageChange} />
            </div>
        </div>
    );
}
