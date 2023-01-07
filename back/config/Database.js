const { Sequelize } = require("sequelize");

const db = new Sequelize("ujian_pweb", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = db;
