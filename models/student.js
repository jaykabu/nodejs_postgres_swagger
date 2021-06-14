'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Student.belongsToMany(models.Sections, {
        through: 'Registration',
        foreignKey: 'studentId',
        as: 'sections'
      })
    }
  };
  Student.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    birthday: DataTypes.DATE,
    status: DataTypes.STRING
  }, {
    sequelize,
    tableName: 'Student',
    modelName: 'Student',
  });
  return Student;
};