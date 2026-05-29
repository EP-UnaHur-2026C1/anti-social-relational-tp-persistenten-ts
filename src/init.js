const init = async () => {
    const db = require('./db/models').sequelize;
    await db.sync({ force: true });
    //....
    console.log('Base de datos sincronizada correctamente.');
}

module.exports = init;