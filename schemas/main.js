const express = require("express");
const db = require("./db/models");
const app = express();
const PORT = process.env.PORT || 3001;


app.use(express.json());

//Todo lo que se quiera probar...


app.listen(PORT, async () => {
  console.log(`La app arranco en el puerto ${PORT}.`);
  //await db.sequelize.sync({ force: true });
});