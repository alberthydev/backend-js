const http = require('http');

const server = http.createServer((req, res) => {
  const d_t = new Date();

  if (req.url === '/hora') {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(`Hora: ${d_t.getHours()}:${d_t.getMinutes()}:${d_t.getSeconds()}`)
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Página não encontrada');
  }
});

server.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000')
});
