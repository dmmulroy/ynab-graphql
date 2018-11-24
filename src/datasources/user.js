const { RESTDataSource } = require('apollo-datasource-rest');

class UserAPI extends RESTDataSource {
  constructor() {
    super();

    this.baseURL = 'https://api.youneedabudget.com/v1/';
  }

  willSendRequest(req) {
    req.headers.set('Authorization', `Bearer ${this.context.token}`);
  }

  async getUserInfo() {
    const { data } = await this.get('user');

    return data.user;
  }
}

module.exports = UserAPI;
