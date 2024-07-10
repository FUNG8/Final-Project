import { Box, Container, Grid } from "@mui/material";
import ticket from "../../image/ticket.jpg"
import PatientBanner from "../../components/patients/PatientBanner";

export default function TicketNumber() {



    return (
        <div className="app">
            <PatientBanner />
        <Container sx={{display:"flex", alignItems:"center", justifyContent:"center"}}>

            <Box
                height={200}
                width={300}
                borderRadius={1}
                my={4}
                fontSize={20}
                fontFamily="monospace"
                display="flex"
                alignItems="center"
                justifyContent="center"
                
                gap={8}
                p={2}
                sx={{ border: '3px solid grey' }}>
                    Your Ticket Number  
                <Container sx={{display:"flex", alignItems:"center", justifyContent:"center",fontSize: 50, height: 100, weight: 500, fontFamily:"monospace",borderLeftStyle: 'dashed'}}>10</Container>    
            </Box>
        </Container>
        </div>
    );
}
