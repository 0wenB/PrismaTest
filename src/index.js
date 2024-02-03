const express = require("express");
const app = express();
require("dotenv").config();
const ProductController = require("./product/ProductController");

const PORT = process.env.PORT;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/products", ProductController);

app.listen(PORT, () => {
  console.log("Express API Running On Port: " + PORT);
});
