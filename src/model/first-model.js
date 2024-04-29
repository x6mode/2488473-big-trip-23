import getRandomRoute from '../mock/mock-data';

export default class Model {
  routes = Array.from({length: 5}, getRandomRoute);

  getRoutes() {
    return this.routes;
  }
}
