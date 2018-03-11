import 'reflect-metadata';
import './config/config';

import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';

import { connectDB } from './db/db';

import { setUpRoutes } from './routes/routes';

export async function setupServer() {
  await connectDB();

  const app = express();
  const port = process.env.PORT;
  const originUrl = process.env.TODO_APP_URL;

  app.use(
    cors({
      origin: originUrl,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      preflightContinue: false,
      optionsSuccessStatus: 204
    })
  );

  app.use(bodyParser.json());

  app.get('/', (_, res) => {
    res.send('Welcome to Node Todo App.');
  });

  setUpRoutes(app);

  app.listen(port, () => console.log(`Started on port ${port}`));

  return app
}

setupServer().catch(console.error);
