import express from 'express';
import route from './routes/pedidos.routes.js';
import { promises as fs } from 'fs';
import winston, { loggers } from 'winston';

const { readFile, writeFile } = fs;

const app = express();

const { combine, timestamp, label, printf } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message} `;
});
global.logger = winston.createLogger({
  level: 'silly',
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'delivery-api.log' }),
  ],
  format: combine(label({ label: 'delivery-api' }), timestamp(), myFormat),
});

app.use(express.json());
app.use(route);

app.listen(5000, async () => {
  try {
    console.log('Api Started!');
    await readFile('./pedidos.json');
    global.logger.info('Api Started!');
  } catch (err) {
    const initialJson = {
      nextId: 501,
      pedidos: [],
    };
  }
});
