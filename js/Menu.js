import { MenuNameException } from "./exception.js";

class Menu {
  constructor(name) {
    if (!name || name.trim() === "") {
      throw new MenuNameException();
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
    return `Category: ${this.name}` + " "`Description: ${this.description}`;
  }
}

export { Menu };
