import { render } from '../render.js';
import EditView from '../view/edit-point.js';
import RouteView from '../view/point-route.js';


export default class Presenter {

  init() {
    for (let i = 0; i < 3; i++) {
      render(new RouteView(), document.querySelector('.trip-events__list'));
    }

    render(new EditView(), document.querySelector('.trip-events__list'), 'afterbegin');
  }
}
