/**
 * @Copyright 2021 Arth(https://github.com/4i8/)
 */
const mysql = require("mysql");
const got = require("got");
const v = require("./package.json");
//METHODS
const get = require("./src/methods/get");
const set = require("./src/methods/set");
const update = require("./src/methods/update");
const remove = require("./src/methods/remove");
const query = require("./src/methods/query");
const custom = require("./src/methods/log/custom");
const parseUrl = require("./src/methods/other/parseUrl");
/**
 * Create a new Connection 
 ```js
 (connectionUri: string | ConnectionConfig): mysql.Connection
 ```
 */
function connection(
  ConnectionConfig = {
    host: "localhost",
    port: 3306,
    localAddress: undefined,
    socketPath: undefined,
    user: undefined,
    password: undefined,
    database: undefined,
    connectTimeout: 10000,
    insecureAuth: false,
    supportBigNumbers: false,
    bigNumberStrings: false,
    dateStrings: false,
    debug: undefined,
    trace: true,
    stringifyObjects: false,
    timezone: "local",
    flags: "",
    queryFormat: undefined,
    pool: undefined,
    ssl: false,
    localInfile: true,
    multipleStatements: false,
    typeCast: true,
    maxPacketSize: 0,
    charsetNumber: 33,
    clientFlags: 455631,
    protocol41: true,
  },
  options = {
    connection: {
      log: (connectionlog = true),
    },
  }
) {
  try {
    var database = ConnectionConfig.database;
    if (typeof ConnectionConfig === "string") {
      database = parseUrl(ConnectionConfig).database;
    }
    var connectionlog = options.connection.log;
  } catch {}
  const createCon = () => {
    let db = mysql.createConnection(ConnectionConfig);
    return db;
  };
  const reConnect = (connection, error) =>
    new Promise((resolve) => {
      if (!error.toString().includes("Packets out of order")) {
        throw error;
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
            throw err;
          }
          try {
            throw err;
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
* @param  {array: <default:false>:boolean }
* @example get("<table>", "<Where>:<PrimaryKey>").then((result) => {
    console.log(result);
  }).catch((err) => {
    console.log(err);
  });
* Example of a <Where>:<PrimaryKey>
 @example get("users", "id:1111111111").then((result) => {
    console.log(result);
  }).catch((err) => {
    console.log(err);
  });
*/
  this.get = function (table, PrimaryKey, options = { array: false }) {
    return get(table, PrimaryKey, Connection, database, options);
  };
  // <- query ->
  /**
*This is a query function that you can perform any operation with this function. 
*This function is useful for developers who want to perform an operation that is not available in existing functions
* @param  {array: <default:true>:boolean }
* @example query("<sql>",{ array: false }).then((result) => {
    console.log(result)
}).catch((err) => {
    console.log(err);
  });
*/
  this.query = function (sql, options = { array: true }) {
    return query(sql, Connection, options);
  };
  // <- Data remove ->
  /**
  *This function is used to remove data
  *
  * @example remove("<table>", "<Where>:<PrimaryKey>").then((result) => {
    console.log(result)
 }).catch((err) => {
    console.log(err);
  });
  * Example of a <Where>:<PrimaryKey>
 @example 
  remove("users", "id:1111111111").then((result) => {
    console.log(result)
 }).catch((err) => {
    console.log(err);
  });
   */
  this.remove = function (table, PrimaryKey) {
    return remove(table, PrimaryKey, Connection, database, options);
  };
  // <- Data storage ->
  /**
   *This function is used to save data in databases
   * @param  {sign: <default:",">:string }
   * @example set({
    "table": "<table>", 
    "column": "<column>",
     "values": "<values>"
    }).then((result) => {
    console.log(result)
 }).catch((err) => {
    console.log(err);
  });
   //It is placed sign if there is more than one value or column
   @example set({
    "table": "users", 
    "column": "id - arth - color",
    "values": "1111111111 - arth - red"}, { sign:"-" }).then((result) => {
    console.log(result)
 }).catch((err) => {
    console.log(err);
  });
   */
  this.set = function (
    { table: table, column: column, values: values },
    options = { sign: "," }
  ) {
    return set(
      { table: table, column: column, values: values },
      Connection,
      database,
      options
    );
  };
  // <- Data update ->
  /**
   *This function is used to update data in databases
   *
   * @example update({
       table: "<table>",
       column: "<column>",
       PrimaryKey: "<Where>:<PrimaryKey>",
       value: "<value>",
     }).then((result) => {
    console.log(result)
 }).catch((err) => {
    console.log(err);
  });
   * Example of a <Where>:<PrimaryKey>
 @example 
 update({
       table: "users",
       column: "name",
       PrimaryKey: "id:1111111111",
       value: "arth",
     }).then((result) => {
    console.log(result)
 }).catch((err) => {
    console.log(err);
  });
   */
  this.update = function ({
    table: table,
    column: column,
    value: value,
    PrimaryKey: PrimaryKey,
  }) {
    return update(
      { table: table, column: column, value: value, PrimaryKey: PrimaryKey },
      Connection,
      database,
      options
    );
  };
  (async () => {
    try {
      const data = await got.post("https://img.shields.io/npm/v/qmy.json", {
        responseType: "json",
      });
      if ("v" + v.version !== `${data.body.value}`) {
        console.log(
          `
# New Version - ${data.body.value}           
╔═════════════╦═════════════════════════════════╗              
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
  //<- END ->
}
module.exports = connection;
/**
 * @Copyright 2021 Arth(https://github.com/4i8/)
 */
