import RouteView from '../view/point-route';
import EditView from '../view/edit-point';
import { render, replace } from '../framework/render';
import { isEscape } from '../utils';

export default class RoutePresenter {
  #route = null;
  #container = document.querySelector('.trip-events__list');

  constructor({ route }) {
    this.#route = route;
    this.routeView = new RouteView({ route: this.#route });
    this.editView = new EditView({ routesEdit: this.#route });
  }

  keydownHandlerClose = (evt) => {
    if (isEscape(evt)) {
      try {
        replace(this.routeView, this.editView);
      } catch {}
    }

    document.removeEventListener('keydown', this.keydownHandlerClose);
  };

  #rolldownSubscribe = () => {
    this.editView.element
      .querySelector('.event__rollup-btn')
      .addEventListener('click', () => {
        try {
          replace(this.routeView, this.editView);
        } catch {}
      });

    document.addEventListener('keydown', this.keydownHandlerClose);
  };

  #rollupSubscribe = () => {
    this.routeView.element
      .querySelector('.event__rollup-btn')
      .addEventListener('click', () => {
        replace(this.editView, this.routeView);

        this.#rolldownSubscribe();
      });
  };

  render = () => {
    this.#rollupSubscribe();

    render(this.routeView, this.#container);
  };
}
