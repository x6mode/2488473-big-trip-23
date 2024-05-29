import RouteView from '../view/point-route';
import EditView from '../view/edit-point';
import OffersView from '../view/offers-list';
import DestionationView from '../view/destination-legend';
import { render, replace } from '../framework/render';
import { isEscape } from '../utils';
import flatpickr from 'flatpickr';
import { removeRoute } from '../model/task-api-getter';

export default class RoutePresenter {
  #route = null;
  #allOffers = null;
  #state = null;
  #container = document.querySelector('.trip-events__list');

  constructor({ route, offers }) {
    this.#allOffers = offers;
    this.#route = route;
    this.routeView = new RouteView({ route: this.#route, allOffers: this.#allOffers
      .filter((item) => item.type === this.#route.type) });
    this.editView = new EditView({ routesEdit: this.#route });
    this.destionationView = new DestionationView('./src/route-presenter.js | 20 line | this is test sets by <--- this');
    this.offersView = new OffersView({
      selected: this.#route.offers,
      typedAll: this.#allOffers
        .filter((item) => item.type === this.#route.type)
    });
  }

  getDatepickerOptions = (type) => ({
    defaultDate: this.#route[type],
    enableTime: true,
    // eslint-disable-next-line camelcase
    time_24hr: true,
    dateFormat: 'd/m/y H:i'
  });

  initFlatpickr () {
    flatpickr(document.querySelector('#event-start-time-1'),
      this.getDatepickerOptions('dateFrom'));

    flatpickr(document.querySelector('#event-end-time-1'),
      this.getDatepickerOptions('dateTo'));
  }

  #toggleFavorite = () => {

    this.#route.isFavorite = !this.#route.isFavorite;
    const newRouteView = new RouteView({ route: this.#route, allOffers: this.#allOffers
      .filter((item) => item.type === this.#route.type)});
    this.editView = new EditView({ routesEdit: this.#route });

    replace(newRouteView, this.routeView);
    this.#state = 'VIEW';

    this.routeView = newRouteView;
    this.#rollupSubscribe();
  };

  keydownHandlerClose = (evt) => {
    if (isEscape(evt)) {
      try {
        replace(this.routeView, this.editView);
        this.#state = 'VIEW';
      } catch { /* empty */ }
    }

    document.removeEventListener('keydown', this.keydownHandlerClose);
  };

  #editViewSubscribe = () => {
    this.editView.element
      .querySelector('.event__rollup-btn')
      .addEventListener('click', () => {
        try {
          replace(this.routeView, this.editView);
          this.editView.element.querySelector('.event__details').innerHTML = '';
          this.#state = 'VIEW';
        } catch { /* empty */ }
      });

    this.routeView.element
      .querySelector('.event__favorite-btn')
      .addEventListener('click', this.#toggleFavorite);

    document.addEventListener('keydown', this.keydownHandlerClose);
  };

  #rollupSubscribe = () => {
    this.routeView.element
      .querySelector('.event__rollup-btn')
      .addEventListener('click', () => {
        try {
          replace(this.editView, this.routeView);
          this.editView
            .element
            .querySelector('.event__reset-btn')
            .addEventListener('click', (evt) => {
              evt.target.textContent = 'Deleting...';
              removeRoute(this.#route.id)
                .then((data) => {
                  if (data.status === 204) {
                    this.editView.element.remove();
                    document.removeEventListener('keydown', this.keydownHandlerClose);
                  }
                })
                .catch(() => this.editView.shake(() => {}));
            });

          const eventDetails = this.editView.element.querySelector('.event__details');
          render(this.destionationView, eventDetails);
          render(this.offersView, eventDetails, 'afterbegin');
        } catch { /* empty */ }
        this.#state = 'EDIT';

        this.initFlatpickr();
        this.#editViewSubscribe();
      });
  };

  setStateView = () => {
    if (this.#state === 'EDIT') {
      try {
        replace(this.routeView, this.editView);
      } catch { /* empty */ }
      this.#state = 'VIEW';
      this.#rollupSubscribe();
    }
  };

  render = () => {
    this.routeView.element
      .querySelector('.event__favorite-btn')
      .addEventListener('click', this.#toggleFavorite);

    render(this.routeView, this.#container);
    this.#rollupSubscribe();

    this.#state = 'VIEW';
  };
}
