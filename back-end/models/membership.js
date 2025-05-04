module.exports = (sequelize, DataTypes) => {
    const Membership = sequelize.define('Membership', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      discount_percent: {
        type: DataTypes.DECIMAL(5,2),
        allowNull: false,
      },
      min_quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      }
    }, {
      tableName: 'memberships',
      timestamps: false
    });
  
    Membership.associate = (models) => {
      Membership.hasMany(models.User, { foreignKey: 'membership_id' });
    };
  
    return Membership;
  };