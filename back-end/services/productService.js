const { Product, Brand, Category } = require('../models');
const { sequelize } = require('../models');

const getAllProducts = async () => {
  return await sequelize.query(
    `SELECT p.*, b.name AS brand, c.name AS category 
     FROM products p 
     JOIN brands b ON p.brand_id = b.id 
     JOIN categories c ON p.category_id = c.id`,
    { type: sequelize.QueryTypes.SELECT }
  );
};

const getProductById = async (id) => {
  return await Product.findByPk(id);
};

const createProduct = async (data) => {
  return await Product.create(data);
};

const updateProduct = async (id, data) => {
  const product = await Product.findByPk(id);
  if (!product) return null;
  return await product.update(data);
};

const deleteProduct = async (id) => {
  const product = await Product.findByPk(id);
  if (!product) return null;
  return await product.update({ isdeleted: true });
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};