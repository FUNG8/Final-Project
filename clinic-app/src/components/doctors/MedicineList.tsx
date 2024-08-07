import { useMedicineInfo } from '../../api/medicineAPI';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Pagination, Zoom } from '@mui/material';
import { SetStateAction, useEffect, useState } from 'react';
import { SearchBar } from './SearchBar';
import InsertMedicineModal from './InsertMedicineForm';
import React from 'react';


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
                                        <TableRow key={medicine.medicine_id}>
                                            <TableCell>{medicine.medicine_id}</TableCell>
                                            <TableCell>{medicine.name}</TableCell>
                                            <TableCell>{medicine.generic_drug}</TableCell>
                                            <TableCell>{medicine.description}</TableCell>
                                            <TableCell>{medicine.dosage}</TableCell>
                                            <TableCell>{medicine.unit_measurement}</TableCell>
                                            <TableCell>{medicine.type}</TableCell>
                                            <TableCell>{medicine.shape}</TableCell>
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
            </Zoom>
            <Zoom in={checked} style={{ transitionDelay: checked ? '400ms' : '0ms' }}>

                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
                    <Pagination count={(medicine as any).totalPages || 1} onChange={handlePageChange} />
                </div>
            </Zoom>
        </div>
    );
}