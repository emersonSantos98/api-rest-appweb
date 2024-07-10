require('dotenv').config();
const fs = require('fs');
const https = require('https');
const path = require('path');
const app = require('./app').server; // Importa a instância do Express do app.js

const port = process.env.PORT || 3030;

// Ler os certificados
const key = fs.readFileSync(
  path.resolve('C:/Users/emers/192.168.18.27-key.pem'),
);
const cert = fs.readFileSync(path.resolve('C:/Users/emers/192.168.18.27.pem'));

const options = {
  key: key,
  cert: cert,
};

// Modificação para escutar em todas as interfaces de rede
const host = '192.168.18.27';

https.createServer(options, app).listen(port, host, err => {
  if (err) {
    console.log('Erro na configuração do servidor');
  } else {
    console.log(`Server rodando em https://${host}:${port}/api/v1`);
  }
});
