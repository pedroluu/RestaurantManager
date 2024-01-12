class Category {
  constructor(name) {
    this.name = name;
    this.description = "";
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
