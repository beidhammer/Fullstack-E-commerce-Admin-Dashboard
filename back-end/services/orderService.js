const crypto = require('crypto');
const { Order, OrderItem, Product, User, Cart, CartItem, Membership, sequelize } = require('../models');

const createOrder = async (userId) => {
  const cart = await Cart.findOne({
    where: { user_id: userId },
    include: [{ model: CartItem, include: [Product] }]
  });

  if (!cart || !cart.CartItems.length) {
    throw new Error('Cart is empty');
  }

  const user = await User.findByPk(userId, {
    include: [{ model: Membership, as: 'Membership' }]
  });
  const membershipAtTime = user.Membership ? user.Membership.name : 'None';

  const orderNumber = crypto.randomBytes(4).toString('hex');

  const order = await Order.create({
    order_number: orderNumber,
    user_id: userId,
    status: 'In Progress',
    membership_at_time: membershipAtTime
  });

  for (const item of cart.CartItems) {
    await OrderItem.create({
      order_id: order.id,
      product_id: item.product_id,
      quantity: item.quantity,
      price_at_time: item.Product.unitprice
    });
  }

  await CartItem.destroy({ where: { cart_id: cart.id } });
  await Cart.destroy({ where: { id: cart.id } });

  // Membership status update
  const totalItemsOrdered = await sequelize.query(
    `SELECT SUM(quantity) as totalQuantity
     FROM order_items
     INNER JOIN orders ON orders.id = order_items.order_id
     WHERE orders.user_id = ${userId}`,
    { type: sequelize.QueryTypes.SELECT }
  );

  const quantityOrdered = totalItemsOrdered[0].totalQuantity || 0;

  let newMembershipId = 1; // Bronze
  if (quantityOrdered >= 30) {
    newMembershipId = 3; // Gold
  } else if (quantityOrdered >= 15) {
    newMembershipId = 2; // Silver
  }

  if (user.membership_id !== newMembershipId) {
    user.membership_id = newMembershipId;
    await user.save();
    console.log(`Membership updated to ID ${newMembershipId}`);
  }

  return order;
};

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
  const order = await Order.findByPk(orderId, {
    include: [{ model: OrderItem, include: [Product] }]
  });
  if (!order) return null;

  if (status === 'Completed') {
    for (const item of order.OrderItems) {
      const product = item.Product;
      if (product.quantity >= item.quantity) {
        product.quantity -= item.quantity;
        await product.save();
      } else {
        throw new Error(`Not enough stock for product ${product.name}`);
      }
    }
  }

  order.status = status;
  await order.save();
  return order;
};

module.exports = {
  createOrder,
  getUserOrders,
  getAllOrders,
  getOrderById,
  updateOrderStatus
};
