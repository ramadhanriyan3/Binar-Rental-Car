function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

class Binar {
  static populateCars = (cars) => {
    return cars.map((car) => {
      const isPositive = getRandomInt(0, 1) === 1;
      const timeAt = new Date();
      const mutator = getRandomInt(1000000, 100000000);
      const availableAt = new Date(
        timeAt.getTime() + (isPositive ? mutator : -1 * mutator)
      );
      const driverType = isPositive
        ? "Dengan Sopir"
        : "Tanpa Sopir (Lepas kunci)";

      return {
        ...car,
        availableAt,
        driverType,
      };
    });
  };

  static async listCars(filterer) {
    let cars;
    let cachedCarsString = localStorage.getItem("CARS");

    if (!!cachedCarsString) {
      const cacheCars = JSON.parse(cachedCarsString);
      cars = this.populateCars(cacheCars);
    } else {
      const response = await fetch(
        "https://raw.githubusercontent.com/fnurhidayat/probable-garbanzo/main/data/cars.min.json"
      );
      const body = await response.json();
      cars = this.populateCars(body);

      localStorage.setItem("CARS", JSON.stringify(cars));
      console.log("Data mobil setelah disimpan di Local Storage:", cars);
    }

    if (filterer instanceof Function) return cars.filter(filterer);

    return cars;
  }
}

const obj = {
  driverFilter: function driverFilter(self) {
    return self.driverType === selectedDriver.textContent;
  },

  dateFilter: function dateFilter(self) {
    return new Date(selectedDate.textContent) >= self.availableAt;
  },

  timeFilter: function timeFilter(self) {
    return parseInt(selectedTime) > self.availableAt.getHours();
  },

  passenger: function passenger(self) {
    return self.capacity > passenger.value;
  },
};
