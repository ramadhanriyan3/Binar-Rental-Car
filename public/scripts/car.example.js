class Component {
  static list = [];

  static init(cars) {
    this.list = cars.map((i) => new this(i));
  }

  constructor({
    id,
    plate,
    manufacture,
    model,
    image,
    rentPerDay,
    capacity,
    description,
    transmission,
    available,
    type,
    year,
    options,
    specs,
    availableAt,
    driverType,
  }) {
    this.id = id;
    this.plate = plate;
    this.manufacture = manufacture;
    this.model = model;
    this.image = image;
    this.rentPerDay = rentPerDay;
    this.capacity = capacity;
    this.description = description;
    this.transmission = transmission;
    this.available = available;
    this.type = type;
    this.year = year;
    this.options = options;
    this.specs = specs;
    this.availableAt = availableAt;
    this.driverType = driverType;
  }

  formatCurency() {
    return this.rentPerDay.toLocaleString("id-ID");
  }

  render() {
    return `<div class="card d-flex justify-content-center column-gap-3 p-4">
    <img src="${this.image}" class="card-car-img " alt="...">
    <div class="card-body p-0 d-flex flex-column">
      <p class="body-regular m-0 pb-1">${this.manufacture} ${this.model}</p>
      <p class="price m-0 pb-1">Rp ${this.formatCurency()} /Hari</p>
      <p class="body-light m-0 pb-3">Some quick example text to build on the card title and make up the bulk of the card's
        content.</p>
      <div class="d-flex mb-3">
        <img src="images/fi_passenger.svg" alt="" srcset="">
        <p class="body-light m-0 ps-2">${this.capacity}</p>
      </div>
      <div class="d-flex mb-3">
        <img src="images/fi_setting.svg" alt="" srcset="">
        <p class="body-light m-0 ps-2">${this.transmission}</p>
      </div>
      <div class="d-flex mb-4">
        <img src="images/fi_calendar.svg" alt="" srcset="">
        <p class="body-light m-0 ps-2">Tahun ${this.year}</p>
      </div>
      <button type="button" class="button-s w-100">Pilih Mobil</button>
    </div>
  </div>
    `;
  }
}

console.log(Component.list);
