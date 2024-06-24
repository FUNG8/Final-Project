import express from 'express'
import { pgClient } from './pgCLients';
import { patientRouter } from './controllers/PatientController';
import Knex from 'knex';



const app = express();
var cors = require('cors')
const PORT = 8080;

//knex config
const knexConfig = require("./knexfile");
const knex = Knex(knexConfig[process.env.NODE_ENV || "development"]);


//cors
app.use(cors())

//json
app.use(express.json());


//api
import { DoctorAuthController } from './controllers/DoctorAuthController';
import { DoctorAuthService } from './services/DoctorAuthService';
const doctorAuthService = new DoctorAuthService(knex);
const doctorAuthController = new DoctorAuthController(doctorAuthService);

import { PatientAuthController } from './controllers/PatientAuthController';
import { PatientAuthService } from './services/PatientAuthService';
const patientAuthService = new PatientAuthService(knex);
const patientAuthController = new PatientAuthController(patientAuthService);

import { PatientService } from './services/PatientService';
import { PatientController } from './controllers/PatientController';
const patientSerivice = new PatientService(knex);
const patientController = new PatientController(patientSerivice)

app.use("/doctorAuth", doctorAuthController.router)
app.use("/patientAuth", patientAuthController.router)
app.use("/patients", patientController.router);
// app.use("/medicine", medicineRouter)




app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`)
})