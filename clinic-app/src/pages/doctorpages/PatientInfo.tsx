
import { Box, FormControlLabel, Paper, Slide, Switch } from "@mui/material";
import { ShowPatientInfo } from "../../components/doctors/ShowPatientInfo";
import { useState } from "react";
import React from "react";

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

export default function Medicine() {
  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };
  return (
    <div className="App">
      
      <ShowPatientInfo />
      <Box
        sx={{
          height: 180,
          width: 130,
          position: 'relative',
          zIndex: 1,
        }}
      >
        <FormControlLabel
          control={<Switch checked={checked} onChange={handleChange} />}
          label="Show"
        />
        <Slide direction="up" in={checked} mountOnEnter unmountOnExit>
          {icon}
        </Slide>
      </Box>
    </div>
  );
}
