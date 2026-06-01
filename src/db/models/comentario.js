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
        return this.fechaPublicacion > new Date(Date.now() - 182.5 * 24 * 60 * 60 * 1000);// Resta 6 meses (182.5 dias, ese valor se puede cambiar) en milisegundos a la fecha de hoy
        // Otros ejemplos:
        // 5 * 1000                5 segundos
        // 30 * 1000               30 segundos
        // 2 * 60 * 1000           2 minutos
        // 15 * 60 * 1000          15 minutos
        // 2 * 60 * 60 * 1000      2 horas
        // 7 * 24 * 60 * 60 * 1000 7 días
      }
  }}, {
    sequelize,
    modelName: 'Comentario',
    createdAt: 'fechaPublicacion', // Cambia el nombre del campo que sequelize crea automaticamente para la fecha de publicacion
    updatedAt: false // Desactiva este campo de modificado
  });
  return Comentario;
};