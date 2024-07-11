const fs = require('fs-extra');
const path = require('path');

const createFile = (filePath, content) => {
  fs.ensureFileSync(filePath);
  fs.writeFileSync(filePath, content);
  console.log(`Created: ${filePath}`);
};

const generateMethod = methodName => {
  const baseDir = path.resolve(__dirname);

  const controllerPath = path.join(
    baseDir,
    'src/app/controllers',
    methodName,
    `${methodName}.controller.js`,
  );
  const routePath = path.join(
    baseDir,
    'src/app/routes',
    methodName,
    `${methodName}.route.js`,
  );
  const servicePath = path.join(
    baseDir,
    'domain/services',
    methodName,
    `${methodName}.service.js`,
  );
  const repositoryPath = path.join(
    baseDir,
    'domain/repositories',
    methodName,
    `${methodName}.repository.js`,
  );

  const controllerContent = `// ${methodName}.controller.js
const ${methodName}Service = require('../../../../domain/services/${methodName}/${methodName}.service');

// Define your controller methods here

class ${methodName}Controller {
  constructor() {
    this.${methodName}Service = new ${methodName}Service();
    this.create${methodName} = this.create${methodName}.bind(this);
    this.findAll${methodName}s = this.findAll${methodName}s.bind(this);
    this.findOne${methodName} = this.findOne${methodName}.bind(this);
    this.update${methodName} = this.update${methodName}.bind(this);
    this.delete${methodName} = this.delete${methodName}.bind(this);
  }

  async create${methodName}(request, response) {
    const ${methodName.toLowerCase()} = await this.${methodName}Service.create${methodName}(request.body);
    return response.status(201).json(${methodName.toLowerCase()});
  }
  async findAll${methodName}s(request, response) {
    const ${methodName.toLowerCase()}s = await this.${methodName}Service.findAll${methodName}s(request.query);
    response.status(200).json(${methodName.toLowerCase()}s);
  }
  async findOne${methodName}(request, response) {
    const { ${methodName.toLowerCase()}Id } = request.params;
    const ${methodName.toLowerCase()} = await this.${methodName}Service.findOne${methodName}(${methodName.toLowerCase()}Id);
    return response.status(200).json(${methodName.toLowerCase()});
  }
  async update${methodName}(request, response) {
    const { ${methodName.toLowerCase()}Id } = request.params;
    const ${methodName.toLowerCase()} = await this.${methodName}Service.update${methodName}(${methodName.toLowerCase()}Id, request.body);
    return response.status(200).json(${methodName.toLowerCase()});
  }
  async delete${methodName}(request, response) {
    const { ${methodName.toLowerCase()}Id } = request.params;
    const ${methodName.toLowerCase()} = await this.${methodName}Service.delete${methodName}(${methodName.toLowerCase()}Id);
    return response.status(200).json(${methodName.toLowerCase()});
  }
}

module.exports = ${methodName}Controller;
`;

  const routeContent = `// ${methodName}.route.js
const router = require('express').Router();
const ${methodName}Controller = require('../../controllers/${methodName}/${methodName}.controller');
const ${methodName.toLowerCase()}Controller = new ${methodName}Controller();
// Define your routes here

router.post('/create', ${methodName.toLowerCase()}Controller.create${methodName});
router.get('/findAll', ${methodName.toLowerCase()}Controller.findAll${methodName}s);
router.get('/findOne', ${methodName.toLowerCase()}Controller.findOne${methodName});
router.put('/update/:id', ${methodName.toLowerCase()}Controller.update${methodName});
router.delete('/delete/:id', ${methodName.toLowerCase()}Controller.delete${methodName});

module.exports = router;
`;

  const serviceContent = `// ${methodName}.service.js
// Define your service methods here
const ${methodName}Repository = require('../../repositories/${methodName}/${methodName}.repository');
const { AppError } = require('../../../src/error/Errors');

class ${methodName}Service {
  constructor() {
    this.${methodName.toLowerCase()}Repository = new ${methodName}Repository();
  }

  async create${methodName}(${methodName.toLowerCase()}) {
    try {
      const result = await this.${methodName.toLowerCase()}Repository.create${methodName}(${methodName.toLowerCase()});
      return {
        message: '${methodName} created successfully',
        status: 'success',
        data: result,
      };
    } catch (error) {
      throw new AppError(400, error.message);
    }
  }
  async findAll${methodName}s() {
    try {
      const result = await this.${methodName.toLowerCase()}Repository.findAll${methodName}s();
      return {
        message: '${methodName}s found successfully',
        status: 'success',
        data: result,
      };
    } catch (error) {
      throw new AppError(400, error.message);
    }
  }
  async findOne${methodName}(${methodName.toLowerCase()}Id) {
    try {
      const result = await this.${methodName.toLowerCase()}Repository.findOne${methodName}(${methodName.toLowerCase()}Id);
      return {
        message: '${methodName} found successfully',
        status: 'success',
        data: result,
      };
    } catch (error) {
      throw new AppError(400, error.message);
    }
  }
  async update${methodName}(${methodName.toLowerCase()}Id, ${methodName.toLowerCase()}) {
    try {
      const result = await this.${methodName.toLowerCase()}Repository.update${methodName}(${methodName.toLowerCase()}Id, ${methodName.toLowerCase()});
      return {
        message: '${methodName} updated successfully',
        status: 'success',
        data: result,
      };
    } catch (error) {
      throw new AppError(400, error.message);
    }
  }
  async delete${methodName}(${methodName.toLowerCase()}Id) {
    try {
      const result = await this.${methodName.toLowerCase()}Repository.delete${methodName}(${methodName.toLowerCase()}Id);
      return {
        message: '${methodName} deleted successfully',
        status: 'success',
        data: result,
      };
    } catch (error) {
      throw new AppError(400, error.message);
    }
  }
}

module.exports = ${methodName}Service;
`;

  const repositoryContent = `// ${methodName}.repository.js
// Define your repository methods here
const { ${methodName} } = require('../../models');
class ${methodName}Repository {
  // Example repository method

  async create${methodName}(${methodName.toLowerCase()}) {
    return await ${methodName}.create(${methodName.toLowerCase()});
  }
  async findAll${methodName}s() {
    return await ${methodName}.findAll();
  }
  async findOne${methodName}(${methodName.toLowerCase()}Id) {
    return await ${methodName}.findByPk(${methodName.toLowerCase()}Id);
  }
  async update${methodName}(${methodName.toLowerCase()}Id, ${methodName.toLowerCase()}) {
    return await ${methodName}.update(${methodName.toLowerCase()}, { where: { id: ${methodName.toLowerCase()}Id } });
  }
  async delete${methodName}(${methodName.toLowerCase()}Id) {
    return await ${methodName}.destroy({ where: { id: ${methodName.toLowerCase()}Id } });
  }
}

module.exports = ${methodName}Repository;
`;

  createFile(controllerPath, controllerContent);
  createFile(routePath, routeContent);
  createFile(servicePath, serviceContent);
  createFile(repositoryPath, repositoryContent);
};

const methodName = process.argv[2];
if (!methodName) {
  console.error('Please provide a method name.');
  process.exit(1);
}

generateMethod(methodName);
