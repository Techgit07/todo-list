const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1/todo-List");

const db = mongoose.connection;

db.on("error", console.error.bind(console, "database is not on"));

db.once("open", function (err, data) {
  if (err) {
    console.log("database in error" + err);
    return false;
  }
  console.log("database is open on server");
});

module.exports = db;
