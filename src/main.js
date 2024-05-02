import Model from './model/first-model.js';
import Presenter from './presenter/first-present.js';

const Modeler = new Model();
const Present = new Presenter({routes: Modeler.getRoutes(), routesEdit: Modeler.getRoutesEdit()});

Present.init();
