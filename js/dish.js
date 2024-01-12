class Dish {
  constructor(name) {
    this.name = name;
    this.description = "";
    this.ingredients = "";
    this.image = "";
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

Object.defineProperty(this, "ingredients", {
  enumerable: true,
  get() {
    return this.ingredients;
  },
  set(ingredients) {
    this.ingredients = ingredients;
  },
});
Object.defineProperty(this, "image", {
  enumerable: true,
  get() {
    return this.image;
  },
  set(image) {
    this.image = image;
  },
});
