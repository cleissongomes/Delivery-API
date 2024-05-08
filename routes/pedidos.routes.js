import { time } from 'console';
import express from 'express';
import { promises as fs } from 'fs';
const route = express.Router();

const { readFile, writeFile } = fs;

route.post('/pedidos', async (req, res) => {
  try {
    let pedidos = req.body;
    const data = JSON.parse(await readFile('pedidos.json'));

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

route.put('/pedidos', async (req, res) => {
  try {
    let pedidos = req.body;
    const data = JSON.parse(await readFile('pedidos.json'));
    const index = data.pedidos.findIndex(a => a.id === pedidos.id);

    data.pedidos[index] = pedidos;

    if (!pedidos.cliente || typeof pedidos.cliente !== 'string') {
      res
        .status(400)
        .send({ error: 'O campo cliente precisa ser preenchido.' });
    }

    if (!pedidos.produto || typeof pedidos.produto !== 'string') {
      res
        .status(400)
        .send({ error: 'O campo produto precisa ser preenchido.' });
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

    await writeFile('pedidos.json', JSON.stringify(data));
    res.send(pedidos);
  } catch (err) {
    console.log(err);
  }
});

route.patch('/pedidos', async (req, res) => {
  try {
    let pedidos = req.body;
    const data = JSON.parse(await readFile('pedidos.json'));
    const index = data.pedidos.findIndex(a => a.id === pedidos.id);

    data.pedidos[index].entregue = pedidos.entregue;

    if (!pedidos.entregue || typeof pedidos.entregue !== 'boolean') {
      res
        .status(400)
        .send({ error: 'O campo entregue precisa ser preenchido.' });
    }

    let timeStamp = new Date();
    pedidos.timeStamp = timeStamp;

    await writeFile('pedidos.json', JSON.stringify(data));
    res.send(data.pedidos[index]);
  } catch (err) {
    console.log(err);
  }
});

route.delete('/pedidos/:id', async (req, res) => {
  try {
    const data = JSON.parse(await readFile('pedidos.json'));
    data.pedidos = data.pedidos.filter(
      pedidos => pedidos.id !== parseInt(req.params.id)
    );
    await writeFile('pedidos.json', JSON.stringify(data));
    res.send({ message: 'O pedido foi excluído com sucesso!' });
  } catch (err) {
    console.log(err);
  }
});

export default route;
