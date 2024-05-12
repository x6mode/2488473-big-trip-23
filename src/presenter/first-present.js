import RoutePresenter from './route-presenter.js';

export default class Presenter {
  #routes = null;
  #container = document.querySelector('.trip-events__list');

  constructor({ routes }) {
    this.#routes = routes;
  }

  init() {
    this.#routes.forEach((item) => {
      const view = new RoutePresenter({ route: item });

      view.render();
    });
  }
}
