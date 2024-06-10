import Presenter from './first-present';
import SortView from '../view/list-sort';
import { render } from '../framework/render';

export default class sortPresenter {
  routes = null;
  offers = null;
  allDestanation = null;
  headPresenter = null;
  sortView = null;
  sortDay = null;
  sortTime = null;
  sortPrice = null;

  currentSort = null;

  constructor(routes, offers, allDestanation) {
    this.routes = routes;
    this.offers = offers;
    this.allDestanation = allDestanation;
    this.sortView = new SortView();

    this.sortTime = null;
    this.headPresenter = null;

    this.currentSort = 'sort-day';
  }

  patchRoute = (type, ID, newInfo = null) => {
    if (type === 'PATCH') {
      this.routes.map((item, index) => {
        if (item.id === ID) {
          this.routes[index] = newInfo;
        }
      });
    } else if (type === 'DELETE') {
      this.routes.map((item, index) => {
        if (item.id === ID) {
          delete this.routes[index];
        }
      });
    }
  };

  initHeadPresenter = (routes, bool) => {
    // console.log(this.routes.filter((item) => item.id === 'e5f381e6-ebe0-4ae4-a569-cae0f54b569c'));
    if (bool) {
      document.querySelectorAll('.trip-main__trip-info').forEach((el) => el.remove());
      document.querySelectorAll('.trip-controls__filters').forEach((el) => el.remove());
      document.querySelector('.trip-events__list').innerHTML = '';
    }

    this.headPresenter = new Presenter({
      routes: routes,
      offers: this.offers,
      original: this.routes.slice(),
      patchFunc: this.patchRoute
    });

    this.headPresenter.init(this.allDestanation);
  };


  handleSortClick (type) {
    if (type === 'sort-day') {
      return (evt) => {
        evt.target.checked = true;
        this.currentSort = 'sort-day';
        this.initHeadPresenter(this.routes.slice().reverse(), true);
      };
    } else if (type === 'sort-time') {
      return (evt) => {
        evt.target.checked = true;
        this.currentSort = 'sort-time';
      };
    } else if (type === 'sort-price') {
      return (evt) => {
        evt.target.checked = true;
        this.currentSort = 'sort-price';
        this.initHeadPresenter(this.routes.slice().sort((a, b) => b.basePrice - a.basePrice), true);
      };
    }
  }

  init () {
    render(this.sortView, document.querySelector('.trip-events'), 'afterbegin');
    document.querySelector('#sort-day').checked = true;
    this.initHeadPresenter(this.routes.slice().reverse(), false);

    this.sortView
      .element
      .querySelectorAll('.trip-sort__input--real')
      .forEach((nodeElem) => {
        nodeElem.addEventListener('change', this.handleSortClick(nodeElem.id));
      });
  }
}
