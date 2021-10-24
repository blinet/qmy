const qmy = require("qmy");

const connection = new qmy(
  {
    database: "<database>",
    host: "<host>",
    password: "<password>",
    port: 3306,
    user: "<user>",
  },
  //optional
  {
    settings: {
      logfile: {
        //This option saves errors to a file
        status: true, //{default} false
        path: "../", //{default} ./
      },
      connection: {
        //{false} You will not see connection message in console log
        //{true} You will see connection message in console log
        log: false, //{default} true
      },
    },
  }
);
module.exports = connection;
