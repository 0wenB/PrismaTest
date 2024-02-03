const express = require("express");
const app = express();
require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const PORT = process.env.PORT;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/banner", (req, res) => {
  res.send("HELLO WORLD ~yeah");
});

app.get("/products", async (req, res) => {
  const products = await prisma.product.findMany();
  res.send(products);
});

app.get("/products/:id", async (req, res) => {
  const productId = req.params.id;
  const product = await prisma.product.findUnique({
    where: { id: parseInt(productId) },
  });
  if (!product) {
    res.status(404).send("Product not found");
  }
  res.status(200).send(product);
});

app.post("/products", async (req, res) => {
  const newProductData = req.body;
  const product = await prisma.product.create({
    data: {
      name: newProductData.name,
      description: newProductData.description,
      image: newProductData.image,
      price: newProductData.price,
    },
  });
  res.status(201).send({
    data: product,
    message: "New product successfully created!",
  });
});

app.delete("/products/:id", async (req, res) => {
  const productId = req.params.id;

  await prisma.product.delete({
    where: {
      id: parseInt(productId),
    },
  });

  res.send(`Product with id ${productId} deleted`);
});

app.put("/products/:id", async (req, res) => {
  const productId = req.params.id;
  const ProductData = req.body;

  if (
    !(
      ProductData.image &&
      ProductData.name &&
      ProductData.description &&
      ProductData.price
    )
  ) {
    return res.status(400).send("Some fields are missing");
  }
  const product = await prisma.product.update({
    where: { id: parseInt(productId) },
    data: {
      name: ProductData.name,
      description: ProductData.description,
      image: ProductData.image,
      price: ProductData.price,
    },
  });
  res.status(200).send({
    data: product,
    message: "Edit product successful (PUT)",
  });
});

app.patch("/products/:id", async (req, res) => {
  const productId = req.params.id;
  const ProductData = req.body;
  const product = await prisma.product.update({
    where: { id: parseInt(productId) },
    data: {
      name: ProductData.name,
      description: ProductData.description,
      image: ProductData.image,
      price: ProductData.price,
    },
  });
  res.status(200).send({
    data: product,
    message: "Edit product successful (PATCH)",
  });
});

app.listen(PORT, () => {
  console.log("Express API Running On Port: " + PORT);
});
