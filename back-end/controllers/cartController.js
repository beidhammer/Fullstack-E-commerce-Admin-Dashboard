const cartService = require('../services/cartService');

exports.getCart = async (req, res, next) => {
  try {
    const cart = await cartService.getCart(req.user.id);
    res.json({ Status: 'success', statuscode: 200, data: { result: 'Cart retrieved', cart } });
  } catch (error) {
    next(error);
  }
};

exports.addToCart = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    const cart = await cartService.addToCart(req.user.id, productId, quantity || 1);
    res.status(201).json({ Status: 'success', statuscode: 201, data: { result: 'Product added to cart', cart } });
  } catch (error) {
    next(error);
  }
};

exports.removeFromCart = async (req, res, next) => {
  try {
    const { productId } = req.params;
    await cartService.removeFromCart(req.user.id, productId);
    res.json({ Status: 'success', statuscode: 200, data: { result: 'Product removed from cart' } });
  } catch (error) {
    next(error);
  }
};

exports.checkout = async (req, res, next) => {
  try {
    const order = await cartService.checkoutCart(req.user.id);
    res.status(201).json({ Status: 'success', statuscode: 201, data: { result: 'Checkout successful', order } });
  } catch (error) {
    next(error);
  }
};