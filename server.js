// Dependencies
const db = require("./db/connect");
const init = require("./utils/init");

// connect to DB and have timeout for no connection
db.connect((err) => {
    console.table("Database is connected.");
    setTimeout(() => {
        init();
    }, 1000);
});