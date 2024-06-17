import TopFrame from '../view/top-frame';
import { render } from '../framework/render';
import UiBlocker from '../framework/ui-blocker/ui-blocker';
import FilterView from '../view/list-filter';
import SortView from '../view/list-sort';
import NewRouteView from '../view/new-point';
import DestinationPhotoView from '../view/destination-photo';
import DestinationView from '../view/destination-legend';
import OffersView from '../view/offers-list';
import Presenter from './first-present';
import { FilterFunc, SortFunc } from '../consts';
import dayjs from 'dayjs';
import { getAllOffers } from '../utils';
import { createRoute } from '../model/task-api-getter';
import { replace } from '../framework/render';
import flatpickr from 'flatpickr';

export default class HeadPresenter {
  #routes = null;
  #offers = null;
  #destinations = null;
  #_original = null;

  #_sort = 'DAY';
  #_filter = 'EVERYTHING';

  #offersViewNR = null;
  #legendViewNR = null;
  #photoViewNR = null;

  #routeInstanse = [];

  #filterView = null;

  #uiBlocker = new UiBlocker({
    lowerLimit: 0,
    upperLimit: 1000
  });

  #topFrame = null;

  constructor(routes, offers, destinations) {
    this.#_original = routes;
    this.#routes = this.#_original.slice();
    this.#offers = offers;
    this.#destinations = destinations;
    this.routerInstanse = null;
    this.#filterView = new FilterView();
  }

  #patchRoute = (type, ID = null, newInfo = null) => {
    if (type === 'PATCH') {
      this.#routes.map((item, index) => {
        if (item.id === ID) {
          this.#routes[index] = newInfo;
        }
      });
      this.#_original.map((item, index) => {
        if (item.id === ID) {
          this.#_original[index] = newInfo;
          this.#changeTotalPrice();
          this.#deactivateFilter();
        }
      });
    } else if (type === 'DELETE') {
      this.#routes.map((item, index) => {
        if (item.id === ID) {
          delete this.#routes[index];
        }
      });
      this.#_original.map((item, index) => {
        if (item.id === ID) {
          delete this.#_original[index];
          this.#changeTotalPrice();
          this.#deactivateFilter();
        }
      });
    } else if (type === 'CREATE') {
      this.#routes.push(newInfo);
      this.#_original.push(newInfo);
      this.#changeTotalPrice();
      this.#deactivateFilter();
    }
  };

  #clearLastRoutesPresenter = () => {
    document.querySelector('.trip-events__list').innerHTML = '';
  };

  #changeTotalPrice = () => {
    this.#topFrame.element
      .querySelector('.trip-info__cost-value')
      .textContent = this.#_original.reduce((currentSum, item) => currentSum + item.basePrice, 0);
  };


  // -- HANDLERS -- //

  #handleSortClick = (evt) => {
    document.querySelector('.trip-main__event-add-btn').disabled = false;
    this.#clearLastRoutesPresenter();
    evt.target.checked = true;
    this.currentSort = evt.target.value.toUpperCase();
    this.#buildAllRoutes(this.#routes.slice().sort(SortFunc[evt.target.value.toUpperCase()]));
  };

  #handleFilterClick = (evt) => {
    document.querySelector('#sort-day').checked = true;
    this.#routes = this.#_original.slice().reverse().filter(FilterFunc[evt.target.value.toUpperCase()]);
    document.querySelector('.trip-main__event-add-btn').disabled = false;
    this.#clearLastRoutesPresenter();
    this.#buildAllRoutes(this.#routes);
  };

  // -- BUILDERS -- //

  #buildTopFrame = () => {
    this.#topFrame = new TopFrame({
      allRoutes: this.#routes,
      allDestination: this.#destinations
    });

    render(this.#topFrame, document.querySelector('.trip-main'), 'afterbegin');
  };

  #deactivateFilter = () => {
    this.#filterView.element
      .querySelectorAll('.trip-filters__filter-input')
      .forEach((node) => {
        if (this.#_original.slice().filter(FilterFunc[node.value.toUpperCase()]).length === 0) {
          node.disabled = true;
        }
      });
  };

  #buildFilter = () => {
    render(this.#filterView, document.querySelector('.trip-controls'));

    this.#filterView.element
      .querySelectorAll('.trip-filters__filter-input')
      .forEach((node) => {
        if (this.#_original.slice().filter(FilterFunc[node.value.toUpperCase()]).length === 0) {
          node.disabled = true;
        }
        node.addEventListener('click', this.#handleFilterClick);
      });
  };

  #buildSort = () => {
    const sortView = new SortView();
    render(sortView, document.querySelector('.trip-events'), 'afterbegin');

    sortView.element.querySelector('#sort-day').checked = true;

    sortView.element
      .querySelectorAll('.trip-sort__input--real')
      .forEach((node) => {
        node.addEventListener('click', this.#handleSortClick);
      });
  };

  #buildAllRoutes = (routes) => {
    const routesPresenter = new Presenter({
      routes: routes,
      offers: this.#offers,
      patchFunc: this.#patchRoute,
      uiBlocker: this.#uiBlocker
    });

    routesPresenter.init(this.#destinations);
    this.routerInstanse = routesPresenter;
  };


  #handleInputDestination = (thisDestination) => (evt) => {
    thisDestination = this.#destinations.filter((el) => el.name === evt.target.value)[0];

    if (typeof thisDestination !== 'undefined') {
      const newLegendComponent = new DestinationView(thisDestination.description);
      replace(newLegendComponent, this.#legendViewNR);
      this.#legendViewNR = newLegendComponent;

      const newPhotoComponent = new DestinationPhotoView(thisDestination.pictures);
      replace(newPhotoComponent, this.#photoViewNR);
      this.#photoViewNR = newPhotoComponent;
    }
  };

  #initFlatpickr = (component) => {
    flatpickr(component.element.querySelector('#event-start-time-1'),
      this.getDatepickerOptions());

    flatpickr(component.element.querySelector('#event-end-time-1'),
      this.getDatepickerOptions());
  };

  getDatepickerOptions = () => ({
    enableTime: true,
    // eslint-disable-next-line camelcase
    time_24hr: true,
    dateFormat: 'd/m/y H:i'
  });

  #handleClickEventType = (eventTypeToggler, eventTypeText, eventTypeIcon) => (evt) => {
    eventTypeToggler.checked = false;

    eventTypeText.textContent = evt.target.value;
    eventTypeIcon.src = `img/icons/${evt.target.value}.png`;

    const newOffersComponent = new OffersView([], this.#offers.filter((el) => el.type === evt.target.value));
    replace(newOffersComponent, this.#offersViewNR);
    this.#offersViewNR = newOffersComponent;
  };

  #initOffersChooserSubscribe = (container, component) => {
    this.#offersViewNR = new OffersView([], this.#offers.filter((el) => el.type === 'flight'));
    render(this.#offersViewNR, container);

    const eventTypeToggler = component.element.querySelector('.event__type-toggle');
    const eventTypeText = component.element.querySelector('.event__type-output');
    const eventTypeIcon = component.element.querySelector('.event__type-icon');

    component
      .element
      .querySelectorAll('.event__type-input')
      .forEach((nodeElem) => {
        nodeElem.addEventListener('click', this.#handleClickEventType(eventTypeToggler, eventTypeText, eventTypeIcon));
      });
  };

  #initDestInfoChooserSubscribe = (container, thisDestination, component) => {

    this.#legendViewNR = new DestinationView(thisDestination === '' ? '' : thisDestination.description);
    render(this.#legendViewNR, container);

    this.#photoViewNR = new DestinationPhotoView(thisDestination === '' ? [] : thisDestination.pictures);
    render(this.#photoViewNR, container);

    const inputEventName = component.element.querySelector('#event-destination-1');

    const datalistContainer = component.element.querySelector('#destination-list-1');

    datalistContainer.innerHTML = '';
    this.#destinations.forEach((item) => {
      datalistContainer.innerHTML += `<option value='${item.name}'></option>`;
    });

    inputEventName.addEventListener('input', this.#handleInputDestination(thisDestination));
  };

  #buildBtnCreateRoute = () => {
    const addEventBtn = document.querySelector('.trip-main__event-add-btn');
    addEventBtn.disabled = false;

    addEventBtn.addEventListener('click', () => {
      this.routerInstanse.closeAllRoutes();
      const newRouteView = new NewRouteView(this.#offers);

      const container = newRouteView.element
        .querySelector('.event__details');

      render(newRouteView, document.querySelector('.trip-events__list'), 'afterbegin');
      newRouteView.init();

      this.#initFlatpickr(newRouteView);
      this.#initOffersChooserSubscribe(container, newRouteView);
      this.#initDestInfoChooserSubscribe(container, '', newRouteView);

      newRouteView
        .element
        .querySelector('.event__save-btn')
        .addEventListener('click', (evt) => {
          evt.preventDefault();
          const newRoute = {
            basePrice: Number(newRouteView.element.querySelector('#event-price-1').value),
            dateFrom: dayjs(newRouteView.element.querySelector('#event-start-time-1')._flatpickr.selectedDates).toJSON(),
            dateTo: dayjs(newRouteView.element.querySelector('#event-end-time-1')._flatpickr.selectedDates).toJSON(),
            destination: newRouteView.element.querySelector('#event-destination-1').value,
            isFavorite: false,
            type: newRouteView.element.querySelector('.event__type-output').textContent.toLowerCase(),
            offers: getAllOffers(newRouteView.element.querySelectorAll('.event__offer-checkbox:checked'))
          };

          createRoute(newRoute, this.#destinations)
            .then(() => {
              this.#patchRoute('CREATE', null, newRoute);
              this.#clearLastRoutesPresenter();
              this.#buildAllRoutes(
                this.#_original
                  .slice()
                  .filter(FilterFunc[this.#_filter.toUpperCase()])
                  .sort(SortFunc[this.#_sort.toUpperCase()]
                  ));
              addEventBtn.disabled = false;
            })
            .catch(() => {
              newRouteView.shake();
            });
        });
    });
  };


  build () {
    this.#buildTopFrame();
    this.#buildFilter();
    this.#buildSort();

    this.#buildAllRoutes(this.#routes.slice());

    this.#buildBtnCreateRoute();
  }
}
