import dayjs from 'dayjs';
import AbstractView from '../framework/view/abstract-view.js';

function getHeaderRow (destinations) {
  if (!destinations || !destinations.length) {
    return '';
  }

  if (destinations.length === 1) {
    return destinations[0];
  }

  if (destinations.length === 2) {
    return `${destinations[0]} - ${destinations[1]}`;
  }

  const first = destinations[0];
  const middle = destinations.slice(1, -1);
  const last = destinations.at(-1);

  return `${first} - ${middle.length === 1 ? middle[0] : '...'} - ${last}`;
}

function createTopFrameTemplate (cost, destination, dates) {

  const format = 'DD MMM';
  const firstDate = dayjs(dates.dateFrom[0]).format(format);
  const lastDate = dayjs(dates.dateTo[dates.dateTo.length - 1]).format(format);

  const formattedTitle = getHeaderRow(destination);

  return `
  <section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
    <h1 class="trip-info__title">${formattedTitle}</h1>

    <p class="trip-info__dates">${firstDate} - ${lastDate}</p>
    </div>

    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${cost}</span>
    </p>
  </section>`;
}

export default class TopFrame extends AbstractView {
  #cost = null;
  #datesTo = null;
  #datesFrom = null;
  #destination = null;

  constructor({ allRoutes, allDestination }) {
    super();
    this.#cost = allRoutes.reduce((currentSum, item) => currentSum + item.basePrice, 0);
    this.#destination = allDestination.map((item) => item.name);
    this.#datesTo = this.#unpackDate(allRoutes, 'dateTo');
    this.#datesFrom = this.#unpackDate(allRoutes, 'dateFrom');
  }

  #unpackDate (allRoutes, type) {
    return allRoutes.map((item) => item[type]);
  }

  get template() {
    return createTopFrameTemplate(this.#cost, this.#destination, {
      dateFrom: this.#datesFrom,
      dateTo: this.#datesTo
    });
  }
}
