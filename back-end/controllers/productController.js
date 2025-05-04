const productService = require('../services/productService');

exports.getProducts = async (req, res, next) => {
  try {
    const products = await productService.getAllProducts();
    res.json({ Status: 'success', statuscode: 200, data: { result: 'Products retrieved', products } });
  } catch (error) {
    next(error);
  }
};

exports.getProduct = async (req, res, next) => {
  try {
    const product = await productService.getProductById(req.params.id);
    if (!product) return res.status(404).json({ status: 'error', statuscode: 404, data: { result: 'No product found' } });
    res.json({ Status: 'success', statuscode: 200, data: { result: 'Product retrieved', product } });
  } catch (error) {
    next(error);
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    const product = await productService.createProduct(req.body);
    res.status(201).json({ Status: 'success', statuscode: 201, data: { result: 'Product created', product } });
  } catch (error) {
    next(error);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const product = await productService.updateProduct(req.params.id, req.body);
    if (!product) return res.status(404).json({ status: 'error', statuscode: 404, data: { result: 'Product not found' } });
    res.json({ Status: 'success', statuscode: 200, data: { result: 'Product updated', product } });
  } catch (error) {
    next(error);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await productService.deleteProduct(req.params.id);
    if (!product) return res.status(404).json({ status: 'error', statuscode: 404, data: { result: 'Product not found' } });
    res.json({ Status: 'success', statuscode: 200, data: { result: 'Product soft-deleted', product } });
  } catch (error) {
    next(error);
  }
};