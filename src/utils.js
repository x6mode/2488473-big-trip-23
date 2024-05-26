
function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getRandomNumber(min, max) {
  return min + Math.random() * (max - min);
}

function isEscape(evt) {
  if (evt.key === 'Escape') {
    return true;
  }

  return false;
}

export { getRandomArrayElement as default, getRandomNumber, isEscape };
