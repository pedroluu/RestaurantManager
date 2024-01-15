const RestaurantManager = (function () {
  let instantiated;

  class Manager {
    #dishes = new Map();
    #allergens = new Map();
    #categories = new Map();
    #menus = new Map();
    #restaurants = new Map();
    constructor(nameSystem) {
      this.nameSystem = nameSystem;
    }

    *getCategories() {
      for (let category of this.#categories.values()) {
        yield category;
      }
    }

    *getMenus() {
      for (let menu of this.#menus.values()) {
        yield menu;
      }
    }
    *getAllergens() {
      for (let allergen of this.#allergens.values()) {
        yield allergen;
      }
    }
    *getRestaurants() {
      for (let restaurant of this.#restaurants.values()) {
        yield restaurant;
      }
    }

    addCategory(...categories) {
      for (const category of categories) {
        if (!(category instanceof Category)) {
          throw new Error("Argument must be an instance of Category");
        }
        if (this.#categories.has(category.name)) {
          throw new Error(`${category.name} already exists in the system`);
        }
        this.#categories.set(category.name, category);
      }
      return this;
    }

    addMenu(...menus) {
      for (const menu of menus) {
        if (!(menu instanceof Menu)) {
          throw new Error("Argument must be an instance of Menu");
        }
        if (this.#menus.has(menu.name)) {
          throw new Error(`${menu.name} already exists in the system`);
        }
        this.#menus.set(menu.name, {
          Menu: menu,
          dishes: [],
        });
      }
      return this;
    }

    addAllergen(...allergens) {
      for (const allergen of allergens) {
        if (!(allergen instanceof Allergen)) {
          throw new Error("Argument must be an instance of Allergen");
        }
        if (this.#allergens.has(allergen.name)) {
          throw new Error(`${allergen.name} already exists in the system`);
        }
        this.#allergens.set(allergen.name, allergen);
      }
      return this;
    }

    addDish(...dishes) {
      for (const dish of dishes) {
        if (!(dish instanceof Dish)) {
          throw new Error("Argument must be an instance of Dish");
        }
        if (this.#dishes.has(dish.name)) {
          throw new Error(`${dish.name} already exists in the system`);
        }
        this.#dishes.set(dish.name, {
          Dish: dish,
          allergens: [],
          categories: [],
        });
      }
      return this;
    }
  }

  function init() {
    return new Manager();
  }

  return {
    getInstance: function () {
      if (!instantiated) instantiated = init();
      return instantiated;
    },
  };
})();

import { Allergen } from "./Allergen.js";
import { Category } from "./category.js";
import { Dish } from "./dish.js";
import { Menu } from "./Menu.js";
import { Restaurant } from "./restaurant.js";

function test() {
  //   let d1 = new Dish("macarrones");
  //   let a1 = new Allergen("fruto seco");
  let c1 = new Category("entrante");
  let c2 = new Category("segundo");
  let m1 = new Menu("primero");
  //   let r1 = new Restaurant("Las lomas");

  console.log(c1.toString());

  const manager = RestaurantManager.getInstance("Manager");
  manager.addCategory(c2, c1);
  let it = manager.getCategories();
  for (let r of it) {
    console.log(r.toString());
  }
}

test();
