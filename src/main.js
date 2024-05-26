import { connectionFields } from './consts.js';
import Model from './model/first-model.js';
import getDestantionNameByID, { getAllRoutesOffers } from './model/task-api-getter.js';
import Presenter from './presenter/first-present.js';

const Modeler = new Model(...connectionFields);

Modeler
  .allRoutes()
  .then((routes) => {
    getAllRoutesOffers()
      .then((offers) => {
        getDestantionNameByID()
          .then((allDestanation) => {
            const Present = new Presenter({routes, offers});

            Present.init(allDestanation);
          });
      });
  });
