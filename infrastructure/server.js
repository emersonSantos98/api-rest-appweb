require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });
const fs = require('fs');
const https = require('https');
const path = require('path');
const app = require('./app').server;

const port = process.env.PORT || 3030;
const host = process.env.BASE_URL

if (process.env.NODE_ENV === 'development') {
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
  app.listen(port, host, err => {
    if (err) {
      console.log('Erro na configuração do servidor');
    } else {
      console.log(`Server rodando em http://${host}:${port}/api/v1`);
    }
  });
}
