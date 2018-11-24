const { RESTDataSource } = require('apollo-datasource-rest');

class BudgetAPI extends RESTDataSource {
  constructor() {
    super();

    this.baseURL = 'https://api.youneedabudget.com/v1/';
  }

  willSendRequest(req) {
    req.headers.set('Authorization', `Bearer ${this.context.token}`);
  }

  async getBudgets() {
    const { data } = await this.get('budgets');

    return data.budgets;
  }

  async getBudget(id) {
    const { data } = await this.get(`budget/${id}`);

    return data.budget;
  }
}

module.exports = BudgetAPI;
