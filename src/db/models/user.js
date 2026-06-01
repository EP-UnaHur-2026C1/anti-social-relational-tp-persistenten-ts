'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Comentario,{
        foreignKey: 'userId', sourceKey: 'id'
      }) // Un usuario tiene muchos comentarios

      User.hasMany(models.Post, {
        foreignKey: 'userId', sourceKey: 'id'
      }) // Un usuario tiene muchos posts

      // Para la parte donde los users pueden seguir y ser seguidos por otros
      //Parte para obtener los seguidores
      User.belongsToMany(User, {
        as: 'seguidores',         // Nombre de la relacion
        through: 'User_Seguidor', // Nombre de la tabla intermedia
        foreignKey: 'siguiendoId',
        otherKey: 'seguidorId'    // La columna dondne va el id del otro modelo relacionado
      });

      //Parte para obtener los seguidos
      User.belongsToMany(User, {
        as: 'siguiendo',
        through: 'User_Seguidor',
        foreignKey: 'seguidorId',
        otherKey: 'siguiendoId'
      });
    }
  }
  User.init({
    nickName: {type: DataTypes.STRING, allowNull:false,unique: true}
  }, {
    sequelize,
    modelName: 'User',
    timestamps: false
  });
  return User;
};