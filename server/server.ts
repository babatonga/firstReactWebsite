import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import {sequelize} from './app/database/sequelize';
import cors from "cors";

import { authRouter } from './app/models/account'

dotenv.config();

const app: Express = express();
const port = process.env.SERVER_PORT || 8000;
(async () => {

  await sequelize.sync();
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  });
  

})();
app.use(express.json());
app.use(cors());
app.use(authRouter)
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World From the Typescript Server!')
});

