'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Category, {
        foreignKey: {
          name: 'category_id',
        },
      });
      this.belongsTo(models.Account, {
        foreignKey: {
          name: 'account_id',
        },
      });
      this.belongsTo(models.User, {
        foreignKey: {
          name: 'user_id',
        },
      });
    }
  }
  Transaction.init(
    {
      type: {
        type: DataTypes.ENUM('income', 'expense'),
        allowNull: false,
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
      },
      categoryId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Category',
          key: 'id',
        }
      },
      accountId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Account',
          key: 'id',
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'User',
          table: 'user',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'Transaction',
      tableName: "transaction",
      underscored: true,
    },
  );

  return Transaction;
};
