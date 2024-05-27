import { promises as fs } from 'fs';

const { readFile, writeFile } = fs;

async function insertPedido(pedidos) {
  const data = JSON.parse(await readFile('pedidos.json'));

  let timeStamp = new Date();
  pedidos.timeStamp = timeStamp;

  pedidos = { id: data.nextId++, ...pedidos };
  data.pedidos.push(pedidos);

  await writeFile('pedidos.json', JSON.stringify(data));
  return pedidos;
}

async function updatePedido(pedidos) {
  const data = JSON.parse(await readFile('pedidos.json'));
  const index = data.pedidos.findIndex(a => a.id === pedidos.id);

  data.pedidos[index] = pedidos;

  let timeStamp = new Date();
  pedidos.timeStamp = timeStamp;

  await writeFile('pedidos.json', JSON.stringify(data));
  return data.pedidos[index];
}

async function updatePedidoEntregue(pedidos) {
  const data = JSON.parse(await readFile('pedidos.json'));
  const index = data.pedidos.findIndex(a => a.id === pedidos.id);

  data.pedidos[index].entregue = pedidos.entregue;

  let timeStamp = new Date();
  pedidos.timeStamp = timeStamp;

  await writeFile('pedidos.json', JSON.stringify(data));
  return data.pedidos[index];
}

async function deletePedido(id) {
  const data = JSON.parse(await readFile('pedidos.json'));
  data.pedidos = data.pedidos.filter(pedidos => pedidos.id !== parseInt(id));
  await writeFile('pedidos.json', JSON.stringify(data));
}

async function getPedido(id) {
  const data = JSON.parse(await readFile('pedidos.json'));
  const pedidos = (data.pedidos = data.pedidos.filter(
    pedidos => pedidos.id === parseInt(id)
  ));
  if (pedidos) {
    return pedidos;
  }
  throw new Error('Registro não encontrado.');
}

async function insertValorTotalCliente(cliente) {
  const data = JSON.parse(await readFile('pedidos.json'));

  const pedidosEntreguesDoCliente = data.pedidos.filter(
    pedidos => pedidos.cliente === cliente && pedidos.entregue
  );

  const valorTotalPedidos = pedidosEntreguesDoCliente.reduce(
    (total, pedido) => total + pedido.valor,
    0
  );
  return {
    cliente: cliente,
    valor_total_pedidos: valorTotalPedidos,
  };
}

async function insertValorTotalProduto(produtoParam) {
  const data = JSON.parse(await readFile('pedidos.json'));

  const pedidosEntreguesDoProduto = data.pedidos.filter(
    pedido => pedido.entregue && pedido.produto === produtoParam
  );

  const valorTotalPedidos = pedidosEntreguesDoProduto.reduce(
    (total, pedido) => total + pedido.valor,
    0
  );
  return {
    produto: produtoParam,
    valor_total_pedidos: valorTotalPedidos,
  };
}

async function getProduto() {
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
  return resultadoFinal;
}

export default {
  insertPedido,
  updatePedido,
  updatePedidoEntregue,
  deletePedido,
  getPedido,
  insertValorTotalCliente,
  insertValorTotalProduto,
  getProduto,
};
