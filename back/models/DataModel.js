const { Sequelize } = require("sequelize");
const db = require("../config/Database.js");

const { DataTypes } = Sequelize;

const Data = db.define(
  "datas",
  {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    gender: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);

module.exports = Data;

(async () => {
  await db.sync();
})();
