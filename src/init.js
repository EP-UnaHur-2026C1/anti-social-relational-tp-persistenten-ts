const {Post_Image, Post, Tag, User, Comentario} = require('./db/models');


const init = async () => {
    const db = require('./db/models').sequelize;
    await db.sync({ force: true });
    
    const post1 = await Post.create({
        descripcion: "Post 1 de prueba"
    })
    const user1 = await User.create({
        nickName: "Usuario1"
    })
    const tag1 = await Tag.create({
        descripcion: "Tag1"
    })
    const postImage1 = await Post_Image.create({
        URL: "https:ejemplo.png"
    });
    const comentario1 = await Comentario.create({
        descripcion: "Comentario 1 de prueba"
    })

    await post1.setUser(user1);
    await post1.addTag(tag1);
    await post1.addPost_Image(postImage1);
    await post1.addComentario(comentario1);

    console.log('Base de datos sincronizada correctamente.');
}

module.exports = init;