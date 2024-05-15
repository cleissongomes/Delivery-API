import express from 'express';
import route from './routes/pedidos.routes.js';
import { promises as fs } from 'fs';

const { readFile, writeFile } = fs;

const app = express();
app.use(express.json());
app.use(route);

app.listen(5000, async () => {
  try {
    console.log('Api Started!');
    await readFile('./pedidos.json');
  } catch (err) {
    const initialJson = {
      nextId: 501,
      pedidos: [],
    };
  }
});
