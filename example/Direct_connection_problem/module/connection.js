const qmy = require("qmy");

const connection = new qmy(
  {
    database: "<database>",
    host: "<host>",
    password: "<password>",
    port: 3306,
    user: "<user>",
  },
);
module.exports = connection;
