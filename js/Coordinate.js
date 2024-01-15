class Coordinate {
  constructor(latitude, longitude) {
    this.latitude = latitude;
    this.longitude = longitude;
  }
  getLatitude() {
    return this.latitude;
  }
  setLatitude(latitude) {
    this.latitude = latitude;
  }
  getLongitude() {
    return this.longitude;
  }
  setLongitude(longitude) {
    this.longitude = longitude;
  }
  toString() {
    return `Coordinates: Latitude ${this.getLatitude()} Longitude ${
      this.longitude
    }`;
  }
}

export { Coordinate };
