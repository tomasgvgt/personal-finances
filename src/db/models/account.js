'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Account.hasMany(models.Transaction);
      models.Account.belongsTo(models.User, {
        foregnKey: {
          name: 'user_id'
        }
      });
    }
  }
  Account.init({
    type: {
      type: Datatypes.STRING,
      allowNull: false
    },
    bank: { 
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Account',
    tableName: 'account'
  });
  return Account;
};