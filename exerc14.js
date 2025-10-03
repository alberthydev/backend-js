const http = require('http');
const contador = { '/': 0, '/sobre': 0, '/contato': 0 };

const server = http.createServer((req, res) => {
  if (contador.hasOwnProperty(req.url)) {
    contador[req.url]++;
    res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
    res.end(`Rota ${req.url} acessada ${contador[req.url]} vezes`);
  } else {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Página não encontrada");
  }
})

server.listen(3000, () => {
  console.log("Servidor iniciado na porta 3000");
})
