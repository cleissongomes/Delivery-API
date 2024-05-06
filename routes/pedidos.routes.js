import express from 'express';
import { promises } from 'fs';
const route = express.Router();

const { readFile, writeFile } = 'fs';

route.post('/pedidos', async (req, res) => {
  try {
    let pedidos = req.body;
    const data = JSON.parce(await readFile('pedidos.json'));

    if (!pedidos.cliente || typeof pedidos.cliente !== 'string') {
      res
        .status(400)
        .send({ error: 'O campo cliente precisa ser preenchido.' });
    }
    if (!pedidos.produto || typeof pedidos.produto !== 'string') {
      res
        .status(400)
        .send({ error: 'O campo pedidos precisa ser preenchido.' });
    }
    if (!pedidos.valor || typeof pedidos.valor !== 'number') {
      res.status(400).send({ error: 'O campo valor precisa ser preenchido.' });
    }
    if (!pedidos.entregue || typeof pedidos.entregue !== 'string') {
      res
        .status(400)
        .send({ error: 'O campo entregue precisa ser preenchido.' });
    }

    let timeStamp = new Date();
    pedidos.timeStamp = timeStamp;

    pedidos = { id: data.nextId++, ...pedidos };
    data.pedidos.push(pedidos);

    await writeFile('pedidos.json', JSON.stringify(data));

    res.send(pedidos);
  } catch (err) {
    console.log(err);
  }
});

export default route;
