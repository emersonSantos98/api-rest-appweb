require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });
const fs = require('fs');
const https = require('https');
const http = require('http');
const path = require('path');
const app = require('./app').server;

const port = process.env.PORT || 3030;
const isDevelopment = process.env.NODE_ENV === 'development';
const host = isDevelopment ? '192.168.18.27' : '0.0.0.0';

if (isDevelopment) {
  // Ler os certificados
  const key = fs.readFileSync(
    path.resolve('C:/Users/emers/192.168.18.27-key.pem'),
  );
  const cert = fs.readFileSync(
    path.resolve('C:/Users/emers/192.168.18.27.pem'),
  );

  const options = {
    key: key,
    cert: cert,
  };

  https.createServer(options, app).listen(port, host, err => {
    if (err) {
      console.log('Erro na configuração do servidor');
    } else {
      console.log(`Server rodando em https://${host}:${port}/api/v1`);
    }
  });
} else {
  // No ambiente de produção, utilize HTTP já que o Railway cuida do HTTPS
  http.createServer(app).listen(port, host, err => {
    if (err) {
      console.log('Erro na configuração do servidor');
    } else {
      console.log(`Server rodando em ${process.env.BASE_URL}/api/v1`);
    }
  });
}
