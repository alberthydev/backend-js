const http = require('http');
let usuarios = [{ nome: 'Albert', idade: 23 }, { nome: 'Lais', idade: 25 }, { nome: 'Paulo', idade: 26 }];

function lerCorpo(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunck => body += chunck.toString());
    req.on('end', () => resolve(body));
    req.on('error', err => reject((err)));
  })
}

const server = http.createServer(async (req, res) => {
  if (req.url === '/usuarios' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify(usuarios));
  } else if (req.url === '/usuarios' && req.method === 'POST') {
    const body = await lerCorpo(req);
    const novoUsuario = JSON.parse(body);

    if (!novoUsuario.nome || !novoUsuario.idade) {
      res.writeHead(400, { "content-type": "application/json ; charset=utf-8" });
      res.end(JSON.stringify({ sucesso: false, mensagem: 'Nome e Idade são obrigatórios' }));
      return;
    }

    usuarios.push(novoUsuario);
    res.writeHead(201, { "content-type": "application/json" });
    res.end(JSON.stringify({ sucesso: true, usuario: novoUsuario }));
  } else {
    res.writeHead(404, { "Content-Type": "plain/text; charset=utf-8" });
    res.end("Página não encontrada");
  }
});

server.listen(3000, () => console.log('Servidor rodando na porta 3000'));
