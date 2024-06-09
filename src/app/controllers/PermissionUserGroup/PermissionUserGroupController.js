const PermissionUserGroupService = require('../../../../domain/services/PermissionUserGroup/PermissionUserGroupServices');

class PermissionUserGroupController {
  constructor() {
    this.permissionUserGroupService = new PermissionUserGroupService();
    this.create = this.create.bind(this);
    this.findAll = this.findAll.bind(this);
    this.findOne = this.findOne.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async create(request, response) {
    const { id_usergroup, id_permission } = request.body;
    const permissionUserGroup = await this.permissionUserGroupService.create({
      id_usergroup,
      id_permission,
    });
    return response.status(201).json(permissionUserGroup);
  }

  async findAll(request, response) {
    const permissionUserGroups =
      await this.permissionUserGroupService.findAll();
    return response.status(200).json(permissionUserGroups);
  }

  async findOne(request, response) {
    const { id } = request.params;
    const permissionUserGroup =
      await this.permissionUserGroupService.findOne(id);
    return response.status(200).json(permissionUserGroup);
  }

  async update(request, response) {
    const { id } = request.params;
    const { id_usergroup, id_permission } = request.body;
    const permissionUserGroup = await this.permissionUserGroupService.update(
      id,
      { id_usergroup, id_permission },
    );
    return response.status(200).json(permissionUserGroup);
  }

  async delete(request, response) {
    const { id } = request.params;
    const permissionUserGroup =
      await this.permissionUserGroupService.delete(id);
    return response.status(200).json(permissionUserGroup);
  }
}

module.exports = PermissionUserGroupController;
