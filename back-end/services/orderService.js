const { Order, OrderItem, Product, User } = require('../models');

const getUserOrders = async (userId) => {
  return await Order.findAll({
    where: { user_id: userId },
    include: [{ model: OrderItem, include: [Product] }]
  });
};

const getAllOrders = async () => {
  return await Order.findAll({
    include: [
      { model: User, attributes: ['id', 'username', 'email'] },
      { model: OrderItem, include: [Product] }
    ]
  });
};

const getOrderById = async (orderId) => {
  return await Order.findByPk(orderId, {
    include: [
      { model: User, attributes: ['id', 'username', 'email'] },
      { model: OrderItem, include: [Product] }
    ]
  });
};

const updateOrderStatus = async (orderId, status) => {
  const order = await Order.findByPk(orderId);
  if (!order) return null;
  order.status = status;
  await order.save();
  return order;
};

module.exports = {
  getUserOrders,
  getAllOrders,
  getOrderById,
  updateOrderStatus
};