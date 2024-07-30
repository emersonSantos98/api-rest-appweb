require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });
const fs = require('fs');
const https = require('https');
const path = require('path');
const app = require('./app').server;

const port = process.env.PORT || 3030;

// Ler os certificados
const keyPath =
  process.env.NODE_ENV === 'development'
    ? 'C:/Users/emers/192.168.18.27-key.pem'
    : '/path/to/production-key.pem';
const certPath =
  process.env.NODE_ENV === 'development'
    ? 'C:/Users/emers/192.168.18.27.pem'
    : '/path/to/production-cert.pem';

const key = fs.readFileSync(path.resolve(keyPath));
const cert = fs.readFileSync(path.resolve(certPath));

const options = {
  key: key,
  cert: cert,
};

const host =
  process.env.NODE_ENV === 'development' ? '192.168.18.27' : '0.0.0.0';

https.createServer(options, app).listen(port, host, err => {
  if (err) {
    console.log('Erro na configuração do servidor');
  } else {
    console.log(`Server rodando em https://${host}:${port}/api/v1`);
  }
});
