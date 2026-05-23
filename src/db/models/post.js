'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Post.belongsToMany(models.Tag, {
        through: "Tag_Post", as: 'Tags'})

      Post.belongsToMany(models.Imagen, {
        through: 'Imagen_Post', as: 'Imagenes'})

      Post.belongsTo(models.User, {
        foreignKey: 'userId', targetKey: 'id'
      })
      
      Post.hasMany(models.Comentario, {
        foreignKey: 'idComentario', sourceKey: 'id'
      })
    }
  }
  Post.init({
    idPost: DataTypes.INTEGER,
    descripcion: DataTypes.STRING,
    fechaPublicacion: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};