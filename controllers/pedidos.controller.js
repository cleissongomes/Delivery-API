import PedidosService from '../services/pedidos.service.js';
import { promises as fs, read } from 'fs';
const { readFile, writeFile } = fs;

async function createPedido(req, res, next) {
  try {
    let pedidos = req.body;

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
    pedidos = await PedidosService.createPedido(pedidos);
    res.send(pedidos);
    global.logger.info(`POST /pedidos, ${JSON.stringify(pedidos)}`);
  } catch (err) {
    next(err);
  }
}

async function updatePedido(req, res, next) {
  try {
    let pedidos = req.body;

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
    pedidos = await PedidosService.updatePedido(pedidos);
    res.send(pedidos);
    global.logger.info(`PUT /pedidos, ${JSON.stringify(pedidos)}`);
  } catch (err) {
    next(err);
  }
}

async function updatePedidoEntregue(req, res, next) {
  try {
    let pedidos = req.body;

    if (!pedidos.entregue || typeof pedidos.entregue !== 'boolean') {
      res
        .status(400)
        .send({ error: 'O campo entregue precisa ser preenchido.' });
    }
    res.send(await PedidosService.updatePedidoEntregue(pedidos));
    global.logger.info(`PATCH /pedidos, ${JSON.stringify(pedidos)}`);
  } catch (err) {
    next(err);
  }
}

async function deletePedido(req, res, next) {
  try {
    let pedidos = req.body;
    pedidos = await PedidosService.deletePedido(req.params.id);
    res.send({ message: 'O pedido foi excluído com sucesso!' });
    global.logger.info(`DELETE /pedidos/:id, ${req.params.id}`);
  } catch (err) {
    next(err);
  }
}

async function getPedido(req, res, next) {
  try {
    res.send(await PedidosService.getPedido(req.params.id));
    global.logger.info(`GET /pedidos/:id`);
  } catch (err) {
    next(err);
  }
}

async function createValorTotalCliente(req, res, next) {
  try {
    const cliente = req.params.cliente;
    res.send(await PedidosService.createValorTotalCliente(cliente));
    global.logger.info(`POST /pedidos/:cliente, ${JSON.stringify(pedidos)}`);
  } catch (err) {
    next(err);
  }
}

async function createValorTotalProduto(req, res, next) {
  try {
    const produtoParam = req.params.produto;
    res.send(await PedidosService.createValorTotalProduto(produtoParam));
    global.logger.info(
      `POST /pedidos/valo_total_pedidos/:produto, ${JSON.stringify(pedidos)}`
    );
  } catch (err) {
    next(err);
  }
}

async function getProduto(req, res, next) {
  try {
    res.send(await PedidosService.getProduto());
    global.logger.info(`GET /pedidos`);
  } catch (err) {
    next(err);
  }
}

export default {
  createPedido,
  updatePedido,
  updatePedidoEntregue,
  deletePedido,
  getPedido,
  createValorTotalCliente,
  createValorTotalProduto,
  getProduto,
};
