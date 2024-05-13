import RoutePresenter from './route-presenter.js';

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
  }
}
