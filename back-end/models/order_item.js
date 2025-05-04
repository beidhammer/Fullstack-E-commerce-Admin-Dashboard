module.exports = (sequelize, DataTypes) => {
    const OrderItem = sequelize.define('OrderItem', {
      quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 1
      },
      price_at_time: DataTypes.DECIMAL(10,2)
    }, {
      tableName: 'order_items',
      timestamps: true
    });
  
    OrderItem.associate = (models) => {
      OrderItem.belongsTo(models.Order, { foreignKey: 'order_id' });
      OrderItem.belongsTo(models.Product, { foreignKey: 'product_id' });
    };
  
    return OrderItem;
  };