import express from 'express';
import { promises as fs, read } from 'fs';
const route = express.Router();

const { readFile, writeFile } = fs;

route.post('/pedidos', async (req, res, next) => {
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
    next(err);
  }
});

route.put('/pedidos', async (req, res, next) => {
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
    next(err);
  }
});

route.patch('/pedidos', async (req, res, next) => {
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
    next(err);
  }
});

route.delete('/pedidos/:id', async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile('pedidos.json'));
    data.pedidos = data.pedidos.filter(
      pedidos => pedidos.id !== parseInt(req.params.id)
    );
    await writeFile('pedidos.json', JSON.stringify(data));
    res.send({ message: 'O pedido foi excluído com sucesso!' });
  } catch (err) {
    next(err);
  }
});

route.get('/pedidos/:id', async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile('pedidos.json'));
    data.pedidos = data.pedidos.filter(
      pedidos => pedidos.id === parseInt(req.params.id)
    );
    res.send(data.pedidos);
  } catch (err) {
    next(err);
  }
});

route.post('/pedidos/:cliente', async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile('pedidos.json'));
    const cliente = req.params.cliente;

    const pedidosEntreguesDoCliente = data.pedidos.filter(
      pedidos => pedidos.cliente === cliente && pedidos.entregue
    );

    const valorTotalPedidos = pedidosEntreguesDoCliente.reduce(
      (total, pedido) => total + pedido.valor,
      0
    );

    res.send({
      cliente: cliente,
      valor_total_pedidos: valorTotalPedidos,
    });
  } catch (err) {
    next(err);
  }
});

route.post('/valor_total_pedidos/:produto', async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile('pedidos.json'));
    const produtoParam = req.params.produto;

    const pedidosEntreguesDoProduto = data.pedidos.filter(
      pedido => pedido.entregue && pedido.produto === produtoParam
    );

    const valorTotalPedidos = pedidosEntreguesDoProduto.reduce(
      (total, pedido) => total + pedido.valor,
      0
    );

    res.send({
      produto: produtoParam,
      valor_total_pedidos: valorTotalPedidos,
    });
  } catch (err) {
    next(err);
  }
});

route.get('/', async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile('pedidos.json'));
    const pedidosEntregues = data.pedidos.filter(pedido => pedido.entregue);
    const produtosQuantidade = {};
    pedidosEntregues.forEach(pedido => {
      if (produtosQuantidade[pedido.produto]) {
        produtosQuantidade[pedido.produto]++;
      } else {
        produtosQuantidade[pedido.produto] = 1;
      }
    });

    const produtosMaisVendidos = Object.entries(produtosQuantidade).map(
      ([produto, quantidade]) => [produto, quantidade]
    );

    produtosMaisVendidos.sort((a, b) => b[1] - a[1]);

    const resultadoFinal = produtosMaisVendidos.map(
      ([produto, quantidade]) => `${produto} - ${quantidade}`
    );
    res.send(resultadoFinal);
  } catch (err) {
    next(err);
  }
});

route.use((err, req, res, next) => {
  console.log(err);
  res.status(400).send({ error: err.message });
});

export default route;
