// hahahahaha
import "./Home.scss";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import ConsultTable from "../../components/patients/ConsultingTable";
import {
  Card,
  Container,
  Divider,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { Username } from "../../components/patients/Username";
import MedicineConsumption from "../../components/doctors/MedicineConsumption";
import PatientNumber from "../../components/doctors/PatientNumber";
import {
  useCompletedPatientNumber,
  useNumberWaitingList,
} from "../../api/patientAPI";
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
  status: string;
  result?: string[];
}

interface CompletedQueue {
  status: string;
  result?: string[];
}

export default function Home() {
  const totalQueue: TotalQueue = useNumberWaitingList();
  const completedQueue: CompletedQueue = useCompletedPatientNumber();
  console.log("this is completed Queue number", (totalQueue as any).result);

  return (
    <Container maxWidth="xl">
      <Grid mb={5} container justifyContent="center" alignItems="center">
        <Grid my={5}>
          <Username />
        </Grid>

        {/* ------------------------------------- pending complete consulting waitinglist ------------------------------------- */}

        <Grid container spacing={2} mx={5} justifyContent="center">
          {/* ------------------------------------- pending------------------------------------- */}
          <Tooltip title="Number of Pending Patients">
            <Grid item xs={6}>
              <Paper
                sx={{ display: "flex", justifyContent: "center", padding: 2 }}
              >
                <Grid
                  xs={6}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h4" fontWeight="bold">
                    Pending
                  </Typography>
                </Grid>
                <Divider orientation="vertical" flexItem />
                <Grid
                  xs={6}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h5" fontWeight="bold">
                    {(totalQueue as any).result?.count}
                  </Typography>
                </Grid>
              </Paper>
            </Grid>
          </Tooltip>
          {/* ------------------------------------- completed------------------------------------- */}
          <Tooltip title="Number of Completed Patients">
            <Grid item xs={6} spacing={5}>
              <Paper
                sx={{ display: "flex", justifyContent: "center", padding: 2 }}
              >
                <Grid
                  xs={6}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h4" fontWeight="bold">
                    Completed
                  </Typography>
                </Grid>

                <Divider orientation="vertical" flexItem />
                <Grid
                  xs={6}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h5" fontWeight="bold">
                    {(completedQueue as any).result?.count}
                  </Typography>
                </Grid>
              </Paper>
            </Grid>
          </Tooltip>
          {/* ------------------------------------- consulting ------------------------------------- */}
          <Tooltip title="Patients Consulting">
            <Grid item xs={12} spacing={5}>
              <Grid
                sx={{ display: "flex", justifyContent: "center", padding: 2 }}
              >
                <Typography variant="h4" fontWeight="bold">
                  Consulting
                </Typography>
              </Grid>
              <ConsultTable />
            </Grid>
          </Tooltip>
          {/* ------------------------------------- waiting list------------------------------------- */}
          <Tooltip title="Patients Waiting List">
            <Grid item xs={12} spacing={5}>
              <Grid
                sx={{ display: "flex", justifyContent: "center", padding: 2 }}
              >
                <Typography variant="h4" fontWeight="bold">
                  Waiting List
                </Typography>
              </Grid>
              <WaitingList />
            </Grid>
          </Tooltip>
          {/* ------------------------------------- graphs------------------------------------- */}

          <Grid
            item
            xs={6}
            spacing={5}
            justifyContent="center"
            alignItems="center"
          >
            <Card
              sx={{
                justifyContent: "center",
                alignItems: "center",
                padding: 2,
              }}
            >
              <h2>Number of Patients This Year</h2>
              <PatientNumber />
            </Card>
          </Grid>
          <Grid
            item
            xs={6}
            spacing={5}
            justifyContent="center"
            alignItems="center"
          >
            <Card
              sx={{
                justifyContent: "center",
                alignItems: "center",
                padding: 2,
              }}
            >
              <h2>Medicine Consumption</h2>
              <MedicineConsumption />
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
