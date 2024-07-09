import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { Paper, styled } from '@mui/material';

export default function ChartsOverviewDemo() {

    const medicineNames = [

        "Bupropion",
        "Lamotrigine",
        "Zolpidem",
        "Cephalexin",
        "Ciprofloxacin",

    ];



    return (
            <BarChart
                series={[
                    { data: [3532, 4411, 2433, 3421, 3312] },

                ]}
                xAxis={[{ data: medicineNames, scaleType: 'band' }]}
                width={600}
                height={400}
                margin={{ left: 70 }}
            />
    );
}



          {/* <Grid item xs={8}>

            <Grid sx={{ display: "flex" }}>
              <Item>
                <p>Number of Patients</p>
                <PatientNumber />
              </Item>
              <Item>
                <p>Medicine Consumption</p>
                <MedicineConsumption />
              </Item>
            </Grid>

          </Grid> */}