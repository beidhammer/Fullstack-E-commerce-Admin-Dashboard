const brandService = require('../services/brandService');

exports.getBrands = async (req, res, next) => {
  try {
    const brands = await brandService.getAllBrands();
    res.json({ Status: 'success', statuscode: 200, data: { result: 'Brands retrieved', brands } });
  } catch (error) {
    next(error);
  }
};

exports.getBrand = async (req, res, next) => {
  try {
    const brand = await brandService.getBrandById(req.params.id);
    if (!brand) return res.status(404).json({ status: 'error', statuscode: 404, data: { result: 'Brand not found' } });
    res.json({ Status: 'success', statuscode: 200, data: { result: 'Brand retrieved', brand } });
  } catch (error) {
    next(error);
  }
};

exports.createBrand = async (req, res, next) => {
  try {
    const brand = await brandService.createBrand(req.body);
    res.status(201).json({ Status: 'success', statuscode: 201, data: { result: 'Brand created', brand } });
  } catch (error) {
    next(error);
  }
};

exports.updateBrand = async (req, res, next) => {
  try {
    const brand = await brandService.updateBrand(req.params.id, req.body);
    if (!brand) return res.status(404).json({ status: 'error', statuscode: 404, data: { result: 'Brand not found' } });
    res.json({ Status: 'success', statuscode: 200, data: { result: 'Brand updated', brand } });
  } catch (error) {
    next(error);
  }
};

exports.deleteBrand = async (req, res, next) => {
  try {
    const brand = await brandService.deleteBrand(req.params.id);
    if (!brand) return res.status(404).json({ status: 'error', statuscode: 404, data: { result: 'Brand not found' } });
    res.json({ Status: 'success', statuscode: 200, data: { result: 'Brand deleted' } });
  } catch (error) {
    next(error);
  }
};