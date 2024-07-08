import express from 'express'
import { pgClient } from './pgCLients';
import Knex from 'knex';
import dotenv from "dotenv"
dotenv.config()


const app = express();
var cors = require('cors')
const PORT = 8080;

//knex config
const knexConfig = require("./knexfile");
console.log("check node env",process.env.NODE_ENV)
const knex = Knex(knexConfig[process.env.NODE_ENV || "development"]);
console.log(knexConfig[process.env.NODE_ENV || "development"])

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

import { PatientService } from './services/patientService';
import { PatientController } from './controllers/patientController';

const patientSerivice = new PatientService(knex);
const patientController = new PatientController(patientSerivice)

import { MedicineService } from './services/MedicineService';
import { MedicineController } from './controllers/MedicineController';
const medicineService = new MedicineService(knex);
const medicineController = new MedicineController(medicineService);

import { PatientProfileService } from './services/patientProfileService';
import { PatientProfileController } from './controllers/patientProfileController';
const patientProfileService = new PatientProfileService(knex);
const patientProfileController = new PatientProfileController(patientProfileService)

import { PatientDiagnosisService } from './services/patientDiagnosisService';
import { PatientDiagnosisController } from './controllers/patientDiagnosisController';
const patientDiagnosisService = new PatientDiagnosisService(knex);
const patientDiagnosisController = new PatientDiagnosisController(patientDiagnosisService)



import { DiagnosisController } from './controllers/DiagnosisController';
import { DiagnosisService } from './services/DiagnosisService';
const diagnosisService = new DiagnosisService(knex);
const diagnosisController = new DiagnosisController(diagnosisService);


app.get("/hi", (req, res) => {
    res.send("bye")
})
app.use("/doctorAuth", doctorAuthController.router)
app.use("/patientAuth", patientAuthController.router)
app.use("/patients", patientController.router);
app.use("/medicines", medicineController.router)
app.use("/patientProfile", patientProfileController.router)
// app.use("/drugShape",drugShapeController.router)
app.use("/diagnosis", diagnosisController.router)






app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})