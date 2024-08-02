require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });
const fs = require('fs');
const https = require('https');
const path = require('path');
const app = require('./app').server;

const port = process.env.PORT || 3030;
const isDevelopment = process.env.NODE_ENV === 'development';

if (isDevelopment) {
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

  https.createServer(options, app).listen(port, '192.168.18.27', err => {
    if (err) {
      console.log('Erro na configuração do servidor');
    } else {
      console.log(`Server rodando em https://192.168.18.27:${port}/api/v1`);
    }
  });
} else {
  app.listen(port, err => {
    if (err) {
      console.log('Erro na configuração do servidor');
    } else {
      console.log(
        `Server rodando em ${process.env.BASE_URL}:${process.env.PORT}/api/v1`,
      );
    }
  });
}
