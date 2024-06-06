import RouteView from '../view/point-route';
import EditView from '../view/edit-point';
import DestionationView from '../view/destination-legend';
import { render, remove, replace } from '../framework/render';
import { isEscape } from '../utils';
import flatpickr from 'flatpickr';
import { removeRoute } from '../model/task-api-getter';
import offersView from '../view/offers-list';
import DestionationPhotoView from '../view/destionation-photo';

export default class RoutePresenter {
  #container = document.querySelector('.trip-events__list');
  #state = undefined;

  #offers = null;

  #route = null;

  #routeView = null;
  #editView = null;


  // #allOffers = null;
  // #state = null;
  // #allDestanation = null;


  constructor({ route, offers }) {
    this.#offers = offers;

    this.#route = route;

    this.#routeView = new RouteView(this.#route, this.#offers
      .filter((el) => el.type === this.#route.type));
    this.#editView = new EditView(this.#route);


    // this.#allDestanation = allDestanation;
    // this.#allOffers = offers;
    // this.#route = route;
    // // this.routeView = new RouteView({ route: this.#route, allOffers: this.#allOffers
    // //   .filter((item) => item.type === this.#route.type) });
    // this.editView = new EditView(this.#route);
    // this.offersView = new offersView({
    //   selected: this.#route.offers,
    //   typedAll: this.#allOffers
    //     .filter((item) => item.type === this.#route.type)
    // });
  }

  // -- SPEC -- //

  #routeViewPackSubscribe = () => {
    this.#favoriteRouteViewSubscribe();
    this.#openEditViewSubscribe();
    // ...more
  };

  #editViewSubscribe = () => {
    this.#openRouteViewSubscribe();
  };

  // -- HELPFUL FUNC -- //

  #reRenderRouteView = () => {
    const newRouteView = new RouteView(this.#route, this.#offers.filter((el) => el.type === this.#route.type));

    replace(newRouteView, this.#routeView);
    this.#routeView = newRouteView;

    this.#routeViewPackSubscribe();
    this.#state = 'VIEW';
  };

  #switchViewToEdit = () => {
    replace(this.#editView, this.#routeView);
    this.#state = 'EDIT';

    this.#editViewSubscribe();
  };

  #switchEditToView = () => {
    replace(this.#routeView, this.#editView);
    this.#state = 'VIEW';

    this.#routeViewPackSubscribe();
  };

  // -- MODEL EDIT -- //

  #toggleFavorite = () => {
    this.#route.isFavorite = !this.#route.isFavorite;

    this.#reRenderRouteView();
  };


  // -- SUBSCRIBERS -- //

  #favoriteRouteViewSubscribe = () => {
    this.#routeView
      .element
      .querySelector('.event__favorite-btn')
      .addEventListener('click', this.#toggleFavorite);
  };

  #openEditViewSubscribe = () => {
    this.#routeView
      .element
      .querySelector('.event__rollup-btn')
      .addEventListener('click', this.#switchViewToEdit);
  };

  #openRouteViewSubscribe = () => {
    this.#editView
      .element
      .querySelector('.event__rollup-btn')
      .addEventListener('click', this.#switchEditToView);
  };

  // -- INIT -- //

  render = () => {
    render(this.#routeView, this.#container);
    this.#state = 'VIEW';

    this.#routeViewPackSubscribe();
  };


  // getDatepickerOptions = (type) => ({
  //   defaultDate: this.#route[type],
  //   enableTime: true,
  //   // eslint-disable-next-line camelcase
  //   time_24hr: true,
  //   dateFormat: 'd/m/y H:i'
  // });

  // initFlatpickr = () => {
  //   flatpickr(document.querySelector('#event-start-time-1'),
  //     this.getDatepickerOptions('dateFrom'));

  //   flatpickr(document.querySelector('#event-end-time-1'),
  //     this.getDatepickerOptions('dateTo'));
  // };

  // #toggleFavorite = () => {

  //   this.#route.isFavorite = !this.#route.isFavorite;
  //   const newRouteView = new RouteView({ route: this.#route, allOffers: this.#allOffers
  //     .filter((item) => item.type === this.#route.type)});
  //   this.editView = new EditView({ routesEdit: this.#route });

  //   replace(newRouteView, this.routeView);
  //   this.#state = 'VIEW';

  //   this.routeView = newRouteView;
  //   this.#rollupSubscribe();
  // };

  // keydownHandlerClose = (evt) => {
  //   if (isEscape(evt)) {
  //     try {
  //       replace(this.routeView, this.editView);
  //       this.#state = 'VIEW';
  //     } catch { /* empty */ }
  //   }

  //   document.removeEventListener('keydown', this.keydownHandlerClose);
  // };

  // #editViewSubscribe = () => {
  //   this.editView.element
  //     .querySelector('.event__rollup-btn')
  //     .addEventListener('click', () => {
  //       try {
  //         replace(this.routeView, this.editView);
  //         this.editView.element.querySelector('.event__details').innerHTML = '';
  //         this.#state = 'VIEW';
  //       } catch { /* empty */ }
  //     });

  //   this.routeView.element
  //     .querySelector('.event__favorite-btn')
  //     .addEventListener('click', this.#toggleFavorite);

  //   document.addEventListener('keydown', this.keydownHandlerClose);
  // };

  // #rollupSubscribe () {
  //   this.routeView.element
  //     .querySelector('.event__rollup-btn')
  //     .addEventListener('click', () => {
  //       try {
  //         const eventDetails = this.editView.element.querySelector('.event__details');
  //         const destinationView = new DestionationView(this.#allDestanation.filter((item) => item.name === this.#route.destination)[0].description);
  //         const destinationPhotoView = new DestionationPhotoView(this.#allDestanation.filter((item) => item.name === this.#route.destination)[0].pictures);
  //         try {
  //           replace(this.editView, this.routeView);
  //           this.initFlatpickr();
  //           this.#editViewSubscribe();
  //           this.#state = 'EDIT';
  //         } catch { /* empty */ }
  //         eventDetails.innerHTML = '';
  //         render(destinationView, eventDetails);
  //         render(destinationPhotoView, eventDetails);
  //         this.offersView = new offersView({
  //           selected: this.#route.offers,
  //           typedAll: this.#allOffers
  //             .filter((item) => item.type === this.#route.type)
  //         });
  //         render(this.offersView, eventDetails, 'afterbegin');

  //         let typeCopy = null;

  //         this.editView.element.querySelector('.event__type-icon').src = `img/icons/${this.#route.type}.png`;
  //         this.editView.element.querySelector('.event__type-output').textContent = this.#route.type;

  //         this.editView
  //           .element
  //           .querySelectorAll('.event__type-input')
  //           .forEach((item) => {
  //             if (item.value === this.#route.type) {
  //               item.checked = true;
  //             }

  //             item.addEventListener('click', (evt) => {
  //               document.querySelector('#event-type-toggle-1').checked = false;

  //               this.editView.element.querySelector('.event__type-icon').src = `img/icons/${evt.target.value}.png`;
  //               this.editView.element.querySelector('.event__type-output').textContent = evt.target.value;
  //               typeCopy = evt.target.value;


  //               if (evt.target.value !== 'sightseeing') {
  //                 this.offersView.element.remove();

  //                 this.offersView = new offersView({
  //                   selected: [],
  //                   typedAll: this.#allOffers.filter((el) => el.type === evt.target.value)
  //                 });
  //                 render(this.offersView, this.editView.element.querySelector('.event__details'), 'afterbegin');
  //               } else {
  //                 this.offersView.element.remove();
  //               }
  //             });
  //           });

  //         this.editView
  //           .element
  //           .querySelector('.event__save-btn')
  //           .addEventListener('click', (evt) => {
  //             evt.preventDefault();
  //             try {
  //               this.offersView.element.remove();
  //               this.#route.type = typeCopy;
  //               this.routeView = new RouteView({ route: this.#route, allOffers: this.#allOffers
  //                 .filter((item) => item.type === this.#route.type) });
  //               replace(this.routeView, this.editView);
  //               this.#rollupSubscribe();
  //               this.editView.element.querySelector('.event__details').innerHTML = '';
  //               this.#state = 'VIEW';
  //             } catch { /* empty */ }
  //           });

  //         this.editView
  //           .element
  //           .querySelector('#event-destination-1')
  //           .addEventListener('input', (evt) => {
  //             this.editView.element.querySelector('#event-destination-1').value = evt.target.value;

  //             // for (let i = 0; i < allDestanation.length; i++) {
  //             //   if (allDestanation[i].name === evt.target.value && allDestanation[i].description !== '') {
  //             //     if (this.#destionationPhotoView) {
  //             //       this.#destionationPhotoView.element.remove();
  //             //     }
  //             //     if (this.#destionationView) {
  //             //       this.#destionationView.element.remove();
  //             //     }
  //             //     this.#destionationView = new DestionationView(allDestanation[i].description);
  //             //     render(this.#destionationView, newRouteView.element.querySelector('.event__details'));

  //             //     if (allDestanation[i].pictures.length > 0) {
  //             //       this.#destionationPhotoView = new DestionationPhotoView(allDestanation[i].pictures);
  //             //       render(this.#destionationPhotoView, newRouteView.element.querySelector('.event__section--destination'));
  //             //     }
  //             //   } else if (allDestanation[i].name === evt.target.value && allDestanation[i].description === '') {
  //             //     if (this.#destionationPhotoView) {
  //             //       this.#destionationPhotoView.element.remove();
  //             //     }
  //             //     if (this.#destionationView) {
  //             //       this.#destionationView.element.remove();
  //             //     }
  //             //   }
  //             // }
  //           });

  //         this.editView
  //           .element
  //           .querySelector('.event__reset-btn')
  //           .addEventListener('click', (evt) => {
  //             evt.target.textContent = 'Deleting...';
  //             removeRoute(this.#route.id)
  //               .then((data) => {
  //                 if (data.status === 204) {
  //                   this.editView.element.remove();
  //                   document.removeEventListener('keydown', this.keydownHandlerClose);
  //                 }
  //               })
  //               .catch(() => this.editView.shake(() => {}));
  //           });
  //         this.#state = 'EDIT';
  //       } catch { /** empty */ }
  //     });
  // }

  // setStateView = () => {
  //   if (this.#state === 'EDIT') {
  //     try {
  //       replace(this.routeView, this.editView);
  //     } catch { /* empty */ }
  //     this.#state = 'VIEW';
  //     this.#rollupSubscribe();
  //   }
  // };

  // render = () => {
  //   this.routeView.element
  //     .querySelector('.event__favorite-btn')
  //     .addEventListener('click', this.#toggleFavorite);

  //   render(this.routeView, this.#container);
  //   this.#rollupSubscribe();

  //   this.#state = 'VIEW';
  // };
}
