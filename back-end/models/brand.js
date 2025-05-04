module.exports = (sequelize, DataTypes) => {
    const Brand = sequelize.define('Brand', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    }, {
      tableName: 'brands',
      timestamps: false
    });
  
    Brand.associate = (models) => {
      Brand.hasMany(models.Product, { foreignKey: 'brand_id' });
    };
  
    return Brand;
  };