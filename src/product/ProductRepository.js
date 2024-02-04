//berkomunikasi dengan database
//Boleh pake ORM, boleh jg raw query
//Supaya mau ganti2 ORM tinggal edit di file ini
const prisma = require("../db");

const findProducts = async () => {
  const products = await prisma.product.findMany();
  return products;
};

const findProductById = async (id) => {
  const product = await prisma.product.findUnique({
    where: { id: parseInt(id) },
  });
  return product;
};

const insertProduct = async (productData) => {
  const product = await prisma.product.create({
    data: {
      name: productData.name,
      description: productData.description,
      image: productData.image,
      price: productData.price,
    },
  });
  return product;
};

const deleteProduct = async (id) => {
  await prisma.product.delete({
    where: {
      id: parseInt(id),
    },
  });
};

const patchProduct = async (id, ProductData) => {
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

module.exports = {
  findProducts,
  findProductById,
  insertProduct,
  deleteProduct,
  patchProduct,
};
