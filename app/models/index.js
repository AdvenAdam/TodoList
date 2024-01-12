const Sequelize = require('sequelize');

const dbConfig = require('../../config/db.config.js');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.checklist = require('./checklist.model.js')(sequelize, Sequelize);
db.checklistItem = require('./checklist.item.model.js')(sequelize, Sequelize);
db.user = require('./user.model.js')(sequelize, Sequelize);

db.checklist.hasMany(db.checklistItem);

module.exports = db;
