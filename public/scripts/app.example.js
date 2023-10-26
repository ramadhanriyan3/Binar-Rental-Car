// MY CODE
// FILTERING FEATURE DOM
// DRVIVER TYPE
let driverType = document.getElementById("driver-type");
let selectedDriver = document.getElementById("selected-driver");
let driverOption = document.getElementsByClassName("options");
let driverList = document.getElementById("driver-list");
let arrowIcon = document.getElementById("arrowIcon");
let overlay = document.getElementById("overlay");

for (i = 0; i < driverOption.length; i++) {
  driverOption[i].onclick = function () {
    selectedDriver.innerHTML = this.textContent;
    driverList.classList.toggle("hide");
    arrowIcon.classList.toggle("rotate");
    driverType.classList.toggle("green-border");
    overlay.classList.remove("none");
  };
}
// driverOption[i].addEventListener("mouseover", function () {
//   selectedDriver.innerHTML = this.textContent;
// });
// driverOption[i].addEventListener("mouseout", function () {
//   selectedDriver.innerHTML = "Pilih Tipe Driver";
// });

driverType.onclick = function () {
  arrowIcon.classList.toggle("rotate");
  driverList.classList.toggle("hide");
  driverType.classList.toggle("green-border");
  overlay.classList.remove("none");
};

// CALENDAR
const monthYearElement = document.getElementById("monthYear");
const datesElement = document.getElementById("dates");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const calendar = document.getElementById("calendar");
const calendarInput = document.getElementById("calendarInput");
const calendarBtn = document.getElementById("calendarBtn");
const inputDate = document.getElementById("inputDate");
let currentDate = new Date();

const updateCalendar = () => {
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const firstDay = new Date(currentYear, currentMonth, 0);
  const lastDay = new Date(currentYear, currentMonth + 1, 0);
  const totalDays = lastDay.getDate();
  const firstDayIndex = firstDay.getDay();
  const lastDayIndex = lastDay.getDay();

  const monthYearString = currentDate.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });
  monthYearElement.textContent = monthYearString;

  let datesHTML = "";

  for (let i = firstDayIndex; i > 0; i--) {
    const prevDate = new Date(currentYear, currentMonth, 0 - i + 1);
    datesHTML += `<div></div>`; //<div class="date inactive">${prevDate.getDate()}</div>
  }

  for (let i = 1; i <= totalDays; i++) {
    const date = new Date(currentYear, currentMonth, i);
    const activeClass =
      date.toDateString() === new Date().toDateString() ? "active" : "";
    datesHTML += `<div class="date ${activeClass}">${i}</div>`;
  }

  for (let i = 1; i <= 7 - lastDayIndex; i++) {
    const nextDate = new Date(currentYear, currentMonth + 1, i);
    datesHTML += `<div></div>`; //`<div class="date inactive">${nextDate.getDate()}</div>`
  }

  datesElement.innerHTML = datesHTML;

  // event listener custom
  const inputDate = document.getElementById("inputDate");
  const dateElements = datesElement.getElementsByClassName("date");
  for (let date of dateElements) {
    date.addEventListener("click", () => {
      for (let date of dateElements) {
        if (date.classList.contains("active")) {
          date.classList.remove("active");
        }
      }
      date.classList.add("active");
      let dates = new Date(monthYearElement.textContent).toLocaleString(
        "default",
        {
          month: "short",
          year: "numeric",
        }
      );
      inputDate.innerHTML = `${date.textContent} ${dates}`;
    });
  }
};
calendarInput.addEventListener("click", () => {
  calendar.classList.toggle("hide");
  calendarInput.classList.toggle("green-border");
  overlay.classList.remove("none");
});
calendarBtn.addEventListener("click", () => {
  calendar.classList.toggle("hide");
  calendarInput.classList.toggle("green-border");
  overlay.classList.remove("none");
});

prevBtn.addEventListener("click", (e) => {
  e.preventDefault();
  currentDate.setMonth(currentDate.getMonth() - 1);
  updateCalendar();
});

nextBtn.addEventListener("click", (e) => {
  e.preventDefault();
  currentDate.setMonth(currentDate.getMonth() + 1);
  updateCalendar();
});
updateCalendar();

// PICKUP TIME
const pickupTime = document.getElementById("pickupTime");
const timeList = document.getElementById("timeList");
const timeOption = timeList.getElementsByClassName("options");
const selectedTime = document.getElementById("selectedTime");

pickupTime.onclick = () => {
  timeList.classList.toggle("hide");
  pickupTime.classList.toggle("green-border");
  overlay.classList.remove("none");
};
for (i = 0; i < timeOption.length; i++) {
  timeOption[i].onclick = function () {
    selectedTime.innerHTML = this.textContent;
    timeList.classList.toggle("hide");
    pickupTime.classList.toggle("green-border");
    overlay.classList.remove("none");
  };
}

// PASSENGER
const passenger = document.getElementById("passenger");
passenger.addEventListener("click", () => {
  overlay.classList.remove("none");
});
passenger.addEventListener("input", () => {
  console.log(passenger.value);
});

const findCarBtn = document.getElementById("findCarBtn");
findCarBtn.addEventListener("click", () => {
  overlay.classList.add("none");
});

// Observer
function FindCarButtonStatus() {
  if (
    selectedDriver.textContent !== "Pilih Tipe Driver" &&
    inputDate.textContent !== "Pilih Tanggal" &&
    selectedTime.textContent !== "Pilih Waktu"
  ) {
    findCarBtn.disabled = false;
  } else {
    findCarBtn.disabled = true;
  }
}

const selectedDriverObserver = new MutationObserver((list, observer) => {
  FindCarButtonStatus();
});

const inputDateObserver = new MutationObserver((list, observer) => {
  FindCarButtonStatus();
});

const selectedTimeObserver = new MutationObserver((list, observer) => {
  FindCarButtonStatus();
});

const config = { childList: true, subtree: true };

selectedDriverObserver.observe(selectedDriver, config);
inputDateObserver.observe(inputDate, config);
selectedTimeObserver.observe(selectedTime, config);

// cards container

class Car {
  constructor() {
    this.clearButton = document.getElementById("clear-btn");
    this.loadButton = document.getElementById("load-btn");
    // line baru
    this.carContainerElement = document.getElementById("cars-container");
    this.cardsContainer = document.getElementById("cardsContainer");
    this.findCarBtn = document.getElementById("findCarBtn");
  }

  async init() {
    await this.load();

    // Register click listener
    this.findCarBtn.onclick = this.run;
  }

  driverFilter(car) {
    return car.driverType === selectedDriver.textContent.trim();
  }

  dateFilter(car) {
    const selectedDate = new Date(inputDate.textContent);
    return selectedDate >= car.availableAt;
  }

  timeFilter(car) {
    return (
      parseInt(selectedTime.textContent.trim().slice(0, 2)) >=
      car.availableAt.getHours()
    );
  }

  passengerFilter(car) {
    if (passenger.value > 0) {
      return car.capacity > passenger.value;
    } else {
      return car.capacity > 0;
    }
  }

  run = () => {
    this.cardsContainer.innerHTML = "";
    const carList = Component.list;
    const filtered = carList
      .filter(this.driverFilter)
      .filter(this.dateFilter)
      .filter(this.timeFilter)
      .filter(this.passengerFilter);

    filtered.forEach((car) => {
      const node = document.createElement("div");
      node.innerHTML = car.render();
      this.cardsContainer.appendChild(node);
      console.log(typeof passenger.value);
    });
  };

  async load() {
    const cars = await Binar.listCars();
    Component.init(cars);
  }
}
