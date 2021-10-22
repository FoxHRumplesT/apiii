import "reflect-metadata";
import { createConnection } from 'typeorm';
import * as indexRoutes from './routes';

const express = require('express');
const cors = require('cors');

createConnection()
    .then(async (connection) => (connection))
    .catch((error) => console.error(error));

export const app = express();
app.use(cors({ credentials: true }));
app.use('/', indexRoutes);

const server = app.listen(process.env.PORT, () => {
  console.info(`Run project in port ${process.env.PORT}`);
});
