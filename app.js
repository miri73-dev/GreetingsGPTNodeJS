import appController from './/controllers/appController.js';
import express from "express";
import cors from "cors";

const app = express()

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!')
  })

app.post('/gpt', appController.post);

import jwt from "jsonwebtoken";
const secret = "JIs%WCfS#Sl454d5FX";



app.listen(process.env.PORT, () => {
    console.log(`Example app listening on http://localhost:8080`)
  })

console.log("hi")