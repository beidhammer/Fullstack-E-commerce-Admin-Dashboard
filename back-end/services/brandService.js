const { Brand } = require('../models');

const getAllBrands = async () => {
  return await Brand.findAll();
};

const getBrandById = async (id) => {
  return await Brand.findByPk(id);
};

const createBrand = async (data) => {
  return await Brand.create(data);
};

const updateBrand = async (id, data) => {
  const brand = await Brand.findByPk(id);
  if (!brand) return null;
  return await brand.update(data);
};

const deleteBrand = async (id) => {
  const brand = await Brand.findByPk(id);
  if (!brand) return null;
  return await brand.destroy();
};

module.exports = {
  getAllBrands,
  getBrandById,
  createBrand,
  updateBrand,
  deleteBrand
};