//Copyright(c) 2021 Arth(qmy)
const json = require("./json/path.json");
const mysql = require(json.index.mysql);
const customconsole = require(json.index.customconsole);
const errorfile = require(json.index.error);
const TextP = require(json.index.Textprocessing);
const warn = require(json.index.warn);
const got = require("got");
const v = require("./package.json");
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
async function connection(
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
        status: (status_log = false),
        path: (pathlog = "./error.log"),
      },
    },
  }
) {
  var status_log = options.settings.logfile.status;
  var pathlog = options.settings.logfile.path;
  function mainerror(err) {
    if (err) {
      if (status_log == true) {
        errorfile(err, pathlog + "/error.log");
        customconsole("New Error: " + pathlog + "/error.log", "FF0000");
      } else {
        customconsole(err, "FF0000");
      }
    }
    return;
  }
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
  const reConnect = (connection, error) =>
    new Promise((resolve) => {
      connection.destroy();
      setTimeout(() => resolve(), 3500);
    });

  const Connect = () =>
    new Promise((resolve) => {
      const con = createCon();
      con.connect(async (err) => {
        if (err) {
          try {
            throw new Error(`Error:${err.code}`);
          } catch (e) {
            await reConnect(con, e);
            Connect();
          }
        } else {
          return resolve(con);
        }
      });
    });
  const connection = () =>
    new Promise(async (resolve) => {
      var p = await Connect();
      p.on("error", async (e) => {
        await reConnect(p, e);
        connection();
      });
      return resolve();
    });
  connection();
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
    if (!table || !PrimaryKey || !callback) {
      return warn(
        "get",
        `
      get("<table>", "<PrimaryKey>", function (result) {
        console.log(result)
      })
      `
      );
    }
    createCon().query(
      `SELECT * FROM ${TextP(database, "`")}.${TextP(
        table,
        "`"
      )} WHERE \`id\` = '${PrimaryKey}'`,
      function (err, result) {
        if (err) {
          return mainerror(err);
        }
        callback(result);
      }
    );
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
    if (!table || !column || !values || !callback) {
      return warn(
        "set",
        `
      set({ "table": "<table>", "column": "<column>", "values": "<values>"}, function (result) {
        console.log(result)
    })//It is placed "," if there is more than one value or column
      `
      );
    }
    createCon().query(
      `INSERT INTO ${TextP(database, "`")}.${TextP(table, "`")} (${TextP(
        column,
        "`"
      )}) VALUES (${TextP(values, `'`)});`,
      function (err, result) {
        if (err) {
          return mainerror(err);
        }
        callback(result);
      }
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
    if (!table || !column || !value || !PrimaryKey || !callback) {
      return warn(
        "update",
        `
      update({ table: "<table>", column: "<column>", PrimaryKey: "<PrimaryKey>", value: "<value>" }, function (result) {
        console.log(result)
    })
      `
      );
    }
    createCon().query(
      `UPDATE ${TextP(database, "`")}.${TextP(
        table,
        "`"
      )} SET \`${column}\` = '${value}' WHERE \`id\` = '${PrimaryKey}'`,
      function (err, result) {
        if (err) {
          return mainerror(err);
        }
        callback(result);
      }
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
    if (!table || !PrimaryKey || !callback) {
      return warn(
        "remove",
        `
      remove("<table>", "<PrimaryKey>", function (result) {
        console.log(result)
    })
      `
      );
    }
    createCon().query(
      `DELETE FROM  ${TextP(database, "`")}.${TextP(
        table,
        "`"
      )} WHERE  \`id\`='${PrimaryKey}'`,
      function (err, result) {
        if (err) {
          return mainerror(err);
        }
        callback(result);
      }
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
    if (!sql || !callback) {
      return warn(
        "query",
        `
      query("<sql>",function(result) {
        console.log(result)
    })
      `
      );
    }
    createCon().query(`${sql}`, function (err, result) {
      if (err) {
        return mainerror(err);
      }
      callback(result);
    });
  };
  //<- END ->
}
module.exports = connection;
