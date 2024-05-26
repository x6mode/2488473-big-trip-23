import AbstractStatefulView from '../framework/view/abstract-view.js';
import { eventTypes } from '../consts.js';

function createEventTypeTemplate(selectedType = '') {
  let result = '';

  for (let i = 0; i < eventTypes.length; i++) {
    result += `
    <div class="event__type-item">
      <input id="event-type-${eventTypes[i]}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${eventTypes[i]}" ${eventTypes[i] === selectedType ? 'checked' : ''}>
      <label class="event__type-label  event__type-label--${eventTypes[i]}" for="event-type-${eventTypes[i]}-1 upcs">${eventTypes[i]}</label>
    </div>
    `;
  }

  return result;
}

function createEditTemplate(data) {

  return `
  <li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${data.type}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>
              ${createEventTypeTemplate(data.type)}
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output upcs" for="event-destination-1">
            ${data.type}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${data.destination}" list="destination-list-1">
          <datalist id="destination-list-1">
            <option value="Amsterdam"></option>
            <option value="Geneva"></option>
            <option value="Chamonix"></option>
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${data.dateFrom}">
          &mdash;
          <label class="visually-hidden" for=
          console.log(all[0].offers.length)"event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${data.dateTo}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${data.basePrice}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details"></section>
    </form>
  </li>`;
}

export default class EditView extends AbstractStatefulView {
  constructor ({ routesEdit }) {
    super();
    this.routesEdit = routesEdit;
  }

  get template () {
    return createEditTemplate(this.routesEdit);
  }
}
