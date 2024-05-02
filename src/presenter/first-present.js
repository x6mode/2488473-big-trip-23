import { render } from '../render.js';
import RouteView from '../view/point-route.js';
import EditView from '../view/edit-point.js';

export default class Presenter {
  constructor({ routes, routesEdit }) {
    this.routes = routes;
    this.routesEdit = routesEdit;
  }

  init() {
    this.routes.forEach((el) => render(new RouteView({ route: el }), document.querySelector('.trip-events__list')));

    render(new EditView({ routesEdit: this.routesEdit }), document.querySelector('.trip-events__list'));
  }
}
