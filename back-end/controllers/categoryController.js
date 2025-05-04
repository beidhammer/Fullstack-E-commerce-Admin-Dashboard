const categoryService = require('../services/categoryService');

exports.getCategories = async (req, res, next) => {
  try {
    const categories = await categoryService.getAllCategories();
    res.json({ Status: 'success', statuscode: 200, data: { result: 'Categories retrieved', categories } });
  } catch (error) {
    next(error);
  }
};

exports.getCategory = async (req, res, next) => {
  try {
    const category = await categoryService.getCategoryById(req.params.id);
    if (!category) return res.status(404).json({ status: 'error', statuscode: 404, data: { result: 'Category not found' } });
    res.json({ Status: 'success', statuscode: 200, data: { result: 'Category retrieved', category } });
  } catch (error) {
    next(error);
  }
};

exports.createCategory = async (req, res, next) => {
  try {
    const category = await categoryService.createCategory(req.body);
    res.status(201).json({ Status: 'success', statuscode: 201, data: { result: 'Category created', category } });
  } catch (error) {
    next(error);
  }
};

exports.updateCategory = async (req, res, next) => {
  try {
    const category = await categoryService.updateCategory(req.params.id, req.body);
    if (!category) return res.status(404).json({ status: 'error', statuscode: 404, data: { result: 'Category not found' } });
    res.json({ Status: 'success', statuscode: 200, data: { result: 'Category updated', category } });
  } catch (error) {
    next(error);
  }
};

exports.deleteCategory = async (req, res, next) => {
  try {
    const category = await categoryService.deleteCategory(req.params.id);
    if (!category) return res.status(404).json({ status: 'error', statuscode: 404, data: { result: 'Category not found' } });
    res.json({ Status: 'success', statuscode: 200, data: { result: 'Category deleted' } });
  } catch (error) {
    next(error);
  }
};