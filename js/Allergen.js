import { AllergenNameException } from "./exception.js";

class Allergen {
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
    return `Name: ${this.name} , Description: ${this.description}`;
  }
}

export { Allergen };
