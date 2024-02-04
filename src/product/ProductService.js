//Handle business logic
const prisma = require("../db");
const {
  findProducts,
  findProductById,
  insertProduct,
  deleteProduct,
  patchProduct,
} = require("./ProductRepository");

class ProductService {
  static getAllProducts = async () => {
    const products = await findProducts();
    return products;
  };

  static getProductById = async (id) => {
    if (!id || typeof id !== "number") {
      throw Error("No Valid ID");
    }
    const product = await findProductById(parseInt(id));
    if (!product) {
      throw Error("Product not found");
    }
    return product;
  };

  static createProduct = async (newProductData) => {
    const product = await insertProduct(newProductData);
    return product;
  };

  static deleteProductById = async (id) => {
    await this.getProductById(id);

    await deleteProduct(id);
  };

  static patchProductById = async (id, ProductData) => {
    await this.getProductById(id);
    const product = await patchProduct(id, ProductData);
    return product;
  };
  static putProductById = async (id, ProductData) => {
    const product = await this.patchProductById(id, ProductData);
  };
}
module.exports = ProductService;
