require("dotenv").config();

const express = require("express");

const app = express();

const connectDB = require("./db/connect");

const PORT = process.env.PORT || 5000;

const products_routes = require("./routes/products");

// routes

app.get("/", (req, res) => {
  res.send("Hi, I'm live");
});

// Middleware

app.use("/api/products", products_routes);

// Listen PORT
const start = async () => {
  try {
    console.log("connect DB");
    await connectDB(process.env.MONGODB_URL);
    app.listen(PORT, () => {
      console.log(`${PORT} is connected`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
