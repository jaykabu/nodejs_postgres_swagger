'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Section extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Section.belongsTo(models.Teacher, {foreignKey: 'teacherId'});
      Section.belongsTo(models.Subject, {foreignKey: 'subjectId'});
      Section.belongsTo(models.Course, {foreignKey: 'courseId'});
      Section.belongsToMany(models.Student, {
        through: 'Registration',
        as: 'students',
        foreignKey: 'sectionId'
      })
    }
  };
  Section.init({
    teacherId: DataTypes.INTEGER,
    subjectId: DataTypes.INTEGER,
    courseId: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    tableName: 'Sections',
    modelName: 'Section',
  });
  return Section;
};