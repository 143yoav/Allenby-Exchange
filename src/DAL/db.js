const Sequelize = require('sequelize');
const config = require('../../config/db.json');

const sequelize = new Sequelize(config.name, config.user, config.password, {
  host: config.server,
  dialect: config.dialect,
  define: {
    timestamps: config.timestamps
  },
  logging: false
});

module.exports = {
  Sequelize,
  sequelize,
  loans: require('../models/loan.model.js')(sequelize, Sequelize)
};
