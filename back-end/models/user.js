module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      firstname: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [4, 20]
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      address: DataTypes.STRING,
      phone: DataTypes.STRING
    }, {
      tableName: 'users',
      timestamps: true
    });
  
    User.associate = (models) => {
      User.belongsTo(models.Role, { foreignKey: 'role_id' });
      User.belongsTo(models.Membership, { foreignKey: 'membership_id', as: 'Membership' });
      User.hasMany(models.Cart, { foreignKey: 'user_id' });
      User.hasMany(models.Order, { foreignKey: 'user_id' });
    };
  
    return User;
  };