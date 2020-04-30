// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Restaurant table occupancy and waiting list (DATA)
// =============================================================
var tables = [
  {
    name: "Ace",
    phoneNumber: "123456789",
    email: "Ace@e.com",
    id: "Ace"
  },
  {
    name: "Jace",
    phoneNumber: "123456789",
    email: "Jace@e.com",
    id: "Jace"
  }
];

var waitinglist = [
  {
    name: "Cass",
    phoneNumber: "123456789",
    email: "Cass@e.com",
    id: "Cass"
  }
];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
});

// Displays all people who occupy a table
app.get("/api/tables", function(req, res) {
  return res.json(tables);
});

// Displays all people who are on the waitinglist
app.get("/api/waitinglist", function(req, res) {
  return res.json(waitinglist);
});

// Assign guest to table or waiting list (based on object from reserve.html)
app.post("/reserve", function(req, res) {
  var newGuest = req.body;

  console.log(newGuest);

  if (tables.length <= 5) {
    tables.push(newGuest);
    alert("Table successfully booked!");
  } else if (tables.length > 5) {
    waitinglist.push(newGuest);
    alert("All tables preoccupied. Added guest to waiting list.");
  }

});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
