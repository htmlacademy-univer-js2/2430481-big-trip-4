import { OFFERS } from '../const.js';

class Offer {
  title = null;
  price = 0;
  isChecked = false;
  #id = null;

  constructor(title, price) {
    this.title = title;
    this.price = price;
    this.#id = crypto.randomUUID();
  }
}

function generateOffer(type) {
  return OFFERS.get(type);
}

export { generateOffer, Offer };
