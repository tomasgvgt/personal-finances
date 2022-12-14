'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Transaction);
      this.belongsTo(models.User, {
        foreignKey: {
          name: 'user_id',
        },
      });
    }
  }
  Account.init(
    {
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      bank: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      total: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'User',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'Account',
      tableName: 'account',
      underscored: true,
    },
  );
  return Account;
};
