'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post_Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Post_Image.belongsTo(models.Post, {
        foreignKey: 'postId',
        targetKey: 'id'
      });

      // Post_Image.belongsToMany(models.Post, {
      //   through: 'Post_Image_Post', as: 'Posts'}) // Una Post_Image puede pertenecer a muchos posts, y un post puede tener muchas Post_Imagees
    }
  }
  Post_Image.init({
    URL: {type: DataTypes.STRING, allowNull:false,unique: true}
  }, {
    sequelize,
    modelName: 'Post_Image',
    timestamps: false
  });
  return Post_Image;
};