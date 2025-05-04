module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      unitprice: DataTypes.DECIMAL(10,2),
      imgurl: DataTypes.STRING,
      quantity: DataTypes.INTEGER,
      isdeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    }, {
      tableName: 'products',
      timestamps: true
    });
  
    Product.associate = (models) => {
      Product.belongsTo(models.Brand, { foreignKey: 'brand_id' });
      Product.belongsTo(models.Category, { foreignKey: 'category_id' });
      Product.hasMany(models.CartItem, { foreignKey: 'product_id' });
      Product.hasMany(models.OrderItem, { foreignKey: 'product_id' });
    };
  
    return Product;
  };