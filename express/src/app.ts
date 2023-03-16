import express from "express";
import * as dotenv from 'dotenv';
import process from 'process';
import { detectionRouter } from "./route";
import cors from 'cors';

// get dotenv config
dotenv.config()

const app = express();
const port = parseInt(process.env.PORT ?? '3000');

// middleware and router
app.use(express.json());
app.use(cors());
app.use(process.env.API_PREFIX || '/v1', detectionRouter);

// bootstrap
app.listen(port, () => {
    console.log(`server is listening on ${port} !!!`);
});
