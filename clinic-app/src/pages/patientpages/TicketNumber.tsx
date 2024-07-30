import { Box, Container, Grid } from "@mui/material";
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
        
              <Grid
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  fontSize: 30,
                  fontWeight: "bold",
                  alignContent: "center"
                }}
              >
                Your Position: {(PatientTicketNumber as any).result?.queue_position}
              </Grid>
        
              <Container
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                //   minHeight: "100vh"
                }}
              >
                <Box
                  sx={{
                    height: 200,
                    width: '100%',
                    maxWidth: 400,
                    padding: 2,
                    borderRadius: 1,
                    my: 4,
                    fontSize: 20,
                    fontFamily: "monospace",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 2,
                    border: '3px solid grey',
                    flexDirection: 'row'
                  }}
                >
                  <Grid sx={{ width: '40%', textAlign: 'left' }}>
                    Your Ticket Number
                  </Grid>
        
                  <Grid
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 30,
                      width: '60%',
                      height: 100,
                      fontFamily: "monospace",
                      borderLeftStyle: 'dashed',
                      paddingLeft: 2,
                      textAlign: 'center'
                    }}
                  >
                    {((PatientTicketNumber as any).result?.status === 'completed' || (PatientTicketNumber as any).result?.status === 'consulting')
                      ? (PatientTicketNumber as any).result?.status
                      : (PatientTicketNumber as any).result?.ticket_number
                    }
                  </Grid>
                </Box>
                <Grid sx={{ position: "relative", top: 20, fontSize: 15, whiteSpace: "nowrap" }}>
                  Created Time: {createdTime}
                </Grid>
              </Container>
            </div>
          );
        };
        
        

