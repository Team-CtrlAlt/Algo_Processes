import cluster from "cluster";
import { cpus } from "os";
import "dotenv/config";
import { Server as SocketServer } from "socket.io";
const numCPUs = cpus().length;
import { Server as HTTPServer, createServer } from "http";
import express, { NextFunction, Request, Response, ErrorRequestHandler } from "express";

import CronJobs from "./cron/index.cron";
import { InfoMessages } from "./constants";
import { ServerInterface } from "./interfaces/server.interface";
import bodyParser from "body-parser";
import { config } from "./config/config";

class Server implements ServerInterface {
  public app: express.Application;

  constructor() {
    this.startCronJobs();
  }
  public startCronJobs() {
    new CronJobs();
  }
}

new Server();
