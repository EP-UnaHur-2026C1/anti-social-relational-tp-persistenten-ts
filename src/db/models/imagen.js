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
      Imagen.belongsTo(models.Post, {
        through: 'Imagen_Post', as: 'Posts'}) // Una imagen puede pertenecer a un solo post, y un post puede tener muchas imagenes
    }
  }
  Imagen.init({
    URL: {type: DataTypes.STRING, allowNull:false,unique: true}
  }, {
    sequelize,
    modelName: 'Imagen',
    timestamps: false
  });
  return Imagen;
};