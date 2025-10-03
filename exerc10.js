const http = require('http');

const server = http.createServer((req, res) => {
  if (req.url === '/metodo') {
    const method = req.method;

    res.writeHead(200, { "content-type": "text/plain; charset=utf-8" });
    res.end(`O método HTTP usado aqui é o ${method}`);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Página não encontrada');
  }
});

server.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000')
});
