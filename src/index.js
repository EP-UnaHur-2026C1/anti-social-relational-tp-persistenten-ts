const express = require('express');
const app = express();
const PORT = process.env.PORT ?? 3001;
const routes = require('./routes');
const init = require('./init');
const {Post_Image, Post, Tag, User, Comentario} = require('./db/models');

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

