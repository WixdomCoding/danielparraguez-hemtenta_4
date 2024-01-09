const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");

const app = express();
const port = 3001;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "Tenta4",
});

connection.connect((err) => {
    if (err) {
      console.error("Error connecting to database: " + err.stack);
      return;
    }

    console.log("Connected to database with ID " + connection.threadId);
});

app.post("/booking/finish", (req, res) => {
  const { firstName, lastName, email, phone, date } = req.body;

  connection.query(
    "INSERT INTO personer (firstName, lastName, email, phone, date) VALUES (?, ?, ?, ?, ?)",
    [firstName, lastName, email, phone, date],
    (error, results, fields) => {
      if (error) {
        console.error("Error querying database: " + error.stack);
        return;
      }

      res.json(results);
    }
  );
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
