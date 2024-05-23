import express from 'express';
import { promises as fs, read } from 'fs';
const route = express.Router();
import PedidoController from '../controllers/pedidos.controller.js';

const { readFile, writeFile } = fs;

route.post('/pedidos', PedidoController.createPedido);
route.put('/pedidos', PedidoController.updatePedido);
route.patch('/pedidos', PedidoController.updatePedidoEntregue);
route.delete('/pedidos/:id', PedidoController.deletePedido);
route.get('/pedidos/:id', PedidoController.getPedido);
route.post('/pedidos/:cliente', PedidoController.createValorTotalCliente);
route.post(
  '/valor_total_pedidos/:produto',
  PedidoController.createValorTotalProduto
);
route.get('/', PedidoController.getProduto);

route.use((err, req, res, next) => {
  global.logger.error(`${req.method} ${req.baseUrl} - ${err.message}`);
  res.status(400).send({ error: err.message });
});

export default route;
