const { Category } = require('../models');

const getAllCategories = async () => {
  return await Category.findAll();
};

const getCategoryById = async (id) => {
  return await Category.findByPk(id);
};

const createCategory = async (data) => {
  return await Category.create(data);
};

const updateCategory = async (id, data) => {
  const category = await Category.findByPk(id);
  if (!category) return null;
  return await category.update(data);
};

const deleteCategory = async (id) => {
  const category = await Category.findByPk(id);
  if (!category) return null;
  return await category.destroy();
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
};