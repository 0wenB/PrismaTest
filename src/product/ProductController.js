//Handle request dan response
//Handle validasi body

const express = require("express");
const prisma = require("../db/index");
const ProductService = require("./ProductService");

const router = express.Router();

router.get("/banner", (req, res) => {
  res.send("HELLO WORLD ~yeah");
});

router.get("/", async (req, res) => {
  const products = await ProductService.getAllProducts();
  res.send(products);
});

router.get("/:id", async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const product = await ProductService.getProductById(productId);
    res.status(200).send(product);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const newProductData = req.body;
    const product = await ProductService.createProduct(newProductData);
    res.status(201).send({
      data: product,
      message: "New product successfully created!",
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const productId = parseInt(req.params.id);

    await ProductService.deleteProductById(productId);

    res.send(`Product with id ${productId} deleted`);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
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
    const product = await ProductService.patchProductById(
      productId,
      ProductData
    );

    res.status(200).send({
      data: product,
      message: "Edit product successful (PUT)",
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const productData = req.body;
    const product = await ProductService.patchProductById(
      productId,
      productData
    );

    res.status(200).send({
      data: product,
      message: "Edit product successful (PATCH)",
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
