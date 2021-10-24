/**
 * @Copyright 2021 Arth(https://github.com/4i8/)
 */
const sqlprocessor = require("./other/sqlprocessor");
const warn = require("./log/warn");
const output = require("./log/output");
const e = require("../configs/error.json");
function get(
  table,
  PrimaryKey,
  callback,
  statuslog,
  pathlog,
  Connection,
  database
) {
  function out(err) {
    return output(err, statuslog, pathlog);
  }
  if (!table || !PrimaryKey || !callback) {
    return warn(
      "get",
      `
      get("<table>", "<PrimaryKey>", function (result) {
       if(!result[0]) {
        console.log(false)
       }else if(result[0]) {
         console.log(result[0])
       }
      })
      `
    );
  }
  //START
  try {
    Connection.query(
      `SELECT * FROM ${sqlprocessor(database, "`")}.${sqlprocessor(
        table,
        "`"
      )} WHERE \`id\` = '${PrimaryKey}'`,
      function (err, result) {
        if (err) {
          return out(err);
        }
        callback(result);
      }
    );
  } catch (erroR) {
    if (erroR.toString() === e.query_undefined) {
      out(
        `Solve this problem in this link:
https://github.com/4i8/qmy/tree/main/example/Direct_connection_problem\n` +
          e.query_undefined
      );
    } else {
      out(erroR);
    }
  }
  //END
}
module.exports = get;
/**
 * @Copyright 2021 Arth(https://github.com/4i8/)
 */
