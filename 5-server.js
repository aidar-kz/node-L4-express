const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  if (req.url === "/favicon.ico") {
    const filePath = path.resolve(__dirname + "/files/my-logo.png");
    fs.readFile(filePath, (err, data) => {
      if (err) throw err;
      res.end(data);
    });
  } else if (req.url === "/") {
    const filePath = path.resolve(__dirname + "/files/my-page.html");
    fs.readFile(filePath, (err, data) => {
      if (err) throw err;
      res.end(data);
    });
  } else if (req.url === "/json") {
    const filePath = path.resolve(__dirname + "/files/my-json.json");
    fs.readFile(filePath, (err, data) => {
      if (err) throw err;
      res.end(data);
    });
  } else {
    const fileName = req.url.substring(1);
    const filePath = path.resolve(__dirname + "/files/" + fileName);
    fs.readFile(filePath, (err, data) => {
      if (err) throw err;
      res.end(data);
    });
  }
});

server.listen(PORT, () => {
  console.log(`Сервер слушает порт ${PORT}`);
});
