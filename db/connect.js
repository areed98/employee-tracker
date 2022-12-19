// grab mysql2
const mysql = require("mysql2");

// connect to mysql database
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "!OBFUSCATED!",
    database: "management"
});

module.exports = db;