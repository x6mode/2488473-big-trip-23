import RouteView from '../view/point-route';
import EditView from '../view/edit-point';
import { render, replace } from '../framework/render';
import { isEscape } from '../utils';

export default class RoutePresenter {
  #route = null;
  #container = document.querySelector('.trip-events__list');

  constructor({ route }) {
    this.#route = route;
  }

  #submitHandler(evt) {
    evt.preventDefault();
  }

  #clickHandlerClose = (routeView, editView) => () => {
    try {
      replace(routeView, editView);
      document.removeEventListener('keydown', this.#keydownHandlerClose);
    } catch {
      document.removeEventListener('keydown', this.#keydownHandlerClose);
    }
  };


  #keydownHandlerClose = (routeView, editView) => (evt) => {
    if (isEscape(evt)) {
      try {
        replace(routeView, editView);
        document.removeEventListener('keydown', this.#keydownHandlerClose);
      } catch {
        document.removeEventListener('keydown', this.#keydownHandlerClose);
      }
    }
  };

  #rollupSubscribe = (routeView, editView) => {
    routeView.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replace(editView, routeView);

      editView.element.querySelector('.event__save-btn').addEventListener('click', this.#submitHandler);
      editView.element.querySelector('.event__rollup-btn').addEventListener('click', this.#clickHandlerClose(routeView, editView));

      document.addEventListener('keydown', this.#keydownHandlerClose(routeView, editView));
    });
  };

  #favoriteSubscribe = (routeView, editView) => {
    routeView.element.querySelector('.event__favorite-btn').addEventListener('click', () => {
      console.log('hook');
      this.#route.isFavorite = !this.#route.isFavorite;
      console.log(this.#route.isFavorite);

      const routeView1 = new RouteView({ route: this.#route });
      replace(routeView1, routeView);
      this.#rollupSubscribe(routeView1, editView);
    });
  };

  render = () => {
    const routeView = new RouteView({ route: this.#route });
    const editView = new EditView({ routesEdit: this.#route });

    this.#favoriteSubscribe(routeView, editView);
    this.#rollupSubscribe(routeView, editView);

    render(routeView, this.#container);
  };
}
