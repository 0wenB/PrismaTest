const express = require("express");
const app = express();
require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("HELLO WORLD ~yeah");
});

app.listen(PORT, () => {
  console.log("Express API Running On Port: " + PORT);
});
