const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    fs.readFile('index.html', (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
        res.end("Erro ao ler arquivo");
      } else {
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.end(data);
      }
    })
  } else {
    res.writeHead(404, { "Content-Type": "plain/text; charset=utf-8" });
    res.end("Página não encontrada");
  }
});

server.listen(3000, () => {
  console.log("Servidor iniciado na porta 3000");
})
