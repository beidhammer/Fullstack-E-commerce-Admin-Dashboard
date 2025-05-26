const { Cart, CartItem, Product, Order, OrderItem, User } = require('../models');
const { v4: uuidv4 } = require('uuid');
const { sequelize } = require('../models');
const { Membership } = require('../models');

const getCart = async (userId) => {
  let cart = await Cart.findOne({
    where: { user_id: userId },
    include: [{ model: CartItem, include: [Product] }]
  });

  if (!cart) {
    cart = await Cart.create({ user_id: userId });
    cart = await Cart.findOne({
      where: { user_id: userId },
      include: [{ model: CartItem, include: [Product] }]
    });
  }

  return cart;
};

const addToCart = async (userId, productId, quantity) => {
  const cart = await getCart(userId);

  const product = await Product.findByPk(productId);

if (!product || product.isdeleted || product.quantity < quantity) {
  throw new Error('Product unavailable or not enough quantity');
}

  let cartItem = await CartItem.findOne({ where: { cart_id: cart.id, product_id: productId } });

  if (cartItem) {
    cartItem.quantity += quantity;
    await cartItem.save();
  } else {
    await CartItem.create({
      cart_id: cart.id,
      product_id: productId,
      quantity,
      price_at_time: product.unitprice
    });
  }

  return cart;
};

const removeFromCart = async (userId, productId) => {
  const cart = await getCart(userId);
  const cartItem = await CartItem.findOne({ where: { cart_id: cart.id, product_id: productId } });

  if (!cartItem) {
    throw new Error('Item not found in cart');
  }

  await cartItem.destroy();
};

const checkoutCart = async (userId) => {
  const cart = await getCart(userId);

  const cartItems = await CartItem.findAll({ where: { cart_id: cart.id }, include: [Product] });

  if (!cartItems.length) {
    throw new Error('Cart is empty');
  }

  const user = await User.findByPk(userId, { include: [{ model: Membership, as: 'Membership' }] });
  
  const membership = user.Membership;

  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Membership discount
  let discount = 0;
  if (membership) {
    discount = membership.discount_percent;
  }

  const order = await Order.create({
    user_id: userId,
    order_number: uuidv4().slice(0, 8), // Short unique order number
    status: 'In Progress',
    membership_at_time: membership.name
  });

  for (const item of cartItems) {
    await OrderItem.create({
      order_id: order.id,
      product_id: item.product_id,
      quantity: item.quantity,
      price_at_time: item.price_at_time * (1 - discount / 100)
    });

    // Update product stock
    const product = await Product.findByPk(item.product_id);
    product.quantity -= item.quantity;
    await product.save();
  }

  // Clear cart
  await CartItem.destroy({ where: { cart_id: cart.id } });

  /// Membership status update
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

module.exports = {
  getCart,
  addToCart,
  removeFromCart,
  checkoutCart
};