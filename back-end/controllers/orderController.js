const orderService = require('../services/orderService');

exports.createOrder = async (req, res, next) => {
  try {
    const order = await orderService.createOrder(req.user.id);
    res.status(201).json({
      Status: 'success',
      statuscode: 201,
      data: { result: 'Order created', order }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      statuscode: 400,
      data: { result: error.message }
    });
  }
};

exports.getUserOrders = async (req, res, next) => {
  try {
    const orders = await orderService.getUserOrders(req.user.id);
    res.json({ Status: 'success', statuscode: 200, data: { result: 'Orders retrieved', orders } });
  } catch (error) {
    next(error);
  }
};

exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await orderService.getAllOrders();
    res.json({ Status: 'success', statuscode: 200, data: { result: 'All orders retrieved', orders } });
  } catch (error) {
    next(error);
  }
};

exports.getOrderById = async (req, res, next) => {
  try {
    const order = await orderService.getOrderById(req.params.id);
    if (!order) return res.status(404).json({ status: 'error', statuscode: 404, data: { result: 'Order not found' } });
    res.json({ Status: 'success', statuscode: 200, data: { result: 'Order retrieved', order } });
  } catch (error) {
    next(error);
  }
};

exports.updateOrderStatus = async (req, res, next) => {
  try {
    const order = await orderService.updateOrderStatus(req.params.id, req.body.status);
    if (!order) return res.status(404).json({ status: 'error', statuscode: 404, data: { result: 'Order not found' } });
    res.json({ Status: 'success', statuscode: 200, data: { result: 'Order status updated', order } });
  } catch (error) {
    next(error);
  }
};