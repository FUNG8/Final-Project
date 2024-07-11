import { Box, Container } from "@mui/material";
// import ticket from "../../image/ticket.jpg"
import PatientBanner from "../../components/patients/PatientBanner";
import { usePatientTicketNumber } from "../../api/patientAPI";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

export default function TicketNumber() {
    const hkid = (jwtDecode(localStorage.getItem("patientToken")!) as any).hkid


    const PatientTicketNumber = usePatientTicketNumber(hkid)
    console.log("this is the patient ticket Number", (PatientTicketNumber as any).result?.ticket_number)

    return (
        <div className="app">
            <PatientBanner />
            <Container sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Box
                    height={200}
                    width={350}
                    borderRadius={1}
                    my={4}
                    fontSize={20}
                    fontFamily="monospace"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    gap={8}
                    p={2}
                    sx={{ border: '3px solid grey' }}
                >
                    Your Ticket Number
                    <Container sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 19,
                        height: 100,
                        fontFamily: "monospace",
                        borderLeftStyle: 'dashed'
                    }}>
                        {((PatientTicketNumber as any).result?.status === 'completed' || (PatientTicketNumber as any).result?.status === 'consulting')
                            ? (PatientTicketNumber as any).result?.status
                            : (PatientTicketNumber as any).result?.ticket_number
                        }

                    </Container>
                </Box>
            </Container>
        </div>
    );
}
