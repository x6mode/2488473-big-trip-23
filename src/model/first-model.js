import ApiService from '../framework/api-service';
import getRandomRoute, { mockRoutesEdit } from '../mock/mock-data';

export default class Model extends ApiService{

  async allRoutes () {
    return await this._load({url: 'big-trip/points'})
      .then(ApiService.parseResponse)
      .then((data) => data.map(this.#adaptToClient));
  }

  #adaptToClient (route) {
    const adaptedRoute = {
      ...route,
      basePrice: route['base_price'],
      dateFrom: route['date_from'],
      dateTo: route['date_to'],
      isFavorite: route['is_favorite']
    };

    delete adaptedRoute['base_price'];
    delete adaptedRoute['date_from'];
    delete adaptedRoute['date_to'];
    delete adaptedRoute['is_favorite'];

    return adaptedRoute;
  }

  routes = Array.from({length: 5}, getRandomRoute);
  routesEdit = mockRoutesEdit;

  getRoutes() {
    return this.routes;
  }

  getRoutesEdit() {
    return this.routesEdit;
  }
}
