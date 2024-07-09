// hahahahaha
import "./Home.scss";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import ConsultTable from "../../components/patients/ConsultingTable";
import { Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Username } from "../../components/patients/Username";
import HomeTable from "../../components/patients/HomeTable";
import MedicineConsumption from "../../components/doctors/MedicineConsumption";
import PatientNumber from "../../components/doctors/PatientNumber";
import { useNumberWaitingList } from "../../api/patientAPI";

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

export default function Home() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    // Handler to call on window resize
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // const Paper = styled(Paper)(({ theme }) => ({
  //   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  //   ...theme.typography.body2,
  //   padding: theme.spacing(1),
  //   textAlign: 'center',
  //   color: theme.palette.text.secondary,
  //   margin: 8
  // }));

  const totalQueue: TotalQueue = useNumberWaitingList()

  return (
    <Grid container justifyContent="center" alignItems="center" height="50vh">
      <Grid item xs={12} >
        <Paper>
          <Username />
        </Paper>
        <Box sx={{ flexGrow: 1 }} marginTop={15}>
          <Grid container spacing={6} justifyContent="center">
            <Grid item xs={6}>
              <Paper>
                <div className="waitingList">
                  <Typography variant="h4" fontWeight="bold">
                    Pending
                  </Typography>
                </div>
                <Paper>
                  <Typography variant="h5" fontWeight="bold">
                    {(totalQueue as any).result?.count}
                  </Typography>
                </Paper>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper>
                <div className="waitingList">
                  <Typography variant="h4" fontWeight="bold">
                    Completed
                  </Typography>
                </div>
                <Paper>
                  <Typography variant="h5" fontWeight="bold">
                    100
                  </Typography>
                </Paper>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper>
                <div className="waitingList">
                  <Typography variant="h4" fontWeight="bold">
                    Consulting
                  </Typography>
                </div>
                <ConsultTable />
              </Paper>
              <Paper>
                <div className="waitingList">
                  <Typography variant="h4" fontWeight="bold">
                    Waiting List
                  </Typography>
                </div>
                <HomeTable />
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <Paper>
        <p>Number of Patients</p>
        <PatientNumber />
      </Paper>
      <Paper>
        <p>Medicine Consumption</p>
        <MedicineConsumption />
      </Paper>
    </Grid >
  );
}
