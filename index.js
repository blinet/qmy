/**
 * @Copyright 2021 Arth(https://github.com/4i8/)
 */
const mysql = require("mysql");
const got = require("got");
const v = require("./package.json");
const events = require("events");
//METHODS
const get = require("./src/methods/get");
const set = require("./src/methods/set");
const update = require("./src/methods/update");
const remove = require("./src/methods/remove");
const query = require("./src/methods/query");
const custom = require("./src/methods/log/custom");
const parseUrl = require("./src/methods/other/parseUrl");
const EventEmitter = new events();
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
        setTimeout(() => {
          EventEmitter.emit("error", error);
        }, 1);
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
            setTimeout(() => {
              EventEmitter.emit("error", err);
            }, 1);
          }
          try {
            setTimeout(() => {
              EventEmitter.emit("error", err);
            }, 1);
          } catch (e) {
            await reConnect(con, e);
            Connect();
          }
        } else {
          if (connectionlog == true)
            custom("Connect To MYSQL Successfully", "1EF59D");
          setTimeout(() => {
            EventEmitter.emit("connect", "Connect To MYSQL Successfully");
          }, 1);
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
  // <-connect->
  /**
   *connect() will resolve the process by calling the then() function and it will give you a notification that the connection was successful if there is an error, it will reject the process and you can call the catch() function and it will give you the error
* @example 
connect()
  .then(() => {
    //do something
    //...
  })
  .catch((error) => {
    //do something
    //...
    console.log(error);
  });

   */
  this.connect = function () {
    return new Promise((resolve, reject) => {
      EventEmitter.on("connect", () => {
        resolve();
      });
      EventEmitter.on("error", (error) => {
        reject(error);
      });
    });
  };
  // <-query->
  /**
*Use SQL statements to read from (or write to) a MySQL database. This is also called "to query" the database. The connection object created in the example above, has a method for querying the database
* @param  {array: <default:true>:boolean }
* @example query("<SQL statements>").then((result) => {
    console.log(result)
}).catch((err) => {
    console.log(err);
  });
*/
  this.query = function (sql, options = { array: true }) {
    return query(sql, Connection, options);
  };
  // <-get->
  /**
*	used to select data from a database
* @param  {array: <default:false>:boolean }
* @example get("<table>", "<Where>:<PrimaryKey>").then((result) => {
    console.log(result);
  }).catch((err) => {
    console.log(err);
  });
* Example of a <Where>:<PrimaryKey>
 @example get("users", "id:2324249073").then((result) => {
    console.log(result);
  }).catch((err) => {
    console.log(err);
  });
*/
  this.get = function (table, PrimaryKey, options = { array: false }) {
    return get(table, PrimaryKey, Connection, database, options);
  };
  // <-remove->
  /**
  *used to delete existing records in a table	
  *
  * @example remove("<table>", "<Where>:<PrimaryKey>").then((result) => {
    console.log(result)
 }).catch((err) => {
    console.log(err);
  });
  * Example of a <Where>:<PrimaryKey>
 @example 
  remove("users", "id:2324249073").then((result) => {
    console.log(result)
 }).catch((err) => {
    console.log(err);
  });
   */
  this.remove = function (table, PrimaryKey) {
    return remove(table, PrimaryKey, Connection, database, options);
  };
  // <-set->
  /**
   *Tused to insert new records in a table	
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
    "column": "id - name - color",
    "values": "2324249073 - arth - red"}, { sign:"-" }).then((result) => {
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
   *used to modify the existing records in a table
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
       PrimaryKey: "id:2324249073",
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
//   (async () => {
//     try {
//       const data = await got.post("https://img.shields.io/npm/v/qmy.json", {
//         responseType: "json",
//       });
//       if ("v" + v.version !== `${data.body.value}`) {
//         console.log(
//           `
// # New Version - ${data.body.value}           
// ╔═════════════╦═════════════════════════════════╗              
// ║ Install     ║ npm install qmy                 ║
// ╠═════════════╬═════════════════════════════════╣
// ║ #Note       ║ When you update to the latest   ║
// ║             ║ version, you don't get any bugs ║
// ╚═════════════╩═════════════════════════════════╝
//       `
//         );
//       }
//     } catch (error) {}
//   })();
  //<- END ->
}
module.exports = connection;
/**
 * @Copyright 2021 Arth(https://github.com/4i8/)
 */
