class BaseException extends Error {
  constructor(message = "", fileName, lineNumber) {
    super(message, fileName, lineNumber);
    this.name = "BaseException";
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, BaseException);
    }
  }
}
class AllergenNameException extends BaseException {
  constructor(message = "Allergen must have a name", fileName, lineNumber) {
    super(message, fileName, lineNumber);
    this.name = "AllergenNameException";
  }
}

class RestaurantNameException extends BaseException {
  constructor(message = "Restaurant must have a name", fileName, lineNumber) {
    super(message, fileName, lineNumber);
    this.name = "RestaurantNameException";
  }
}

class MenuNameException extends BaseException {
  constructor(message = "Menu must have a name", fileName, lineNumber) {
    super(message, fileName, lineNumber);
    this.name = "MenuNameException";
  }
}

class DishNameException extends BaseException {
  constructor(message = "Dish must have a name", fileName, lineNumber) {
    super(message, fileName, lineNumber);
    this.name = "DishNameException";
  }
}

class CategoryNameException extends BaseException {
  constructor(message = "Category must have a name", fileName, lineNumber) {
    super(message, fileName, lineNumber);
    this.name = "CategoryNameException";
  }
}

class CoordinateValueException extends BaseException {
  constructor(
    fieldName,
    message = `${fieldName} must be provided`,
    fileName,
    lineNumber
  ) {
    super(message, fileName, lineNumber);
    this.name = "CoordinateValueException";
  }
}

// Nueva clase de excepción para categorías
class CategoryException extends BaseException {
  constructor(message = "", fileName, lineNumber) {
    super(message, fileName, lineNumber);
    this.name = "CategoryException";
  }
}

// Nueva clase de excepción para menús
class MenuException extends BaseException {
  constructor(message = "", fileName, lineNumber) {
    super(message, fileName, lineNumber);
    this.name = "MenuException";
  }
}

// Nueva clase de excepción para alérgenos
class AllergenException extends BaseException {
  constructor(message = "", fileName, lineNumber) {
    super(message, fileName, lineNumber);
    this.name = "AllergenException";
  }
}

// Nueva clase de excepción para platos
class DishException extends BaseException {
  constructor(message = "", fileName, lineNumber) {
    super(message, fileName, lineNumber);
    this.name = "DishException";
  }
}

class RestaurantManagerException extends BaseException {
  constructor(message = "", fileName, lineNumber) {
    super(message, fileName, lineNumber);
    this.name = "RestaurantManagerException";
  }
}

export {
  AllergenNameException,
  CoordinateValueException,
  MenuNameException,
  CategoryNameException,
  DishNameException,
  RestaurantNameException,
  BaseException,
  CategoryException,
  MenuException,
  AllergenException,
  DishException,
  RestaurantManagerException,
};
