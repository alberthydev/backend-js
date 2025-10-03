const http = require('http');

const server = http.createServer((req, res) => {
  if (req.url === '/frutas') {
    const frutas = [
      "laranja",
      "limao",
      "melao",
      "beringela",
    ]

    res.writeHead(200, { "content-type": "application/json; charset=utf-8" });
    res.end(JSON.stringify(frutas));
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Página não encontrada');
  }
});

server.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000')
});
