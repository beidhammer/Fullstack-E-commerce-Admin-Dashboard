const searchService = require('../services/searchService');

exports.searchProducts = async (req, res, next) => {
  try {
    const products = await searchService.searchProducts(req.body);
    res.json({
      status: 'success',
      statuscode: 200,
      data: {
        result: products,
        recordsFound: products.length
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      statuscode: 400,
      data: {
        result: error.message
      }
    });
  }
};