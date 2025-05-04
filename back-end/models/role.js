module.exports = (sequelize, DataTypes) => {
    const Role = sequelize.define('Role', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    }, {
      tableName: 'roles',
      timestamps: false
    });
  
    Role.associate = (models) => {
      Role.hasMany(models.User, { foreignKey: 'role_id' });
    };
  
    return Role;
  };