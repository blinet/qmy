/**
 * @Copyright 2021 Arth(https://github.com/4i8/)
 */
const mysql = require("mysql");
const got = require("got");
const v = require("./package.json");
const config = require("./src/configs/settings.json");
const chalk = require("chalk");
//METHODS
const get = require("./src/methods/get");
const set = require("./src/methods/set");
const update = require("./src/methods/update");
const remove = require("./src/methods/remove");
const query = require("./src/methods/query");
const custom = require("./src/methods/log/custom");
const check = require("./src/methods/other/check");
const output = require("./src/methods/log/output");
(async () => {
  try {
    const data = await got.post("https://img.shields.io/npm/v/qmy.json", {
      responseType: "json",
    });
    if ("v" + v.version !== `${data.body.value}`) {
      console.log(
        `
╔═════════════╦═════════════════════════════════╗
║ New Version ║ ${data.body.value}                          ║
╠═════════════╬═════════════════════════════════╣
║ Install     ║ npm install qmy                 ║
╠═════════════╬═════════════════════════════════╣
║ #Note       ║ When you update to the latest   ║
║             ║ version, you don't get any bugs ║
╚═════════════╩═════════════════════════════════╝
      `
      );
    }
  } catch (error) {}
})();
function connection(
  {
    user: user,
    host: host,
    password: password,
    database: database,
    port: port,
  },
  options = {
    settings: {
      logfile: {
        status: (statuslog = false),
        path: (pathlog = "./"),
      },
      connection: {
        log: (connectionlog = true),
      },
    },
  }
) {
  try {
    var connectionlog = options.settings.connection.log;
    var statuslog = options.settings.logfile.status;
    var pathlog = options.settings.logfile.path;
  } catch {}
  connectionlog = check(connectionlog, true);
  statuslog = check(statuslog, false);
  pathlog = check(pathlog, "./");
  const createCon = () => {
    let db = mysql.createConnection({
      user: user,
      host: host,
      password: password,
      database: database,
      port: port,
    });
    return db;
  };
  function out(err) {
    return output(err, statuslog, pathlog);
  }
  const reConnect = (connection, error) =>
    new Promise((resolve) => {
      if (!error.toString().includes("Packets out of order")) {
        return out(error);
      }
      connection.destroy();
      if (connectionlog == true)
        custom("MYSQL Connection is Restarted", "F5E21E");
      setTimeout(() => resolve(), 3500);
    });

  const Connect = () =>
    new Promise((resolve) => {
      const con = createCon();
      con.connect(async (err) => {
        if (err) {
          if (!err.code.toString().includes("Packets out of order")) {
            return out(err.code);
          }
          try {
            throw new Error(err.code);
          } catch (e) {
            await reConnect(con, e);
            Connect();
          }
        } else {
          if (connectionlog == true)
            custom("Connect To MYSQL Successfully", "1EF59D");
          return resolve(con);
        }
      });
    });
  var Connection;
  const connection = () =>
    new Promise(async (resolve) => {
      Connection = await Connect();
      Connection.on("error", async (e) => {
        await reConnect(Connection, e);
        connection();
      });
      return resolve();
    });
  (async () => await connection())();
  //<- START ->

  // <-  Data get ->
  /**
*This function is used to get data from databases
*
* @example get("<table>", "<PrimaryKey>", function (result) {
  console.log(result)
})
*/
  this.get = function (table, PrimaryKey, callback) {
    return get(
      table,
      PrimaryKey,
      callback,
      statuslog,
      pathlog,
      Connection,
      database
    );
  };
  // <- Data remove ->
  /**
*This function is used to remove data
*
* @example remove("<table>", "<PrimaryKey>", function (result) {
    console.log(result)
})
*/
  this.remove = function (table, PrimaryKey, callback) {
    return remove(
      table,
      PrimaryKey,
      callback,
      statuslog,
      pathlog,
      Connection,
      database
    );
  };
  // <- query ->
  /**
*This is a query function that you can perform any operation with this function. 
*This function is useful for developers who want to perform an operation that is not available in existing functions
* @example query("<sql>",function(result) {
    console.log(result)
})
*/
  this.query = function (sql, callback) {
    return query(sql, callback, statuslog, pathlog, Connection);
  };
  // <- Data storage ->
  /**
  *This function is used to save data in databases
  *
  * @example set({ "table": "<table>", "column": "<column>", "values": "<values>"}, function (result) {
      console.log(result)
  })//It is placed "," if there is more than one value or column
  */
  this.set = function (
    { table: table, column: column, values: values },
    callback
  ) {
    return set(
      { table: table, column: column, values: values },
      callback,
      statuslog,
      pathlog,
      Connection,
      database
    );
  };
  // <- Data update ->
  /**
 *This function is used to update data in databases
 *
 * @example update({ table: "<table>", column: "<column>", PrimaryKey: "<PrimaryKey>", value: "<value>" }, function (result) {
   console.log(result)
})
 */
  this.update = function (
    { table: table, column: column, value: value, PrimaryKey: PrimaryKey },
    callback
  ) {
    return update(
      { table: table, column: column, value: value, PrimaryKey: PrimaryKey },
      callback,
      statuslog,
      pathlog,
      Connection,
      database
    );
  };
  //<- END ->
}
module.exports = connection;
/**
 * @Copyright 2021 Arth(https://github.com/4i8/)
 */
