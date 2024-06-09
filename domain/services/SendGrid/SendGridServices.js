const { AppError } = require('../../../src/error/Errors');
const sgMail = require('@sendgrid/mail');
const sendGridConfig = require('../../../config/sendGridConfig');
const handlebars = require('handlebars');
const TemplateEmailServices = require('../../../domain/services/TemplateEmail/TemplateEmailServices');
const AxiosServices = require('../../../domain/services/Axios/AxiosServices');

const templateEmailServices = new TemplateEmailServices();

function sendEmail(msg) {
  sgMail.setApiKey(sendGridConfig.sendGridConfig.apikey);

  return new Promise((resolve, reject) => {
    sgMail
      .send(msg)
      .then(reponse => {
        resolve({ message: 'Email enviado com sucesso' });
      })
      .catch(error => {
        reject(new AppError(error.message, 500));
      });
  });
}

async function createBodyMail(mail, type, parameters) {
  const configTemplate = await templateEmailServices
    .findOne(type)
    .catch(error => {
      throw new AppError(error.message, error.status);
    });

  if (!configTemplate) {
    return new AppError('Erro ao buscar configurações do template', 500);
  }

  const repo = await AxiosServices.getHtmlTemplateByType(
    configTemplate.data.urlBucket,
  );
  if (repo.status !== 200) {
    return new AppError('Erro ao buscar template', 500);
  }

  const html = repo.data;

  const compiledTemplate = handlebars.compile(html);

  const bodyMail = compiledTemplate(parameters);

  const msg = {
    to: mail,
    from: configTemplate.data.from,
    subject: configTemplate.data.subject,
    html: bodyMail,
  };

  return msg;
}

module.exports = { sendEmail, createBodyMail };
