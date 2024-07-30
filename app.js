import appController from './/controllers/appController.js';
import express from "express";
import cors from "cors";

const port = 8080;
const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!')
  })

app.post('/gpt', appController.post);

import jwt from "jsonwebtoken";
const secret = "JIs%WCfS#Sl454d5FX";



app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`)
  })

console.log("hi")