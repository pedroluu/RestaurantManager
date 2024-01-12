class Coordinate {
  constructor(latitude, longitude) {
    this.latitude = latitude;
    this.longitude = longitude;
  }
}

Object.defineProperty(this, "latitude", {
  enumerable: true,
  get() {
    return this.latitude;
  },
  set(latitude) {
    this.latitude = latitude;
  },
});
Object.defineProperty(this, "longitude", {
  enumerable: true,
  get() {
    return this.longitude;
  },
  set(longitude) {
    this.longitude = longitude;
  },
});
