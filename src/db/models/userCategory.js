'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  }
  UserCategory.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'User',
          table: 'user',
          key: 'id',
        },
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Category',
          table: 'category',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'UserCategory',
      tableName: 'user_category',
      underscored: true,
    },
  );
  return UserCategory;
};
