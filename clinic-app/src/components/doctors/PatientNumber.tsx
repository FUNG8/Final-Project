import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { Paper, styled } from '@mui/material';

const years = [
  new Date(2020, 0, 1),
  new Date(2020, 1, 1),
  new Date(2020, 2, 1),
  new Date(2020, 3, 1),
  new Date(2020, 4, 1),
  new Date(2020, 5, 1),
  new Date(2020, 6, 1),
  new Date(2020, 7, 1),
  new Date(2020, 8, 1),
  new Date(2020, 9, 1),
  new Date(2020, 10, 1),
  new Date(2020, 11, 1),
];

const Doctor1PatientNumber = [
    Math.floor(Math.random() * 500) + 1500,
    Math.floor(Math.random() * 500) + 1500,
    Math.floor(Math.random() * 500) + 1500,
    Math.floor(Math.random() * 500) + 1500,
    Math.floor(Math.random() * 500) + 1500,
    Math.floor(Math.random() * 500) + 1500,
    Math.floor(Math.random() * 500) + 1500,
    Math.floor(Math.random() * 500) + 1500,
    Math.floor(Math.random() * 500) + 1500,
    Math.floor(Math.random() * 500) + 1500,
    Math.floor(Math.random() * 500) + 1500,
    Math.floor(Math.random() * 500) + 1500,
  ];
  
  const Doctor2PatientNumber = [
    Math.floor(Math.random() * 500) + 1450,
    Math.floor(Math.random() * 500) + 1450,
    Math.floor(Math.random() * 500) + 1450,
    Math.floor(Math.random() * 500) + 1450,
    Math.floor(Math.random() * 500) + 1450,
    Math.floor(Math.random() * 500) + 1450,
    Math.floor(Math.random() * 500) + 1450,
    Math.floor(Math.random() * 500) + 1450,
    Math.floor(Math.random() * 500) + 1450,
    Math.floor(Math.random() * 500) + 1450,
    Math.floor(Math.random() * 500) + 1450,
    Math.floor(Math.random() * 500) + 1450,
  ];
  
  const Doctor3PatientNumber = [
    Math.floor(Math.random() * 500) + 1400,
    Math.floor(Math.random() * 500) + 1400,
    Math.floor(Math.random() * 500) + 1400,
    Math.floor(Math.random() * 500) + 1400,
    Math.floor(Math.random() * 500) + 1400,
    Math.floor(Math.random() * 500) + 1400,
    Math.floor(Math.random() * 500) + 1400,
    Math.floor(Math.random() * 500) + 1400,
    Math.floor(Math.random() * 500) + 1400,
    Math.floor(Math.random() * 500) + 1400,
    Math.floor(Math.random() * 500) + 1400,
    Math.floor(Math.random() * 500) + 1400,
  ];

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    color: theme.palette.text.secondary,
    height: 60,
    lineHeight: '60px',
  }));

export default function PatientNumber() {
  return (
    <LineChart
      xAxis={[
        {
          id: 'Months',
          data: years,
          scaleType: 'time',
          valueFormatter: (date) => new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date),
        },
      ]}
      
      series={[
        {
          id: 'Doctor1',
          label: 'Doctor 1 Patients',
          data: Doctor1PatientNumber,
          stack: 'total',
          area: true,
          showMark: false,
        },
        {
          id: 'Doctor2',
          label: 'Doctor 2 Patients',
          data: Doctor2PatientNumber,
          stack: 'total',
          area: true,
          showMark: false,
        },
        {
          id: 'Doctor3',
          label: 'Doctor 3 Patients',
          data: Doctor3PatientNumber,
          stack: 'total',
          area: true,
          showMark: false,
        },
      ]}
      width={600}
      height={400}
      margin={{ left: 70 }}
      
    />
  );
}