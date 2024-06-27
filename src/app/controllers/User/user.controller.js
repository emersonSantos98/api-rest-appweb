const UserService = require('../../../../domain/services/User/users.service');

class UserController {
  constructor() {
    this.userService = new UserService();
    this.create = this.create.bind(this);
    this.findAll = this.findAll.bind(this);
    this.findOne = this.findOne.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async create(request, response) {
    const user = await this.userService.create(request.body);
    return response.status(201).json(user);
  }

  async findAll(request, response) {
    const users = await this.userService.findAll(request.query);
    response.status(200).json(users);
  }

  async findOne(request, response) {
    const { userId } = request.user;

    const user = await this.userService.findOne(userId);
    return response.status(200).json(user);
  }

  async update(request, response) {
    const { id } = request.params;
    const user = await this.userService.update(id, request.body);
    return response.status(200).json(user);
  }

  async delete(request, response) {
    const { id } = request.params;
    const user = await this.userService.delete(id);
    return response.status(200).json(user);
  }
}

module.exports = UserController;
