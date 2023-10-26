const http = require("http");
const fs = require("fs");
const path = require("path");
const express = require("express");
const { hostname } = require("os");
const { pseudoRandomBytes } = require("crypto");
const { url } = require("inspector");
const app = express();
const PORT = 3000;

app.use(express.static("public"));
app.get("/", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "../", "public", "index.html"));
  // res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/cars", (req, res) => {
  res
    .status(200)
    .sendFile(path.join(__dirname, "../", "public", "findCars.html"));
});

app.use((req, res) => {
  res
    .status(404)
    .sendFile(path.join(__dirname, "../", "public", "notFound.html"));
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
