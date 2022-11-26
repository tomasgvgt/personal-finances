'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transactions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Transaction.BelongsTo(models.Category, {
        foregnKey: {
          name: 'category_id'
        }
      });
      models.Transaction.BelongsTo(models.Account, {
        foregnKey: {
          name: 'account_id'
        }
      });
      models.Transaction.BelongsTo(models.User, {
        foregnKey: {
          name: 'user_id'
        }
      });
    }
  }
  Transactions.init({
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ammount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Category',
        key: 'id'
      }
    }, 
    account_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Account',
        key: 'id'
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id'
      }
    },
  }, {
    sequelize,
    modelName: 'Transaction',
    tableName: 'transaction'
  });
  return Transactions;
};