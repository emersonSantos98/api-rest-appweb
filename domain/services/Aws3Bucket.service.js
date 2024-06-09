const awsS3 = require('../../src/externalServices/awsS3.service');
const { AppError } = require('../../src/error/Errors');
const FormData = require('form-data');

class Aws3BucketService {
  constructor(apiAWS) {
    this.apiAWS = apiAWS || awsS3.getApiAWS();
  }

  async getApiAws() {
    try {
      const response = await this.apiAWS.get('/');
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async uploadImage(file, caminho, name) {
    console.log('entrou no uploadImage');
    try {
      const formData = this.createFormDataWithImage(file, caminho);
      const response = await this.apiAWS.post('/upload-one', formData);
      console.log(`${name} enviado para o bucket AWS S3`);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async uploadMultiple(files, caminho) {
    try {
      const formData = this.createFormDataWithMultipleFiles(files, caminho);
      const response = await this.apiAWS.post('/upload-multiple', formData);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async deleteImage(file_key, name) {
    try {
      const response = await this.apiAWS.delete(`/delete`, {
        headers: { 'Content-Type': 'application/json' },
        data: { file_key },
      });
      console.log(`${name} excluído do bucket AWS S3`);
      return response.data;
    } catch (error) {
      console.log(`Erro ao excluir ${name} do bucket AWS S3`);
      this.handleError(error);
    }
  }

  createFormDataWithImage(file, caminho) {
    const formData = new FormData();
    formData.append('image', file.buffer, file.originalname);
    formData.append('caminho', caminho);
    return formData;
  }

  createFormDataWithMultipleFiles(files, caminho) {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('files', file.buffer, file.originalname);
    });
    formData.append('caminho', caminho);
    return formData;
  }

  handleError(error) {
    console.error('Error interacting with AWS S3:', error);
    throw new AppError('Error interacting with AWS S3', 500);
  }
}

module.exports = new Aws3BucketService();
