import { render } from '../render.js';
import RouteView from '../view/point-route.js';
import EditView from '../view/edit-point.js';


export default class Presenter {
  constructor({routes, routesEdit}) {
    this.routes = routes;
    this.routesEdit = routesEdit;
  }

  init() {
    for (let i = 0; i < this.routes.length; i++) {
      render(new RouteView({route: this.routes[i]}), document.querySelector('.trip-events__list'));
    }

    render(new EditView({routesEdit: this.routesEdit}), document.querySelector('.trip-events__list'));
  }
}
