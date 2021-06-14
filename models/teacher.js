'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Teacher extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Teacher.hasMany(models.Sections, {
        foreignKey: 'teacherId',
        as: 'sections'
      })
    }
  };
  Teacher.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    birthday: DataTypes.DATE,
    status: DataTypes.STRING
  }, {
    sequelize,
    tableName: 'Teachers',
    modelName: 'Teacher',
  });
  return Teacher;
};