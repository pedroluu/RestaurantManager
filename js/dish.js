import { DishNameException } from "./exception.js";

class Dish {
  constructor(name) {
    if (!name || name.trim() === "") {
      throw new DishNameException();
    }

    this.name = name;
    this.description = "";
    this.ingredients = "";
    this.image = "";
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

  getIngredients() {
    return this.ingredients;
  }
  setIngredients(ingredients) {
    this.ingredients = ingredients;
  }

  getImage() {
    return this.image;
  }

  setImage(image) {
    this.image = image;
  }
  toString() {
    return `Name  : ${this.name} , Description: ${this.description} ,  Ingredients: ${this.ingredients} , Image: ${this.image}`;
  }
}

export { Dish };
