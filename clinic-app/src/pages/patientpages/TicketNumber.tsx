import { Box, Container } from "@mui/material";
// import ticket from "../../image/ticket.jpg"
import PatientBanner from "../../components/patients/PatientBanner";
import { usePatientTicketNumber } from "../../api/patientAPI";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

export default function TicketNumber() {
    const hkid = (jwtDecode(localStorage.getItem("patientToken")!) as any).hkid


    const PatientTicketNumber = usePatientTicketNumber(hkid)
    console.log("this is the patient ticket Number", (PatientTicketNumber as any))

    const [createdTime, setCreatedTime] = useState<string>('');

    useEffect(() => {
        const formatDate = (date: Date) => {
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0'); 
            const year = date.getFullYear();

            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            const seconds = String(date.getSeconds()).padStart(2, '0');

            return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
        };

        const currentTime = formatDate(new Date());
        setCreatedTime(currentTime);
    }, []);

    return (
        <div className="app">
            <PatientBanner />
            <div> Remaining Tickets:
                {(PatientTicketNumber as any).result?.queue_position}
            </div>

            <div>
                <p>Created Time: {createdTime}</p>
            </div>
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
