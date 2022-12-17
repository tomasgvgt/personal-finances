'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Transaction);
      this.hasMany(models.Account);
      this.belongsToMany(models.Category, {
        through: models.UserCategory,
        foreignKey:{
          name: 'userId'
        }
      });
    }
  }
  User.init(
    {
      firstName: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      userName: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'user',
      underscored: true
    },
  );
  return User;
};
