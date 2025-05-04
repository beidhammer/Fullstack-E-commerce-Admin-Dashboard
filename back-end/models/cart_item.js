module.exports = (sequelize, DataTypes) => {
    const CartItem = sequelize.define('CartItem', {
      quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 1
      },
      price_at_time: DataTypes.DECIMAL(10,2)
    }, {
      tableName: 'cart_items',
      timestamps: true
    });
  
    CartItem.associate = (models) => {
      CartItem.belongsTo(models.Cart, { foreignKey: 'cart_id' });
      CartItem.belongsTo(models.Product, { foreignKey: 'product_id' });
    };
  
    return CartItem;
  };