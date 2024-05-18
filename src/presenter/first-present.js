import RoutePresenter from './route-presenter.js';
import SortView from '../view/list-sort.js';
import { render } from '../framework/render.js';

export default class Presenter {
  #routes = null;

  constructor({ routes }) {
    this.#routes = routes;
  }

  init() {
    this.#routes.forEach((item) => {
      const view = new RoutePresenter({ route: item });

      view.render();
    });

    const sort = new SortView();
    render(sort, document.querySelector('.trip-events'), 'afterbegin');
  }
}
