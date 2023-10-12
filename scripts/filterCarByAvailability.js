function filterCarByAvailability(cars) {
  // Sangat dianjurkan untuk console.log semua hal
  console.log(cars);

  // Tempat penampungan hasil
  const result = [];

  // Tulis code-mu disini
  const objAmount = cars.length;
  for (i = 0; i < objAmount; i++) {
    if (cars[i].available) {
      result.push(cars[i]);
    }
  }
  // Rubah code ini dengan array hasil filter berdasarkan availablity
  return result;
}
