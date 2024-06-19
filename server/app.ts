import express from 'express'
import { pgClient } from './pgCLients';
import { patientRouter } from './router/patient';

const app = express();
var cors = require('cors')
const PORT = 8080;

app.get('/', function (req, res) {
  res.send('Hello World')
})

//cors
app.use(cors())

//api
app.use("/router", patientRouter);


app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`)
})