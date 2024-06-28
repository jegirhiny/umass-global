/** Database for lunchly */

const pg = require("pg");

const db = new pg.Client("postgresql://postgres:user@localhost:5432/umass-global?schema=public");

db.connect();

module.exports = db;
