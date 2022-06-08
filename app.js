const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const port = 3000;

app.use(express.json()); // для парсинга application/json
app.use(express.urlencoded({ extended: true })); // для парсинга application/x-www-form-urlencoded

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

app.post("/login", (req, res) => {
  res.json(req.body);
});

// app.get("/products/:title", (req, res) => {
//   console.log(req.params);
//   res.json(req.params);
// });

// app.post("/products/:title", (req, res) => {
//   console.log(req.params);
//   res.json(req.params);
// });

app.get("/register", (req, res) => {
  const filePath = path.join(__dirname, "/папка/register.html");
  res.sendFile(filePath);
});

app.post("/register", (req, res) => {
  const filePath = path.join(__dirname, "users.json");
  try {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, "[]");
    }
  } catch (error) {
    console.error(error);
  }

  fs.readFile(filePath, (err, data) => {
    if (err) throw err;

    const users = JSON.parse(data);

    if (users.length > 0) {
      for (let i = 0; i < users.length; i++) {
        if (users[i].email === req.body.email) {
          res.send(
            `<h1>Пользователь с email ${req.body.email} уже существует.</h1>`
          );
          return;
        }
      }
    }

    users.push(req.body);

    fs.writeFile(filePath, JSON.stringify(users), (err) => {
      if (err) throw err;
      res.send("<h1>Пользователь зарегистрирован.");
    });
  });
});

const products = {
  pc: "PC info",
  car: "Car info",
  tv: "TV info",
};

app.get("/products/:name", (req, res) => {
  const productName = req.params.name;
  if (products[productName]) {
    res.send(products[productName]);
  } else {
    res.send("Товара с таким названием не найдено.");
  }
});

const arr = [
  { name: "Alice", email: "alice@mail.com", age: 22 },
  { name: "Jake", email: "jake@mail.com", age: 29 },
  { name: "Bob", email: "bob@mail.com", age: 27 },
  { name: "Jill", email: "jill@mail.com", age: 21 },
  { name: "Jane", email: "jane@mail.com", age: 25 },
  { name: "Michael", email: "Michael@mail.com", age: 32 },
];

app.get("/user", (req, res) => {
  const index = req.query.index;
  if (index >= 0 && index < arr.length) {
    res.json(arr[index]);
  } else {
    res.send("Пользователь не найден");
  }
});

app.use((req, res) => {
  res.status(404).send("<h1>Не найдено</h1>");
});
