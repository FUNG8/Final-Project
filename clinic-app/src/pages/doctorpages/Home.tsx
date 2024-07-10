// hahahahaha
import "./Home.scss";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import ConsultTable from "../../components/patients/ConsultingTable";
import { Card, Container, Divider, Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Username } from "../../components/patients/Username";
import MedicineConsumption from "../../components/doctors/MedicineConsumption";
import PatientNumber from "../../components/doctors/PatientNumber";
import { useCompletedPatientNumber, useNumberWaitingList } from "../../api/patientAPI";
import WaitingList from "../../components/patients/WaitingList";
import { StyledToggle } from "../../components/global/StyledToogle";

const icon = (
  <Paper sx={{ m: 1, width: 100, height: 100 }} elevation={4}>
    <svg>
      <Box
        component="polygon"
        points="0,100 50,00, 100,100"
        sx={{
          fill: (theme) => theme.palette.common.white,
          stroke: (theme) => theme.palette.divider,
          strokeWidth: 1,
        }}
      />
    </svg>
  </Paper>
);

interface TotalQueue {
  status: string
  result?: string[]
}

interface CompletedQueue {
  status: string
  result?: string[]
}

export default function Home() {
  // const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // useEffect(() => {
  //   const handleResize = () => {
  //     setWindowWidth(window.innerWidth);
  //   };

  // window.addEventListener("resize", handleResize);

  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);

  const totalQueue: TotalQueue = useNumberWaitingList()
  const completedQueue: CompletedQueue = useCompletedPatientNumber()
  console.log("this is completed Queue number", completedQueue)

  return (
    <Container maxWidth="xl">

    <Grid mb={5} container  justifyContent="center" alignItems="center" >

      <Grid my={5}>
        <Username />
      </Grid>

      {/* ------------------------------------- pending complete consulting waitinglist ------------------------------------- */}

      <Grid container spacing={2} mx={5} justifyContent="center">

        {/* ------------------------------------- pending------------------------------------- */}
        <Grid item xs={6}>
          <Paper sx={{ display: "flex", justifyContent: "center", padding: 2 }}>
            <Grid xs={6} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <Typography variant="h4" fontWeight="bold" >
                Pending
              </Typography>
            </Grid>
            <Divider orientation="vertical" flexItem />
            <Grid xs={6} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>

              <Typography variant="h5" fontWeight="bold">
                {(totalQueue as any).result?.count}
              </Typography>
            </Grid>

          </Paper>
        </Grid>
        {/* ------------------------------------- completed------------------------------------- */}

        <Grid item xs={6} spacing={5}>
          <Paper sx={{ display: "flex", justifyContent: "center", padding: 2 }}>
            <Grid xs={6} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <Typography variant="h4" fontWeight="bold">
                Completed
              </Typography>
            </Grid>

            <Divider orientation="vertical" flexItem />
            <Grid xs={6} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>

              <Typography variant="h5" fontWeight="bold">
                {(completedQueue as any).result?.count}
              </Typography>
            </Grid>

          </Paper>
        </Grid>

        {/* ------------------------------------- consulting ------------------------------------- */}


        <Grid item xs={12} spacing={5}>
          <Grid sx={{ display: "flex", justifyContent: "center", padding: 2 }}>


            <Typography variant="h4" fontWeight="bold">
              Consulting
            </Typography>
          </Grid>
          <ConsultTable />

        </Grid>
        {/* ------------------------------------- waiting list------------------------------------- */}

        <Grid item xs={12} spacing={5}>
          <Grid sx={{ display: "flex", justifyContent: "center", padding: 2 }}>
          
            <Typography variant="h4" fontWeight="bold">
              Waiting List
            </Typography>
          </Grid>
          <WaitingList />

        </Grid>
        {/* ------------------------------------- graphs------------------------------------- */}

        <Grid item xs={6} spacing={5} justifyContent="center" alignItems="center">
          <Card sx={{ justifyContent: "center", alignItems: "center", padding: 2 }}>
            <h2 >Number of Patients</h2>
          <PatientNumber />

          </Card>

        </Grid>
        <Grid item xs={6} spacing={5} justifyContent="center" alignItems="center">
          <Card sx={{ justifyContent: "center", alignItems: "center", padding: 2 }}>

            <h2 >Medicine Consumption</h2>
            <MedicineConsumption />
          </Card>
          

        </Grid>
      </Grid>
    </Grid >
    </Container>
  );
}
