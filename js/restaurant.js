import { Coordinate } from "./Coordinate.js";

class Restaurant {
  constructor(name) {
    this.name = name;
    this.description = "";
    this.location = new Coordinate();
  }
  getName() {
    return this.name;
  }
  setName(name) {
    this.name = name;
  }

  getDescription() {
    return this.description;
  }
  setDescription(desc) {
    this.description = desc;
  }
  toString() {
    return `Category: ${this.name}` + " "`Description: ${this.description}`;
  }

  getLocation() {
    return `${this.location.getLatitude()} , ${this.location.getLongitude()}`;
  }
}

export { Restaurant };
