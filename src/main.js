import { connectionFields } from './consts.js';
import Model from './model/first-model.js';
import getDestantionNameByID, { getAllRoutesOffers } from './model/task-api-getter.js';
import FilterPresenter from './presenter/filterPresenter.js';


const Modeler = new Model(...connectionFields);

document.querySelector('.trip-main__event-add-btn').disabled = true;

document
  .querySelector('.trip-events')
  .innerHTML += '<p class="trip-events__msg loading-animation">Loading...</p>';

Modeler
  .allRoutes()
  .then((routes) => {
    getAllRoutesOffers()
      .then((offers) => {
        getDestantionNameByID()
          .then((allDestanation) => {
            document.querySelector('.trip-events__msg').remove();

            const filterPresenter = new FilterPresenter(routes, offers, allDestanation);
            filterPresenter.init();
          });
      });
  });
