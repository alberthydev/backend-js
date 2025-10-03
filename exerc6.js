const http = require('http');
let visitas = 0;

const server = http.createServer((req, res) => {
  if (req.url === '/visitas') {
    visitas++;

    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(`O site foi visitado ${visitas} vezes`);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Página não encontrada');
  }
});

server.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000')
});

