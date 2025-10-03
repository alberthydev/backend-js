const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
  if (req.url.startsWith("/media")) {
    const q = url.parse(req.url, true).query

    const numA = parseFloat(q.a);
    const numB = parseFloat(q.b);
    const media = (numA + numB) / 2;

    const result = {
      media: media,
    }

    res.writeHead(200, { "content-type": "application.json; charset=utf-8" });
    res.end(JSON.stringify(result));
  } else {
    res.writeHead(404, { "Content-Type": "plain/text; charset=utf-8" });
    res.end("Página não encontrada");
  }
});

server.listen(3000, () => {
  console.log("Servidor iniciado na porta 3000");
})
