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
    console.log('here 1');
    const { data } = await this.get('user');
    console.log('here 2');
    return data.user;
  }
}

module.exports = UserAPI;
