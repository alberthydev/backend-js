const http = require('http');
const url = require('url')

const server = http.createServer((req, res) => {
  const q = url.parse(req.url, true).query;

  if (req.url.startsWith("/soma")) {
    const numA = parseInt(q.a, 10);
    const numB = parseInt(q.b, 10);
    const soma = numA + numB;

    const resultado = {
      resultado: soma,
      parametros: { a: numA, b: numB }
    }

    res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
    res.end(JSON.stringify(resultado));
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Página não encontrada');
  }
});

server.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000')
});
