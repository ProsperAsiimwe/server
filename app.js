"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const database = require("./database");

const profileRoutes = require("./routes/profile");
const userRoutes = require("./routes/user");
const commentRoutes = require("./routes/comment");

const app = express();

const port = process.env.PORT || 3000;

// set the view engine to ejs
app.set("view engine", "ejs");

app.use(bodyParser.json());

// routes
app.use("/profiles", profileRoutes);

app.use("/users", userRoutes);

app.use("/comments", commentRoutes);

// start server
const startServer = async () => {
  try {
    await database.startDatabase();
    console.log("Database connection successful");
    app.listen(port, () =>
      console.log("Express started. Listening on %s", port)
    );
  } catch (err) {
    console.error(`Error connecting to database: ${err}`);
  }
};

if (require.main === module) {
  // start server only if app.js is the main module
  startServer();
}

module.exports = app;
