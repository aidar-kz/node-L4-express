const express = require("express");
const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Сервер слушает порт ${port}`);
});

app.get("/", (req, res) => {
  res.send("<h1>Привет от Express!</h1>");
});

app.get("/first", (req, res) => {
  res.end("<h1>First</h1>");
});

app.get("/second", (req, res) => {
  res.end("<h1>Second</h1>");
});

console.log(__dirname);
require("./папка/test");
