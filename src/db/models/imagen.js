'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Imagen extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Imagen.belongsToMany(models.post, {
        through: 'Imagen_Post', as: 'Posts'})
    }
  }
  Imagen.init({
    URL: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Imagen',
  });
  return Imagen;
};