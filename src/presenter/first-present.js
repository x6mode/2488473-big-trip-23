import { render } from '../render.js';
import RouteView from '../view/point-route.js';


export default class Presenter {
  constructor({routes}) {
    this.routes = routes;
  }

  init() {
    for (let i = 0; i < this.routes.length; i++) {
      render(new RouteView({route: this.routes[i]}), document.querySelector('.trip-events__list'));
    }
  }
}
