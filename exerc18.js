const http = require('http');
let produtos = [{ "id": 1, "nome": "Teclado", "preco": 120 }];

function lerCorpo(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunck => body += chunck.toString());
    req.on('end', () => resolve(body));
    req.on('error', err => reject((err)));
  })
}

const server = http.createServer(async (req, res) => {
  try {

    if (req.url === '/produtos' && req.method === 'GET') {
      res.writeHead(200, { 'content-type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify(produtos));
    } else if (req.url === '/produtos' && req.method === 'POST') {
      const body = await lerCorpo(req);
      const novoProduto = JSON.parse(body);

      if (!novoProduto.nome || !novoProduto.preco) {
        res.writeHead(400, { "content-type": "application/json; charset=utf-8" });
        res.end(JSON.stringify(({ sucesso: false, msg: "Nome e Preço são obrigatórios" })));
        return;
      }

      produtos.push(novoProduto);
      res.writeHead(201, { "content-type": "application/json; charset=utf-8" });
      res.end(JSON.stringify({ sucesso: true, produto: novoProduto }));
    } else if (req.url.startsWith('/produtos/') && req.method === 'PUT') {
      const url = req.url.split('/');
      const id = parseInt(url[2], 10);

      const body = await lerCorpo(req);
      const dados = JSON.parse(body);

      const indexProduto = produtos.findIndex(p => p.id === id);

      if (indexProduto === -1) {
        res.writeHead(404, { "content-type": "application/json; charset=utf-8" });
        res.end(JSON.stringify({ sucesso: false, msg: "Produto não encontrado" }));
        return;
      }

      const produtoAtualizado = { ...produtos[indexProduto], ...dados };
      produtos[indexProduto] = produtoAtualizado;

      res.writeHead(200, { "content-type": "application/json; charset=utf-8" });
      res.end(JSON.stringify({ sucesso: true, produto: produtoAtualizado }));

    } else if (req.url.startsWith('/produtos/') && req.method === 'DELETE') {
      const url = req.url.split('/');
      const id = parseInt(url[2], 10);

      const indexProduto = produtos.findIndex(p => p.id === id);

      if (indexProduto === -1) {
        res.writeHead(404, { "content-type": "application/json; charset=utf-8" });
        res.end(JSON.stringify({ sucesso: false, msg: "Produto não encontrado" }));
        return;
      }

      produtos.splice(indexProduto, 1);

      res.writeHead(200, { "content-type": "application/json; charset=utf-8" });
      res.end(JSON.stringify({ sucesso: true, msg: "Produto deletado com sucesso" }));

    } else {
      res.writeHead(404, { "Content-Type": "plain/text; charset=utf-8" });
      res.end("Página não encontrada");
    }
  } catch (err) {
    console.error(err);
    res.writeHead(500, { "content-type": "application/json; charset=utf-8" });
    res.end(JSON.stringify({ sucesso: false, msg: "Erro interno" }));
  }
});

server.listen(3000, () => console.log('Servidor rodando na porta 3000'));
