/* External Packages */
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
/* Internal Files */
const authRoute = require("./routes/auth");
const postsRoute = require("./routes/posts");

// Create the app
const app = express();

// Load dotenv
dotenv.config();

// Connect to DB
mongoose.connect(
  process.env.DB_URL,
  () => {
    console.log("Connected to DB!");
  }
);

/* Middlewares */
app.use(express.json());
app.use("/api/user", authRoute);
app.use("/api/posts", postsRoute);

// Spin up the server
app.listen(process.env.PORT, () => {
  console.log("Server running on port 5000...");
});


// uname = sagnik, pw = DiscoRhino007