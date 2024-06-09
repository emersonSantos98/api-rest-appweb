const SendGridSubscribers = require('../../Subscribers/SendGridSubscribers');
const { Templates } = require('../../../../enums/EmailTemplatesEnum');

class SendGridController {
  constructor() {
    this.send = this.send.bind(this);
  }

  // exemplo como utilizar o envio de email com SendGrid
  async send(request, response) {
    const body = { mail: request.body.mail, type: Templates.RESET_PASSWORD };

    const result = await SendGridSubscribers.resetPassword(body);
    return response.status(202).json(result);
  }
}
module.exports = SendGridController;
