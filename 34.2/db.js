/** Database setup for BizTime. */

const { Client } = require("pg");

let DB_URI = "postgresql://postgres:user@localhost:5432/umass-global?schema=public";

let db = new Client({
  connectionString: DB_URI,
});

db.connect()
  .then(() => console.log("Connected to database"))
  .catch((err) => console.error("Error connecting to database", err));

module.exports = db;
