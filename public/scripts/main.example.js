/*
 * Contoh kode untuk membaca query parameter,
 * Siapa tau relevan! :)
 * */

const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

// Coba olah data ini hehe :)
console.log(params, "apa ini");

/*
 * Contoh penggunaan DOM di dalam class
 * */
const car = new Car();

car.init();
