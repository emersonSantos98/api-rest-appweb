const axios = require('axios');

async function getHtmlTemplateByType(urlBucket) {
  const htmlTemplate = await axios.get(urlBucket);

  return htmlTemplate;
}

module.exports = { getHtmlTemplateByType };
