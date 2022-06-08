const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Сервер слушает порт ${port}`);
});

app.get("/", (req, res) => {
  // res.send("<h1>Привет от Express!</h1>");
  const filePath = path.join(__dirname, "папка/page.html");
  res.sendFile(filePath);
});

app.get("/first", (req, res) => {
  res.end("<h1>First</h1>");
});

app.get("/second", (req, res) => {
  res.end("<h1>Second</h1>");
});

app.use(express.static("public"));

app.get("/json", (req, res) => {
  res.json({ id: 1, name: "Alice" });
});

app.get("/zapros", (req, res) => {
  res.json(req.query);
});
