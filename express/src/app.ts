import express, { Request, Response } from "express";
import * as dotenv from "dotenv";
import process from "process";
import {
  backendDetectionRouter,
  detectionRouter,
  mockDetectionRouter,
} from "./route";
import cors from "cors";

// get dotenv config
dotenv.config();

// the http server - express
const app = express();
const port = parseInt(process.env.PORT ?? "3000");

// middleware and router
app.use(express.json());
app.use(cors());
app.use(process.env.MOCK_API_PREFIX || "/v1", mockDetectionRouter);
app.use(process.env.API_PREFIX || "/v2", detectionRouter);
app.use(process.env.STANDALONE_PREFIX || "/v3", backendDetectionRouter);

// error handler
app.use((err: Error, _: Request, res: Response, _2: any) => {
  console.log(err.constructor.name, _.constructor.name, res.constructor.name);

  // all errors from non-async route above will be handled here
  res.status(500).send(err.message);
});

// bootstrap
app.listen(port, () => {
  console.log(`server is listening on ${port} !!!`);
});
