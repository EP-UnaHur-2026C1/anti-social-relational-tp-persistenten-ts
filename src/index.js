const express = require('express');
const app = express();
const PORT = process.env.PORT ?? 3001;
const routes = require('./routes');
const init = require('./init');

app.use(express.json());
app.use(routes);


const server = app.listen(PORT, async () => {
  try {
    await init();
    console.log(`Aplicación iniciada correctamente en el puerto:${PORT}`);
  } catch (err) {
    console.error('Error al iniciar la aplicación:', err.message);
    process.exit();
  }
});

server.on('error', (err) => {
    console.error('Error al iniciar el servidor:', err.message);
    process.exit();
});

//sacar todo lo de abajo
(async () => {
  const db = require("./db/models").sequelize;
  const {Imagen, Post} = require("./db/models")
  await db.sync({force: true});

  const p1 = await Post.create({
    descripcion: "Descripción"
  })
  
  const i1 = await Imagen.create({
    url: "https://www.xataka.com/espacio/han-sido-necesarias-50-000-fotos-para-capturar-esta-alucinante-imagen-81-mpixeles-luna"
  })

  await p1.addImagen(i1)
  await i1.addPost(p1)


})