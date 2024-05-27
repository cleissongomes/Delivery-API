import PedidosRepository from '../repositories/pedidos.repository.js';

async function createPedido(pedidos) {
  return await PedidosRepository.insertPedido(pedidos);
}

async function updatePedido(pedidos) {
  return await PedidosRepository.updatePedido(pedidos);
}

async function updatePedidoEntregue(pedidos) {
  return await PedidosRepository.updatePedidoEntregue(pedidos);
}

async function deletePedido(id) {
  return await PedidosRepository.deletePedido(id);
}

async function getPedido(id) {
  return await PedidosRepository.getPedido(id);
}

async function createValorTotalCliente(cliente) {
  return await PedidosRepository.insertValorTotalCliente(cliente);
}

async function createValorTotalProduto(produtoParam) {
  return await PedidosRepository.insertValorTotalProduto(produtoParam);
}

async function getProduto() {
  return await PedidosRepository.getProduto();
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
