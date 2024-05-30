import RoutePresenter from './route-presenter.js';
import SortView from '../view/list-sort.js';
import FilterView from '../view/list-filter.js';
import DestionationPhotoView from '../view/destionation-photo.js';
import TopFrame from '../view/top-frame.js';
import NewRouteView from '../view/new-point.js';
import { render } from '../framework/render.js';
import offersView from '../view/offers-list.js';
import DestionationView from '../view/destination-legend.js';

export default class Presenter {
  #routes = null;
  #offers = null;
  #offersView = null;
  #destionationView = null;
  #destionationPhotoView = null;
  routesInstanse = [];

  constructor({ routes, offers }) {
    this.#routes = routes;
    this.#offers = offers;
    this.#offersView = new offersView({selected: [], typedAll: this.#offers.filter((item) => item.type === 'flight')});
    this.#destionationView = false;
    this.#destionationPhotoView = false;
  }

  closeAllRoutes = () => {
    this.routesInstanse.forEach((item) => {
      item.setStateView();
    });
  };

  init(allDestanation) {
    const addEventBtn = document.querySelector('.trip-main__event-add-btn');
    addEventBtn.disabled = false;

    const topFrame = new TopFrame({ allRoutes: this.#routes, allDestanation});
    render(topFrame, document.querySelector('.trip-main'), 'afterbegin');

    const filter = new FilterView();
    render(filter, document.querySelector('.trip-controls'));

    const sort = new SortView();
    render(sort, document.querySelector('.trip-events'), 'afterbegin');

    document.querySelector('#sort-day').checked = true;

    this.#routes.forEach((item) => {
      allDestanation.map((el) => {
        if (el.id === item.destination) {
          item.destination = el.name;
        }
      });

      const view = new RoutePresenter({ route: item, offers: this.#offers, allDestanation });
      this.routesInstanse.push(view);

      view.render();
    });

    addEventBtn.addEventListener('click', () => {
      this.closeAllRoutes();
      const newRouteView = new NewRouteView(this.#offers);

      render(newRouteView, document.querySelector('.trip-events__list'), 'afterbegin');
      newRouteView.init();

      this.#offersView = new offersView({selected: [], typedAll: this.#offers.filter((item) => item.type === 'flight')});
      render(this.#offersView, newRouteView.element.querySelector('.event__details'));
      const dotsRoutes = newRouteView.element.querySelector('#destination-list-1');

      allDestanation.forEach((item) => {
        const name = item.name;

        dotsRoutes.innerHTML += `<option value='${name}'></option>`;
      });

      newRouteView
        .element
        .querySelector('#event-destination-1')
        .addEventListener('input', (evt) => {
          newRouteView.element.querySelector('#event-destination-1').value = evt.target.value;

          for (let i = 0; i < allDestanation.length; i++) {
            if (allDestanation[i].name === evt.target.value && allDestanation[i].description !== '') {
              if (this.#destionationPhotoView) {
                this.#destionationPhotoView.element.remove();
              }
              if (this.#destionationView) {
                this.#destionationView.element.remove();
              }
              this.#destionationView = new DestionationView(allDestanation[i].description);
              render(this.#destionationView, newRouteView.element.querySelector('.event__details'));

              if (allDestanation[i].pictures.length > 0) {
                this.#destionationPhotoView = new DestionationPhotoView(allDestanation[i].pictures);
                render(this.#destionationPhotoView, newRouteView.element.querySelector('.event__section--destination'));
              }
            } else if (allDestanation[i].name === evt.target.value && allDestanation[i].description === '') {
              if (this.#destionationPhotoView) {
                this.#destionationPhotoView.element.remove();
              }
              if (this.#destionationView) {
                this.#destionationView.element.remove();
              }
            }
          }
        });

      newRouteView
        .element
        .querySelectorAll('.event__type-input')
        .forEach((item) => {
          item.addEventListener('click', (evt) => {
            document.querySelector('#event-type-toggle-1').checked = false;

            newRouteView.element.querySelector('.event__type-icon').src = `img/icons/${evt.target.value}.png`;
            newRouteView.element.querySelector('.event__type-output').textContent = evt.target.value;

            if (evt.target.value !== 'sightseeing') {
              this.#offersView.element.remove();

              this.#offersView = new offersView({
                selected: [],
                typedAll: this.#offers.filter((el) => el.type === evt.target.value)
              });
              render(this.#offersView, newRouteView.element.querySelector('.event__details'));
            } else {
              this.#offersView.element.remove();
            }
          });
        });
    });
  }
}
