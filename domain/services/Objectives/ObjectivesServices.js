const {AppError} = require('../../../src/error/Errors');
const ObjectivesRepositories = require('../../repositories/Objectives/ObjectivesRepositories');

class ObjectivesServices {
    constructor() {
        this.objectivesRepositories = new ObjectivesRepositories();
    }

    async create(data) {
        console.log('data', data)
      if(!data.name || !data.objective || !data.image || !data.description) {
        throw new AppError('Dados inválidos', 400);
      }

      const objectiveExists = await this.objectivesRepositories.findOneName(data.name).catch(error => {
        throw new AppError(error.message, error.status);
      })

        if(objectiveExists) {
            throw new AppError('Objective já existe', 400);
        }


        const objective = await this.objectivesRepositories
            .create(data)
            .catch(error => {
                throw new AppError(error.message, error.status);
            });

        return {message: 'Objective criada com sucesso', data: objective};
    }

    async findAll() {
        const objectives = await this.objectivesRepositories
            .findAll()
            .catch(error => {
                throw new AppError(error.message, error.status);
            });

        if (!objectives) {
            throw new AppError(`Objectives não encontradas`, 404);
        }
        return {
            message: 'Objectives encontradas',
            data: objectives,
        };
    }

    async findOne(objective_id) {
        const objective = await this.objectivesRepositories.findOne(objective_id).catch(error => {
            throw new AppError(error.message, error.status);
        });

        if (!objective || objective === null) {
            throw new AppError('Objective não encontrada', 404);
        }
        return {message: 'Objective encontrada', data: objective};
    }

    async update(objective_id, data) {
        const objective = await this.objectivesRepositories
            .update(objective_id, data)
            .catch(error => {
                throw new AppError(error.message, error.status);
            });

        return {
            message: 'Objective atualizada com sucesso',
            data: objective,
        };
    }

    async delete(objective_id) {
        const objective = await this.objectivesRepositories
            .delete(objective_id)
            .catch(error => {
                throw new AppError(error.message, error.status);
            });

        return {
            message: 'Objective deletada com sucesso',
            data: objective,
        };
    }
}

module.exports = ObjectivesServices;
