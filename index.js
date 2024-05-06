import express from 'express';
import route from './routes/pedidos.routes.js';

const app = express();
app.use(express.json());
app.use(route);

app.listen(3000, (req, res) => {
  console.log('Api Started!');
});
