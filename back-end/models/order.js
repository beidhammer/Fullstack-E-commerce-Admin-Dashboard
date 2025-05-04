module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
      order_number: {
        type: DataTypes.STRING(8),
        unique: true
      },
      status: {
        type: DataTypes.ENUM('In Progress', 'Ordered', 'Completed'),
        defaultValue: 'In Progress'
      },
      membership_at_time: DataTypes.STRING
    }, {
      tableName: 'orders',
      timestamps: true
    });
  
    Order.associate = (models) => {
      Order.belongsTo(models.User, { foreignKey: 'user_id' });
      Order.hasMany(models.OrderItem, { foreignKey: 'order_id' });
    };
  
    return Order;
  };