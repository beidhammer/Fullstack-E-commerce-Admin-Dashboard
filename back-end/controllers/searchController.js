const searchService = require('../services/searchService');

exports.searchProducts = async (req, res, next) => {
  try {
    const products = await searchService.searchProducts(req.query);
    res.json({
      Status: 'success',
      statuscode: 200,
      data: { result: 'Search results', products },
    });
  } catch (error) {
    next(error);
  }
};