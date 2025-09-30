const http = require('http')

const server = http.createServer((req, res) => {
  if (req.url === '/hora') {

  } else {

  }
})

server.liten(3000, () => {
  console.log('Servidor iniciado na porta 3000')
})
