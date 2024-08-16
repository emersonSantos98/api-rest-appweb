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
      'src/controllers',
      methodName,
      `${methodName}.controller.js`,
  );

  const routePath = path.join(
      baseDir,
      'src/routes',
      `${methodName}.route.js`,
  );

  const serviceDir = path.join(baseDir, 'src/services', methodName);
  const repositoryDir = path.join(baseDir, 'src/repositories', methodName);

  const methods = ['create', 'update', 'find_all', 'find_one', 'delete'];

  const controllerContent = `// ${methodName}.controller.js
const Create${methodName}Service = require('../../services/${methodName}/create_${methodName}.service');
const Update${methodName}Service = require('../../services/${methodName}/update_${methodName}.service');
const FindAll${methodName}Service = require('../../services/${methodName}/find_all_${methodName}.service');
const FindOne${methodName}Service = require('../../services/${methodName}/find_one_${methodName}.service');
const Delete${methodName}Service = require('../../services/${methodName}/delete_${methodName}.service');

class ${methodName}Controller {
  async create${methodName}(req, res) {
    const create${methodName}Service = new Create${methodName}Service();
    const ${methodName.toLowerCase()} = await create${methodName}Service.execute(req.body);
    return res.status(201).json(${methodName.toLowerCase()});
  }
  
  async update${methodName}(req, res) {
    const update${methodName}Service = new Update${methodName}Service();
    const { id } = req.params;
    const ${methodName.toLowerCase()} = await update${methodName}Service.execute(id, req.body);
    return res.status(200).json(${methodName.toLowerCase()});
  }

  async findAll${methodName}s(req, res) {
    const findAll${methodName}Service = new FindAll${methodName}Service();
    const ${methodName.toLowerCase()}s = await findAll${methodName}Service.execute(req.query);
    return res.status(200).json(${methodName.toLowerCase()}s);
  }
  
  async findOne${methodName}(req, res) {
    const findOne${methodName}Service = new FindOne${methodName}Service();
    const { id } = req.params;
    const ${methodName.toLowerCase()} = await findOne${methodName}Service.execute(id);
    return res.status(200).json(${methodName.toLowerCase()});
  }
  
  async delete${methodName}(req, res) {
    const delete${methodName}Service = new Delete${methodName}Service();
    const { id } = req.params;
    const ${methodName.toLowerCase()} = await delete${methodName}Service.execute(id);
    return res.status(200).json(${methodName.toLowerCase()});
  }
}

module.exports = ${methodName}Controller;
`;

  const routeContent = `// ${methodName}.route.js
const router = require('express').Router();
const ${methodName}Controller = require('../controllers/${methodName}.controller');
const ${methodName.toLowerCase()}Controller = new ${methodName}Controller();

router.post('/create', ${methodName.toLowerCase()}Controller.create${methodName});
router.put('/update/:id', ${methodName.toLowerCase()}Controller.update${methodName});
router.get('/', ${methodName.toLowerCase()}Controller.findAll${methodName}s);
router.get('/:id', ${methodName.toLowerCase()}Controller.findOne${methodName});
router.delete('/:id', ${methodName.toLowerCase()}Controller.delete${methodName});

module.exports = router;
`;

  createFile(controllerPath, controllerContent);
  createFile(routePath, routeContent);

  methods.forEach(method => {
    const servicePath = path.join(serviceDir, `${method}_${methodName}.service.js`);
    const repositoryPath = path.join(repositoryDir, `${method}_${methodName}.repository.js`);

    const serviceContent = `// ${method}_${methodName}.service.js
const ${methodName}Repository = require('../../repositories/${methodName}/${method}_${methodName}.repository');
const { AppError } = require('../../utils/errorHandler');

class ${method.charAt(0).toUpperCase() + method.slice(1)}${methodName}Service {
  async execute(${method === 'find_one' || method === 'delete' || method === 'update' ? 'id, ' : ''}${method === 'create' || method === 'update' ? `${methodName.toLowerCase()}` : ''}) {
    try {
      const ${methodName.toLowerCase()}Repository = new ${methodName}Repository();
      const result = await ${methodName.toLowerCase()}Repository.${method}(${method === 'find_one' || method === 'delete' || method === 'update' ? 'id, ' : ''}${method === 'create' || method === 'update' ? `${methodName.toLowerCase()}` : ''});
      return {
        message: '${methodName} ${method}d successfully',
        status: 'success',
        data: result,
      };
    } catch (error) {
      throw new AppError(400, error.message);
    }
  }
}

module.exports = ${method.charAt(0).toUpperCase() + method.slice(1)}${methodName}Service;
`;

    const repositoryContent = `// ${method}_${methodName}.repository.js
const { ${methodName} } = require('../../models');

class ${method.charAt(0).toUpperCase() + method.slice(1)}${methodName}Repository {
  async ${method}(${method === 'find_one' || method === 'delete' || method === 'update' ? 'id, ' : ''}${method === 'create' || method === 'update' ? `${methodName.toLowerCase()}` : ''}) {
    return ${method === 'create' ? `await ${methodName}.create(${methodName.toLowerCase()})` :
        method === 'update' ? `await ${methodName}.update(${methodName.toLowerCase()}, { where: { id } })` :
            method === 'find_one' ? `await ${methodName}.findByPk(id)` :
                method === 'delete' ? `await ${methodName}.destroy({ where: { id } })` :
                    `await ${methodName}.findAll()`};
  }
}

module.exports = ${method.charAt(0).toUpperCase() + method.slice(1)}${methodName}Repository;
`;

    createFile(servicePath, serviceContent);
    createFile(repositoryPath, repositoryContent);
  });
};

const methodName = process.argv[2];
if (!methodName) {
  console.error('Please provide a method name.');
  process.exit(1);
}

generateMethod(methodName);
