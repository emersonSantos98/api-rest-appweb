const TemplateFunnelsRepository = require('../../../repositories/TemplateFunnels/admin/templateFunnels.repository');
const TemplateValidationService = require('../validation.service');
const Aws3BucketService = require('../../../services/Aws3Bucket.service');
const { AppError } = require('../../../../src/error/Errors');

class TemplateFunnelsService {
  name = 'Template';

  constructor(templateRepository, validationService, aws3BucketService) {
    this.Repository = templateRepository;
    this.ValidationService = validationService;
    this.Aws3BucketService = aws3BucketService;
    this.urlAws3Bucket = process.env.AWS3_BUCKET_URL;
  }

  async createTemplate(data, thumb) {
    await this.validateTemplateCreation(data, thumb);

    if (thumb) {
      const { icon } = await this.uploadThumbnail(
        thumb,
        `${this.name}/${data.name}/`,
      ).catch(error => {
        console.error('Error uploading thumbnail:', error);
        throw new AppError('Error uploading thumbnail', 500);
      });
      data.thumb = icon;
    }

    const template = await this.Repository.createTemplate(data).catch(error => {
      console.error('Error creating template:', error);
      throw new AppError('Error creating template', 500);
    });
    return { Template: await this.mountingUrlTemplate(template) };
  }

  async findAll(filtros) {
    try {
      filtros.page = parseInt(filtros.page) || 1;
      filtros.pageSize = parseInt(filtros.pageSize) || 10;

      const { templates, totalCount } = await this.Repository.findAll(filtros);

      return {
        Templates: await this.mountingUrlTemplate(templates),
        pageInfo: {
          currentPage: filtros.page,
          pageSize: filtros.pageSize,
          totalPages: Math.ceil(totalCount / filtros.pageSize),
          totalItems: totalCount,
        },
      };
    } catch (error) {
      console.error('Error finding templates:', error);
      throw new AppError('Error finding templates', 500);
    }
  }

  async findOne(template_id) {
    try {
      const template = await this.Repository.findOne(template_id);

      return { Template: await this.mountingUrlTemplate(template) };
    } catch (error) {
      console.error('Error finding template:', error);
      throw new AppError('Error finding template', 500);
    }
  }

  async update(template_id, data, file) {
    await this.ValidationService.validateFields(data, file, 'update');
    const { thumb, name } = await this.Repository.findOne(template_id).catch(
      error => {
        console.error('Error finding template:', error);
        throw new AppError('Error finding template', 500);
      },
    );
    if (thumb === null || name === null) {
      console.error('Erro ao encontrar template:');
      throw new AppError('Erro ao encontrar template', 500);
    }

    if (
      file &&
      file.fieldname === 'thumb' &&
      file.originalname &&
      file.buffer
    ) {
      await this.Aws3BucketService.deleteImage(
        `${this.name}/${name}/${thumb}`,
        `${this.name}`,
      ).catch(error => {
        console.error('Error deleting image:', error);
        throw new AppError('Error deleting image', 500);
      });

      const { icon } = await this.uploadThumbnail(
        file,
        `${this.name}/${data.name}/`,
      ).catch(error => {
        console.error('Error uploading thumbnail:', error);
        throw new AppError('Error uploading thumbnail', 500);
      });
      data.thumb = icon;
    }

    console.log('data: ', data);

    const template = await this.Repository.update(template_id, data);

    return { Template: await this.mountingUrlTemplate(template) };
  }

  async delete(template_id) {
    try {
      const { name, thumb } = await this.Repository.findOne(template_id);

      await this.Aws3BucketService.deleteImage(
        `${this.name}/${name}/${thumb}`,
        `${this.name}`,
      );

      await this.Repository.delete(template_id);

      return {
        message: 'Template deletado com sucesso',
        status: 200,
        Template: { id: template_id, name },
      };
    } catch (error) {
      console.error('Error deleting template:', error);
      throw new AppError('Error deleting template', 500);
    }
  }

  async validateTemplateCreation(data, thumb) {
    await this.ValidationService.templateExists(data.name);
    await this.ValidationService.validateFields(data, thumb || null, 'create');
    console.log('Validação de template criado com sucesso');
  }

  async uploadThumbnail(thumb, uploadPath) {
    try {
      const { icon } = await this.Aws3BucketService.uploadImage(
        thumb,
        uploadPath,
        `${this.name}`,
      );
      console.log(`Thumbnail do ${this.name} criado com sucesso`);
      return { icon };
    } catch (error) {
      console.error('Error uploading thumbnail:', error);
      throw new AppError('Error uploading thumbnail', 500);
    }
  }

  async mountingUrlTemplate(templateOrArray) {
    try {
      if (Array.isArray(templateOrArray)) {
        const templatesWithUrls = await Promise.all(
          templateOrArray.map(async template => {
            const encodedName = encodeURIComponent(template.name);
            [template.dataValues.thumbUrl] = await Promise.all([
              `${this.urlAws3Bucket}/${this.name}/${encodedName}/${template.thumb}`,
            ]);
            return template;
          }),
        );
        return templatesWithUrls;
      } else {
        const encodedName = encodeURIComponent(templateOrArray.name);
        const [template] = await Promise.all([
          `${this.urlAws3Bucket}/${this.name}/${encodedName}/${templateOrArray.thumb}`,
        ]);
        templateOrArray.dataValues.thumbUrl = template;
        return templateOrArray;
      }
    } catch (error) {
      console.error('Error mounting url template:', error);
      throw new AppError('Error mounting url template', 500);
    }
  }
}

module.exports = new TemplateFunnelsService(
  TemplateFunnelsRepository,
  TemplateValidationService,
  Aws3BucketService,
);
