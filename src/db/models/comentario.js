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
        foreignKey: 'userId', targetKey: 'id'}) // Muchos comentarios pertenece a un usuarios

      Comentario.belongsTo(models.Post, {
        foreignKey: 'postId', targetKey: 'id'}) // Muchos comentarios pertenecen a un post
    }
  }
  Comentario.init({
    descripcion: {type: DataTypes.STRING, allowNull:false},

    // Asi se ponen los atributos calculados
    estaVisible: {
      type: DataTypes.VIRTUAL, // Indica que no va a la base de datos, sino que existe solo en el modelo
      get() {
        // Aca se hace el calculo para definir el atributo
        return new Date(this.createdAt) > new Date() - 182.5 * 1000 * 60 * 60 * 24; // Resta 6 meses en milisegundos a la fecha de hoy
      }
  }}, {
    sequelize,
    modelName: 'Comentario',
    createdAt: 'fechaPublicacion' // Cambia el nombre del campo que sequelize crea automaticamente para la fecha de publicacion
  });
  return Comentario;
};