import {
  CategoryException,
  MenuException,
  AllergenException,
  DishException,
  RestaurantManagerException,
} from "./exception.js";

const RestaurantManager = (function () {
  let instantiated;

  class Manager {
    // Propiedades privadas para almacenar información del sistema de restaurantes
    #dishes = new Map();
    #allergens = new Map();
    #categories = new Map();
    #menus = new Map();
    #restaurants = new Map();

    // Constructor que recibe el nombre del sistema
    constructor(nameSystem) {
      this.nameSystem = nameSystem;
    }

    // Generador para obtener categorías
    *getCategories() {
      for (let category of this.#categories.values()) {
        yield category;
      }
    }

    // Generador para obtener menús
    *getMenus() {
      for (let menu of this.#menus.values()) {
        yield menu;
      }
    }

    // Generador para obtener alérgenos
    *getAllergens() {
      for (let allergen of this.#allergens.values()) {
        yield allergen;
      }
    }

    // Generador para obtener restaurantes
    *getRestaurants() {
      for (let restaurant of this.#restaurants.values()) {
        yield restaurant;
      }
    }

    // Método para agregar categorías al sistema
    addCategory(...categories) {
      for (const category of categories) {
        // Verificar si la categoría es una instancia válida de Category
        if (!(category instanceof Category)) {
          throw new CategoryException(
            "Argument must be an instance of Category"
          );
        }

        // Verificar si la categoría ya existe en el sistema
        if (this.#categories.has(category.name)) {
          throw new CategoryException(
            `${category.name} already exists in the system`
          );
        }

        // Agregar la categoría al sistema
        this.#categories.set(category.name, category);
      }
      return this;
    }

    // Método para eliminar categorías del sistema
    removeCategory(...categories) {
      if (categories.length === 0) {
        throw new CategoryException("At least one category is required");
      }

      categories.forEach((category) => {
        if (category == null) {
          throw new CategoryException("Category must not be null or undefined");
        }

        const categoryName = String(category);

        // Verificar si la categoría existe antes de eliminarla
        if (!this.#categories.has(category.getName())) {
          throw new CategoryException(
            `${category.getName()} is either null or not registered`
          );
        }

        // Eliminar la categoría
        this.#categories.delete(category.getName());

        // Desasignar los platos asociados a la categoría eliminada
        this.#dishes.forEach((dishEntry) => {
          if (dishEntry.categories && dishEntry.categories[categoryName]) {
            delete dishEntry.categories[categoryName];
          }
        });
      });

      return this;
    }

    // Método para agregar menús al sistema
    addMenu(...menus) {
      for (const menu of menus) {
        // Verificar si el menú es una instancia válida de Menu
        if (!(menu instanceof Menu)) {
          throw new MenuException("Argument must be an instance of Menu");
        }

        // Verificar si el menú ya existe en el sistema
        if (this.#menus.has(menu.name)) {
          throw new MenuException(`${menu.name} already exists in the system`);
        }

        // Agregar el menú al sistema
        this.#menus.set(menu.name, {
          Menu: menu,
          dishes: {},
        });
      }
      return this;
    }

    // Método para eliminar menús del sistema
    removeMenu(...menus) {
      if (menus.length === 0) {
        throw new MenuException("At least one menu is required");
      }

      menus.forEach((menu) => {
        if (menu == null) {
          throw new MenuException("Menu must not be null or undefined");
        }

        const menuName = menu.getName();

        // Verificar si el menú existe antes de eliminarlo
        if (!this.#menus.has(menuName)) {
          throw new MenuException(
            `${menuName} is either null or not registered`
          );
        }

        // Eliminar el menú
        this.#menus.delete(menuName);
      });

      return this;
    }

    // Método para agregar alérgenos al sistema
    addAllergen(...allergens) {
      for (const allergen of allergens) {
        // Verificar si el alérgeno es una instancia válida de Allergen
        if (!(allergen instanceof Allergen)) {
          throw new AllergenException(
            "Argument must be an instance of Allergen"
          );
        }

        // Verificar si el alérgeno ya existe en el sistema
        if (this.#allergens.has(allergen.name)) {
          throw new AllergenException(
            `${allergen.name} already exists in the system`
          );
        }

        // Agregar el alérgeno al sistema
        this.#allergens.set(allergen.name, allergen);
      }
      return this;
    }

    // Método para eliminar alérgenos del sistema
    removeAllergen(...allergens) {
      if (allergens.length === 0) {
        throw new AllergenException("At least one allergen is required");
      }

      allergens.forEach((allergen) => {
        if (allergen == null) {
          throw new AllergenException("Allergen must not be null or undefined");
        }

        const allergenName = allergen.getName();

        // Verificar si el alérgeno existe antes de eliminarlo
        if (!this.#allergens.has(allergenName)) {
          throw new AllergenException(
            `${allergenName} is either null or not registered`
          );
        }

        // Eliminar el alérgeno
        this.#allergens.delete(allergenName);
      });

      return this;
    }

    // Método para agregar platos al sistema
    addDish(...dishes) {
      for (const dish of dishes) {
        // Verificar si el plato es una instancia válida de Dish
        if (!(dish instanceof Dish)) {
          throw new DishException("Argument must be an instance of Dish");
        }

        // Verificar si el plato ya existe en el sistema
        if (this.#dishes.has(dish.name)) {
          throw new Dish(`${dish.name} already exists in the system`);
        }

        // Agregar el plato al sistema
        this.#dishes.set(dish.name, {
          Dish: dish,
          allergens: {},
          categories: {}, // Cambiado de objeto literal a Map
        });
      }
      return this;
    }

    // Método para eliminar platos del sistema
    removeDish(...dishes) {
      if (dishes.length === 0) {
        throw new DishException("At least one dish is required");
      }

      dishes.forEach((dish) => {
        if (dish == null) {
          throw new DishException("Dish must not be null or undefined");
        }

        const dishName = String(dish);

        // Verificar si el plato existe antes de eliminarlo
        if (!this.#dishes.has(dish.getName())) {
          throw new DishException(
            `${dish.getName()} is either null or not registered`
          );
        }

        // Eliminar el plato
        this.#dishes.delete(dish.getName());

        // Desasignar los platos asociados a la categoría eliminada
        this.#menus.forEach((menuEntry) => {
          if (menuEntry.dishes && menuEntry.dishes[dishName]) {
            delete menuEntry.dishes[dishName];
          }
        });
      });

      return this;
    }

    // Método para añadir restaurantes al sistema
    addRestaurant(...restaurants) {
      for (const rest of restaurants) {
        // Verificar si el argumento es una instancia de Restaurant
        if (!(rest instanceof Restaurant)) {
          throw new RestaurantManagerException(
            "El argumento debe ser una instancia de Restaurant"
          );
        }
        // Verificar si el restaurante ya existe en el sistema
        if (this.#restaurants.has(rest.name)) {
          throw new RestaurantManagerException(
            `${rest.name} ya existe en el sistema`
          );
        }
        // Añadir el restaurante al sistema con un menú vacío
        this.#restaurants.set(rest.name, {
          Restaurant: rest,
          menus: {},
        });
      }
      return this; // Devolver el objeto actual para encadenar operaciones
    }

    // Método para eliminar restaurantes del sistema
    removeRestaurant(...restaurants) {
      if (restaurants.length === 0) {
        throw new RestaurantManagerException(
          "Se requiere al menos un restaurante para eliminar"
        );
      }

      restaurants.forEach((restaurant) => {
        if (restaurant == null) {
          throw new RestaurantManagerException(
            "El restaurante no debe ser nulo o indefinido"
          );
        }

        const restaurantName = restaurant.getName();

        if (!this.#restaurants.has(restaurantName)) {
          throw new RestaurantManagerException(
            `${restaurantName} es nulo o no está registrado`
          );
        }

        // Eliminar el restaurante del sistema
        this.#restaurants.delete(restaurantName);
      });

      return this; // Devolver el objeto actual para encadenar operaciones
    }

    // Método para asignar categoría a un plato
    assignCategoryToDish(...args) {
      if (args.length < 2) {
        throw new RestaurantManagerException(
          "Se requieren al menos dos argumentos (categoría y plato)"
        );
      }

      const [category, ...dishes] = args;

      if (category == null || dishes.some((dish) => dish == null)) {
        throw new RestaurantManagerException(
          "La categoría y todos los platos no deben ser nulos o indefinidos"
        );
      }

      dishes.forEach((dish) => {
        // Crear una nueva categoría si no existe
        if (!this.#categories.has(category.getName())) {
          this.#categories.set(category.name, new Category(category));
        }

        // Crear un nuevo plato si no existe
        if (!this.#dishes.has(dish.name)) {
          this.#dishes.set(dish.name, new Dish(dish.name));
        }

        const dishEntry = this.#dishes.get(dish.name);
        const categoryKey = String(category);
        dishEntry.categories[categoryKey] = true; // O cualquier valor que desees
      });

      return this; // Devolver el objeto actual para encadenar operaciones
    }

    // Método para asignar alérgeno a un plato
    assignAllergenToDish(...args) {
      if (args.length < 2) {
        throw new RestaurantManagerException(
          "Se requieren al menos dos argumentos (alérgeno y plato)"
        );
      }

      const [allergen, ...dishes] = args;

      if (allergen == null || dishes.some((dish) => dish == null)) {
        throw new RestaurantManagerException(
          "El alérgeno y todos los platos no deben ser nulos o indefinidos"
        );
      }

      dishes.forEach((dish) => {
        // Crear un nuevo alérgeno si no existe
        if (!this.#allergens.has(allergen.getName())) {
          this.#allergens.set(allergen.name, new Allergen(allergen));
        }

        // Crear un nuevo plato si no existe
        if (!this.#dishes.has(dish.name)) {
          this.#dishes.set(dish.name, new Dish(dish.name));
        }

        const dishEntry = this.#dishes.get(dish.name);
        const allergenKey = String(allergen);
        dishEntry.allergens[allergenKey] = true; // O cualquier valor que desees
      });

      return this; // Devolver el objeto actual para encadenar operaciones
    }

    // Método para asignar un plato a un menú
    assignDishToMenu(...args) {
      if (args.length < 2) {
        throw new RestaurantManagerException(
          "Se requieren al menos dos argumentos (plato y menú)"
        );
      }

      const [dish, ...menus] = args;

      if (dish == null || menus.some((menu) => menu == null)) {
        throw new RestaurantManagerException(
          "El plato y todos los menús no deben ser nulos o indefinidos"
        );
      }

      menus.forEach((menu) => {
        // Crear un nuevo menú si no existe
        if (!this.#menus.has(menu.getName())) {
          this.#menus.set(menu.name, new Menu(menu.name));
        }

        const menuEntry = this.#menus.get(menu.name);
        if (!menuEntry) {
          throw new RestaurantManagerException(
            `No se encontró la entrada del menú para ${menu.getName()}`
          );
        }

        // Crear un nuevo plato si no existe
        if (!this.#dishes.has(dish.name)) {
          this.#dishes.set(dish.name, new Dish(dish.name));
        }

        const dishKey = String(dish);
        menuEntry.dishes[dishKey] = true; // O cualquier valor que desees
      });

      return this; // Devolver el objeto actual para encadenar operaciones
    }
    // Método para desasignar alérgeno de un plato
    deassignAllergenToDish(...args) {
      if (args.length < 2) {
        throw new RestaurantManagerException(
          "Se requieren al menos dos argumentos (alérgeno y plato)"
        );
      }

      const [allergen, ...dishes] = args;

      if (allergen == null || dishes.some((dish) => dish == null)) {
        throw new RestaurantManagerException(
          "El alérgeno y todos los platos no deben ser nulos o indefinidos"
        );
      }

      dishes.forEach((dish) => {
        if (!this.#allergens.has(allergen.getName())) {
          throw new RestaurantManagerException(
            `${allergen.getName()} es nulo o no está registrado`
          );
        }

        if (!this.#dishes.has(dish.name)) {
          throw new RestaurantManagerException(
            `${dish.name} es nulo o no está registrado`
          );
        }

        const dishEntry = this.#dishes.get(dish.name);
        const allergenKey = String(allergen);

        // Verificar si el alérgeno está asignado antes de intentar desasignarlo
        if (dishEntry.allergens && dishEntry.allergens[allergenKey]) {
          delete dishEntry.allergens[allergenKey];
        }
      });

      return this;
    }

    // Método para desasignar categoría de un plato
    deassignCategoryToDish(...args) {
      if (args.length < 2) {
        throw new RestaurantManagerException(
          "Se requieren al menos dos argumentos (categoría y plato)"
        );
      }

      const [category, ...dishes] = args;

      if (category == null || dishes.some((dish) => dish == null)) {
        throw new RestaurantManagerException(
          "La categoría y todos los platos no deben ser nulos o indefinidos"
        );
      }

      dishes.forEach((dish) => {
        if (!this.#categories.has(category.getName())) {
          throw new RestaurantManagerException(
            `${category.getName()} es nulo o no está registrado`
          );
        }

        if (!this.#dishes.has(dish.name)) {
          throw new RestaurantManagerException(
            `${dish.name} es nulo o no está registrado`
          );
        }

        const dishEntry = this.#dishes.get(dish.name);
        const categoryKey = String(category);

        // Verificar si la categoría está asignada antes de intentar desasignarla
        if (dishEntry.categories && dishEntry.categories[categoryKey]) {
          delete dishEntry.categories[categoryKey];
        }
      });

      return this;
    }

    // Método para desasignar plato de un menú
    deassignDishToMenu(...args) {
      if (args.length < 2) {
        throw new RestaurantManagerException(
          "Se requieren al menos dos argumentos (menú y plato)"
        );
      }

      const [menu, ...dishes] = args;

      if (menu == null || dishes.some((dish) => dish == null)) {
        throw new RestaurantManagerException(
          "Menú y todos los platos no deben ser nulos o indefinidos"
        );
      }

      dishes.forEach((dish) => {
        if (!this.#menus.has(menu.getName())) {
          throw new RestaurantManagerException(
            `${menu.getName()} es nulo o no está registrado`
          );
        }

        if (!this.#dishes.has(dish.name)) {
          throw new RestaurantManagerException(
            `${dish.name} es nulo o no está registrado`
          );
        }

        const menuEntry = this.#menus.get(menu.getName());
        const dishKey = String(dish);

        // Verificar si el plato está asignado al menú antes de intentar desasignarlo
        if (menuEntry.dishes && menuEntry.dishes[dishKey]) {
          delete menuEntry.dishes[dishKey];
        }
      });

      return this;
    }

    // Método para cambiar posiciones de platos en un menú
    changeDishesPositionsInMenu(menu, dish1, dish2) {
      if (menu == null || dish1 == null || dish2 == null) {
        throw new RestaurantManagerException(
          "Menú, Plato1 y Plato2 no deben ser nulos o indefinidos"
        );
      }

      const menuName = menu.getName();
      const dish1Name = String(dish1);
      const dish2Name = String(dish2);

      if (!this.#menus.has(menuName)) {
        throw new RestaurantManagerException(
          `${menuName} es nulo o no está registrado`
        );
      }

      if (
        !this.#dishes.has(dish1.getName()) ||
        !this.#dishes.has(dish2.getName())
      ) {
        throw new RestaurantManagerException(
          `${dish1Name} o ${dish2Name} es nulo o no está registrado`
        );
      }

      const menuEntry = this.#menus.get(menuName);

      // Verificar que ambos platos estén asignados al menú
      if (
        !menuEntry.dishes ||
        !menuEntry.dishes[dish1Name] ||
        !menuEntry.dishes[dish2Name]
      ) {
        throw new RestaurantManagerException(
          `${dish1Name} o ${dish2Name} no está asignado a ${menuName}`
        );
      }

      // Intercambiar las posiciones de los platos en el menú
      const positionDish1 = menuEntry.dishes[dish1Name];
      const positionDish2 = menuEntry.dishes[dish2Name];

      if (positionDish1 === undefined || positionDish2 === undefined) {
        throw new Error(
          `${dish1Name} o ${dish2Name} no está asignado a ${menuName}`
        );
      }

      // Actualizar las posiciones solo si ambos platos están asignados al menú
      menuEntry.dishes[dish1Name] = positionDish2;
      menuEntry.dishes[dish2Name] = positionDish1;

      return this;
    }

    getDishesWithAllergen(allergen, sortingFunction) {
      if (allergen == null) {
        throw new RestaurantManagerException(
          "Allergen must not be null or undefined"
        );
      }

      const allergenName = String(allergen);

      if (!this.#allergens.has(allergen.getName())) {
        throw new RestaurantManagerException(
          `${allergenName} is either null or not registered`
        );
      }

      // Obtener los nombres de los platos que tienen el alérgeno
      const dishNames = [];
      this.#dishes.forEach((dishEntry, dishName) => {
        // Verificar si el plato tiene alérgenos y si el alérgeno específico está presente
        if (dishEntry.allergens && dishEntry.allergens[allergenName]) {
          dishNames.push(dishName);
        }
      });

      // Ordenar los platos según la función de ordenación proporcionada
      if (sortingFunction && typeof sortingFunction === "function") {
        dishNames.sort(sortingFunction);
      }

      // Devolver un iterador para los nombres de los platos
      return dishNames[Symbol.iterator]();
    }

    getDishesInCategory(category, sortingFunction) {
      if (category == null) {
        throw new RestaurantManagerException(
          "Category must not be null or undefined"
        );
      }

      const categoryName = String(category);

      if (!this.#categories.has(category.getName())) {
        throw new RestaurantManagerException(
          `${category.getName()} is either null or not registered`
        );
      }

      // Obtener los nombres de los platos que están asociados a la categoría
      const dishNames = [];
      this.#dishes.forEach((dishEntry, dishName) => {
        // Verificar si el plato tiene categorías y si la categoría específica está presente
        if (dishEntry.categories && dishEntry.categories[categoryName]) {
          dishNames.push(dishName);
        }
      });

      // Ordenar los platos según la función de ordenación proporcionada
      if (sortingFunction && typeof sortingFunction === "function") {
        dishNames.sort(sortingFunction);
      }

      // Devolver un iterador para los nombres de los platos
      return dishNames[Symbol.iterator]();
    }

    findDishes(filterFunction, sortingFunction) {
      if (typeof filterFunction !== "function") {
        throw new RestaurantManagerException(
          "Filter function must be a valid function"
        );
      }

      // Obtener los nombres de los platos que cumplen con el criterio de la función de filtro
      const dishNames = [];
      this.#dishes.forEach((dishEntry, dishName) => {
        if (filterFunction(dishEntry)) {
          dishNames.push(dishName);
        }
      });

      // Ordenar los platos según la función de ordenación proporcionada
      if (sortingFunction && typeof sortingFunction === "function") {
        dishNames.sort(sortingFunction);
      }

      // Devolver un iterador para los nombres de los platos
      return dishNames[Symbol.iterator]();
    }

    createDish(dishName) {
      // Verificar si el plato ya está registrado
      if (this.#dishes.has(dishName)) {
        return this.#dishes.get(dishName);
      }

      // Si no está registrado, crear un nuevo plato y registrarlo
      const newDish = new Dish(dishName);
      this.#dishes.set(dishName, newDish);

      return newDish;
    }

    //Metodo para crear un menu
    createMenu(menuName) {
      //Comprobamos si existe y si es así lo devolvemos
      if (this.#menus.has(menuName)) {
        return this.#menus.get(menuName);
      }

      //Creamos el menu ya que no existe
      const newMenu = new Menu(menuName);
      this.#menus.set(menuName, newMenu);

      return newMenu;
    }

    //metodo para crear un alergeno
    createAllergen(allergenName) {
      //Comprobamos si existe y si es así lo devolvemos
      if (this.#allergens.has(allergenName)) {
        return this.#allergens.get(allergenName);
      }

      //creamos el alérgeno
      const newAllergen = new Allergen(allergenName);
      this.#allergens.set(allergenName, newAllergen);

      return newAllergen;
    }

    //metodo para crear una categoría
    createCategory(categoryName) {
      //Comprobamos si existe y si es así la devolvemos
      if (this.#categories.has(categoryName)) {
        return this.#categories.get(categoryName);
      }

      const newCategory = new Category(categoryName);
      this.#categories.set(categoryName, newCategory);

      return newCategory;
    }

    //metodo para crear reestaurante
    createRestaurant(restaurantName) {
      //Comprobamos si existe y si es así lo devolvemos
      if (this.#restaurants.has(restaurantName)) {
        return this.#restaurants.get(restaurantName);
      }

      const newRestaurant = new Restaurant(restaurantName);
      this.#restaurants.set(restaurantName, newRestaurant);

      return newRestaurant;
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
import { Coordinate } from "./Coordinate.js";

function test() {
  //creamos un o dos objetos de cada para probar la funcionalidad
  let d1 = new Dish("macarrones");
  let d2 = new Dish("migas");
  let a1 = new Allergen("fruto seco");
  let c1 = new Category("entrante");
  let c2 = new Category("segundo");
  let m1 = new Menu("primero");
  let m2 = new Menu("menu desayuno");
  let r1 = new Restaurant("Las lomas");

  r1.setLocation(245, 512);
  console.log(r1.toString());

  const manager = RestaurantManager.getInstance("Manager");
  manager.addCategory(c2, c1);
  manager.addDish(d1, d2);
  manager.addAllergen(a1);
  manager.addMenu(m1);
  manager.addMenu(m2);
  manager.addRestaurant(r1);

  c1.setDescription("son los platos que se comeran al iniciar el menú");

  //Recogemos el iterador para probar el metodo getCategories()
  let it = manager.getCategories();
  for (let r of it) {
    console.log(r.toString());
  }
  //asignamos dos categorias a los platos
  manager.assignCategoryToDish(c2, d1).assignCategoryToDish(c1, d1, d2);
  //asignamos alérgeno
  manager.assignAllergenToDish(a1, d1, d2);
  //asignamos un plato a un menú
  manager.assignDishToMenu(d2, m1).assignDishToMenu(d1, m1, m2);
  // manager.deassignAllergenToDish(a1, d1);
  // manager.deassignCategoryToDish(c1, d1);
  // manager.deassignDishToMenu(m1, d1);
  // manager.removeCategory(c2);
  // manager.removeMenu(m1);
  console.log("Antes de cambiar posiciones:");
  console.log(manager);
  manager.changeDishesPositionsInMenu(m1, d1, d2);

  const sortingFunction = (a, b) => a.localeCompare(b); // Función de ordenación (opcional)

  const allergenIterator = manager.getDishesWithAllergen(a1, sortingFunction);
  console.log("Platos que contienen el alérgeno " + a1.getName());
  for (const dishName of allergenIterator) {
    console.log(dishName);
  }

  const CategoryIterator = manager.getDishesInCategory(c1, sortingFunction);
  console.log("Platos que contienen la categoría: " + c1.getName());
  for (const dishName of CategoryIterator) {
    console.log(dishName);
  }

  //función de filtro
  const filterFunction = (dish) => {
    // Verificar si el plato tiene al menos dos alérgenos
    return dish.categories && Object.values(dish.categories).length >= 2;
  };

  // Obtener el iterador de platos que cumplen con el filtro
  const dishIterator = manager.findDishes(filterFunction);
  console.log("Platos que cumplen con el criterio puesto: ");
  // Iterar sobre los resultados
  for (const dishName of dishIterator) {
    console.log(dishName);
  }

  console.log(manager.createDish("macarrones"));
  manager.removeDish(d1);
  console.log(manager);
}

test();
