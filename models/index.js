const Sequelize = require("sequelize");
const fs = require("fs");
const path = require("path");
const basename = path.basename(__filename);
require("dotenv").config();

// Define each part of the connection configuration
const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.ADMIN_USERNAME,
  process.env.ADMIN_PASSWORD,
  {
    host: process.env.HOST,
    port: process.env.DATABASE_PORT,
    dialect: process.env.DIALECT,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // Set to true if strict SSL validation is needed
      },
    },
    logging: console.log, // Use `false` to disable SQL query logging, or `console.log` to show SQL queries
  }
);

const db = {};
db.sequelize = sequelize;

// Read all models in the directory and load them into Sequelize
fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize);
    db[model.name] = model;
  });

// Set up model associations if any exist
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
