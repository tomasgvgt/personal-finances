'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transacions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Transaction.BelongsTo(models.Category, {
        foregnKey: {
          name: 'categoryId'
        }
      });
      models.Transaction.BelongsTo(models.Account, {
        foregnKey: {
          name: 'accountId'
        }
      });
      models.Transaction.BelongsTo(models.User, {
        foregnKey: {
          name: 'userId'
        }
      });
    }
  }
  Transacions.init({
    type: {
      type: DataTypes.STRING,
      allowNul: false
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNul: false
    },
    description: {
      type: DataTypes.TEXT
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNul: false,
      references: {
        model: 'Category',
        key: 'id'
      }
    }, 
    accountId: {
      type: DataTypes.INTEGER,
      allowNul: false,
      references: {
        model: 'Account',
        key: 'id'
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNul: false,
      references: {
        model: 'User',
        key: 'id'
      }
    },
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transacions;
};