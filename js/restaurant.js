import { Coordinate } from "./Coordinate.js";

class Restaurant {
  constructor(name) {
    if (!name || name.trim() === "") {
      throw new AllergenNameException();
    }

    this.name = name;
    this.description = "";
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
    return `Name: ${this.name} , 
      Description: ${this.description}, : ${this.location.toString()}`;
  }

  getLocation() {
    return `${this.location.getLatitude()} , ${this.location.getLongitude()}`;
  }

  setLocation(latitude, longitude) {
    this.location = new Coordinate(latitude, longitude);
  }
}

export { Restaurant };
