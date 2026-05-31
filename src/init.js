const init = async () => {
  const db = require('./db/models').sequelize;
  const { Post_Image, Post, Tag, User, Comentario } = require('./db/models');
  await db.sync({ force: true });

  const user1 = await User.create({ nickName: "Usuario1" });

  const post1 = await Post.create({
    descripcion: "Post 1 de prueba",
    userId: user1.id
  });

  const tag1 = await Tag.create({ descripcion: "Tag1" });
  await post1.addTag(tag1);

  const postImage1 = await Post_Image.create({
    URL: "https://ejemplo.png",
    postId: post1.id
  });

  const comentario1 = await Comentario.create({
    descripcion: "Comentario 1 de prueba",
    postId: post1.id,
    userId: user1.id
  });

  console.log('Base de datos sincronizada correctamente.');
};

module.exports = init;