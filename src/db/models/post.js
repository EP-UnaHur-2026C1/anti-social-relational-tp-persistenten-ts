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
        through: "Tag_Post", as: 'Tags'}) // Un post puede tener muchos tags, y un tag puede estar asociada a muchos posts

      Post.belongsToMany(models.Post_Image, {
        through: 'Imagen_Post', as: 'Imagenes'}) // Un post puede tener muchas imagenes, y una imagen puede pertenecer a muchos posts

      Post.belongsTo(models.User, {
        foreignKey: 'userId', targetKey: 'id'}) // Muchos posts pertenecen a un usuario
      
      Post.hasMany(models.Comentario, {
        foreignKey: 'postId', sourceKey: 'id'}) // Un post tiene muchos comentarios
    }
  }
  Post.init({
    descripcion: {type: DataTypes.STRING, allowNull:false},
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};