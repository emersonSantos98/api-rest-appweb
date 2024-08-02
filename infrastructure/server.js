require('dotenv').config();

const App = require('./app').server;

const port = process.env.PORT || 3030;

App.get(['/api/v1/', '/'], function (req, res) {
  res.redirect('/api/v1/api-docs');
});

App.listen(port, err => {
  if (err) console.log('Erro na configuração do servidor');
  if (
      process.env.NODE_ENV === 'production' ||
      process.env.NODE_ENV === 'test' ||
      process.env.NODE_ENV === 'dev'
  ) {
    console.log(
        `server rodando em ambiente de desenvolvimento em ${process.env.BASE_URL}/api/v1`,
    );
  } else {
    console.log(
        `App rodando em ambiente de produção em ${process.env.URL}/api/v1`,
    );
  }
});
