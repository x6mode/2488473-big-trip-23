import getRandomRoute, { mockRoutesEdit } from '../mock/mock-data';

export default class Model {
  routes = Array.from({length: 5}, getRandomRoute);
  routesEdit = mockRoutesEdit;

  getRoutes() {
    return this.routes;
  }

  getRoutesEdit() {
    return this.routesEdit;
  }
}
