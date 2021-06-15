'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Registration extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Registration.belongsTo(models.Student, {foreignKey: 'studentId'});
      Registration.belongsTo(models.Section, {foreignKey: 'sectionId'})
    }
  };
  Registration.init({
    studentId: DataTypes.INTEGER,
    sectionId: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    tableName: 'Registrations',
    modelName: 'Registration',
  });
  return Registration;
};