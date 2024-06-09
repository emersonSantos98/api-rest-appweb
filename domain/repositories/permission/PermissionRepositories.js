const {Permission, sequelize} = require('../../models');
const {Op} = require('sequelize');

class PermissionRepositories {
    constructor() {
        this.model = Permission;
    }

    async create(data) {
        return new Promise(async (resolve, reject) => {
            try {
                const permission = await this.model.create(data);
                resolve(permission)
            } catch (error) {
                reject(error)
            }
        });
    }

    async findAllUniqueSubject() {
        return new Promise(async (resolve, reject) => {
            try {
                const permissions = await this.model.findAll({
                    attributes: [
                        'subjects',
                    ],
                    group: ['subjects'],
                });
                resolve(permissions)
            } catch (error) {
                reject(error)
            }
        });
    }


    async findAll(queries) {
        return new Promise(async (resolve, reject) => {
            try {
                let where = {};

                if (queries.where) {
                    where = {
                        ...where,
                        ...queries.where,
                    };
                }

                if (queries.q) {
                    where = {
                        ...where,
                        [Op.or]: [
                            {
                                actions: {
                                    [Op.like]: `%${queries.q}%`,
                                },
                            },
                            {
                                subjects: {
                                    [Op.like]: `%${queries.q}%`,
                                },
                            },
                        ],
                    };
                }
                const {count, rows} = await this.model.findAndCountAll({
                    order: [[queries.sortBy, queries.sortDesc === 'true' ? 'DESC' : 'ASC']],
                    where: {
                        ...where,
                    },
                    limit: parseInt(queries.perPage),
                    offset: parseInt(queries.perPage) * (parseInt(queries.page) - 1),
                    include: [
                        {
                            association: 'permissionusergroup',
                            attributes: ['id', 'id_usergroup', 'id_permission'],
                            include: [
                                {
                                    association: 'role',
                                    attributes: ['name', 'label'],
                                },
                                {
                                    association: 'permission',
                                    attributes: ['actions', 'subjects'],
                                }
                            ]
                        }
                    ]
                });
                if (rows.length === 0) resolve({
                    data: [],
                    total: 0,
                })

                resolve({
                    data: rows,
                    page: parseInt(queries.page),
                    perPage: parseInt(queries.perPage),
                    pages: Math.ceil(count / queries.perPage),
                    total: count,
                });
            } catch (error) {
                reject(error)
            }
        })
    }

    async findOne(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const permission = await this.model.findOne({where: {id: id}});
                resolve(permission)
            } catch (error) {
                reject(error)
            }
        })
    }

    async findOneBySubject(subject) {
        return new Promise(async (resolve, reject) => {
            try {
                const permission = await this.model.findOne({where: {subjects: subject}});
                resolve(permission)
            } catch (error) {
                reject(error)
            }
        })
    }

    async update(id, data) {
        return new Promise(async (resolve, reject) => {
            try {
                await this.model.update(data, {
                    where: {id: id}
                });
                const permissionUpdated = await this.model.findOne({where: {id: id}});
                resolve(permissionUpdated)
            } catch (error) {
                reject(error)
            }
        })
    }

    async delete(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const permission = await this.model.destroy({
                    where: {id: id}
                });
                resolve(permission)
            } catch (error) {
                reject(error)
            }
        })
    }
}

module.exports = PermissionRepositories

