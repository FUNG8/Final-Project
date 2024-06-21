import express from 'express'
import { pgClient } from './pgCLients';
import { patientRouter } from './patients/patient';
import { accountRouter } from './accounts/accountRouter';

const app = express();
var cors = require('cors')
const PORT = 8080;

app.get('/', function (req, res) {
  res.send('Hello World')
})

//cors
app.use(cors())

//api
app.use("/patients", patientRouter);
app.use("/accounts", accountRouter)


app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`)
})