import { CategoryNameException } from "./exception.js";

class Category {
  constructor(name) {
    if (!name || name.trim() === "") {
      throw new CategoryNameException();
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
    return `Category: ${this.name}, Description: ${this.description}`;
  }
}

export { Category };
