class Restaurant {
  constructor(name) {
    this.name = name;
    this.description = "";
    this.location = new Coordinate();
  }
}

Object.defineProperty(this, "fullName", {
  enumerable: true,
  get() {
    return this._name;
  },
  set(name) {
    if (typeof name !== "string") throw new Error("Name must be a string");
    else this.name = name;
  },
});

Object.defineProperty(this, "description", {
  enumerable: true,
  get() {
    return this.description;
  },
  set(description) {
    this.description = description;
  },
});

Object.defineProperty(this, "location", {
  enumerable: true,
  get() {
    return this.location.toString();
  },
  set(location) {
    if (!location instanceof Coordinate) {
      throw new Error("No se le está pasando una localización ");
    } else {
      this.location = location;
    }
  },
});
