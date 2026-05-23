'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comentario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Comentario.belongsTo(models.User ,{
        foreignKey: 'userId', targetKey: 'id'})

      Comentario.belongsTo(models.Post, {
        foreignKey: 'postId', targetKey: 'id'})
    }
  }
  Comentario.init({
    idComentario: DataTypes.INTEGER,
    fechaPublicacion: DataTypes.DATE,
    esVisible: DataTypes.BOOLEAN,
    descripcion: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Comentario',
  });
  return Comentario;
};