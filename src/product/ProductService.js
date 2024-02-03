//Handle business logic
const prisma = require("../db");

class ProductService {
  static getAllProducts = async () => {
    const products = await prisma.product.findMany();
    return products;
  };

  static getProductById = async (id) => {
    if (!id || typeof id !== "number") {
      throw Error("No Valid ID");
    }
    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) },
    });
    if (!product) {
      throw Error("Product not found");
    }
    return product;
  };

  static createProduct = async (newProductData) => {
    const product = await prisma.product.create({
      data: {
        name: newProductData.name,
        description: newProductData.description,
        image: newProductData.image,
        price: newProductData.price,
      },
    });
    return product;
  };

  static deleteProductById = async (id) => {
    await this.getProductById(id);

    await prisma.product.delete({
      where: {
        id: parseInt(id),
      },
    });
  };

  static patchProductById = async (id, ProductData) => {
    await this.getProductById(id);
    const product = await prisma.product.update({
      where: { id: parseInt(id) },
      data: {
        name: ProductData.name,
        description: ProductData.description,
        image: ProductData.image,
        price: ProductData.price,
      },
    });
    return product;
  };
  static putProductById = async (id, ProductData) => {
    const product = await this.patchProductById(id, ProductData);
  };
}
module.exports = ProductService;
