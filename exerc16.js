const http = require('http');

const server = http.createServer((req, res) => {
  if (req.url === '/login' && req.method === 'POST') {
    let body = '';

    // Lendo os dados do corpo da requisição.
    req.on('data', chunk => { body += chunk.toString(); });
    // Quando terminar de receber os dados.
    req.on('end', () => {
      const dados = JSON.parse(body);
      const sucesso = (dados.usuario === "admin" && dados.senha === "1234");
      const mensagem = sucesso ? 'Login bem-sucedido' : 'Usuário ou senha inválidos';
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(mensagem));
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end('Página não encontrada');
  }
});

server.listen(3000, () => console.log('Servidor rodando na porta 3000'));
