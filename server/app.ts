import express from 'express'
import { pgClient } from './pgCLients';
import { patientRouter } from './patients/patient';
import { accountRouter } from './accounts/accountRouter';
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


app.use("/patients", patientRouter);
app.use("/doctorAuth", doctorAuthController.router)
app.use("/patientAuth", patientAuthController.router)



app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`)
})