module.exports = (sequelize, Sequelize) =>
  sequelize.define('loan', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    amount: {
      type: Sequelize.FLOAT,
      allowNull: false
    },
    currency: {
      type: Sequelize.STRING(3),
      allowNull: false
    },
    base: {
      type: Sequelize.FLOAT,
      allowNull: false
    },
    daily: {
      type: Sequelize.FLOAT,
      allowNull: false
    },
    date: {
      type: Sequelize.DATEONLY,
      allowNull: false
    }
  });
