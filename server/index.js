const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");

const app = express();
const port = 3001;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let availableTimes = [];

app.post('/api/add-available-time', (req, res) => {
    const { time } = req.body;
    
    // Check if the time is already in the availableTimes array
    if (!availableTimes.includes(time)) {
      availableTimes.push(time);
      res.status(201).send('Time added successfully');
    } else {
      res.status(400).send('Time already added');
    }
  });

app.get('/api/available-times', (req, res) => {
  res.json(availableTimes);
});

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

app.post('/booking/finish', (req, res) => {
    const { firstName, lastName, email, phone, date, selectedTime } = req.body;
  
    connection.query(
      "INSERT INTO personer (firstName, lastName, email, phone, date, selectedTime) VALUES (?, ?, ?, ?, ?, ?)",
      [firstName, lastName, email, phone, date, selectedTime],
      (error, results, fields) => {
        if (error) {
          console.error("Error querying database: " + error.stack);
          return res.status(500).send('Internal Server Error');
        }
  
        // Remove booked time from availableTimes
        const index = availableTimes.indexOf(selectedTime);
        if (index !== -1) {
          availableTimes.splice(index, 1);
        }
  
        res.json(results);
      }
    );
  });
  
  

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
