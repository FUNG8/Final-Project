import express from "express";
import Knex from "knex";
import dotenv from "dotenv";
dotenv.config();

const app = express();
var cors = require("cors");
const PORT = 8080;

const environment = process.env.NODE_ENV || "development";

console.log("Environment Variables:");
console.log("DB_NAME:", process.env.DB_NAME);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD);
console.log("POSTGRES_DB:", process.env.POSTGRES_DB);
console.log("POSTGRES_USER:", process.env.POSTGRES_USER);
console.log("POSTGRES_PASSWORD:", process.env.POSTGRES_PASSWORD);
console.log("POSTGRES_HOST:", process.env.POSTGRES_HOST);
console.log(`Running in environment: ${environment}`);

//knex config
const knexConfig = require("./knexfile");
const knex = Knex(knexConfig[environment]);
// console.log(knexConfig[environment]);

knex
  .raw("SELECT 1")
  .then((result) => {
    console.log("Database connection successful:", result);
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });

//cors
app.use(cors());

//json
app.use(express.json());

//api
import { DoctorAuthController } from "./controllers/DoctorAuthController";
import { DoctorAuthService } from "./services/DoctorAuthService";
const doctorAuthService = new DoctorAuthService(knex);
const doctorAuthController = new DoctorAuthController(doctorAuthService);

import { PatientAuthController } from "./controllers/PatientAuthController";
import { PatientAuthService } from "./services/PatientAuthService";
const patientAuthService = new PatientAuthService(knex);
const patientAuthController = new PatientAuthController(patientAuthService);

import { PatientService } from "./services/patientService";
import { PatientController } from "./controllers/patientController";

const patientSerivice = new PatientService(knex);
const patientController = new PatientController(patientSerivice);

import { MedicineService } from "./services/MedicineService";
import { MedicineController } from "./controllers/MedicineController";
const medicineService = new MedicineService(knex);
const medicineController = new MedicineController(medicineService);

import { PatientProfileService } from "./services/patientProfileService";
import { PatientProfileController } from "./controllers/patientProfileController";
const patientProfileService = new PatientProfileService(knex);
const patientProfileController = new PatientProfileController(
  patientProfileService
);

import { PatientDiagnosisService } from "./services/patientDiagnosisService";
import { PatientDiagnosisController } from "./controllers/patientDiagnosisController";
const patientDiagnosisService = new PatientDiagnosisService(knex);
const patientDiagnosisController = new PatientDiagnosisController(
  patientDiagnosisService
);

import { DiagnosisController } from "./controllers/DiagnosisController";
import { DiagnosisService } from "./services/DiagnosisService";
const diagnosisService = new DiagnosisService(knex);
const diagnosisController = new DiagnosisController(diagnosisService);

app.get("/hi", (req, res) => {
  res.send("bye");
});
app.use("/doctorAuth", doctorAuthController.router);
app.use("/patientAuth", patientAuthController.router);
app.use("/patients", patientController.router);
app.use("/medicines", medicineController.router);
app.use("/patientProfile", patientProfileController.router);
// app.use("/drugShape",drugShapeController.router)
app.use("/diagnosis", diagnosisController.router);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
