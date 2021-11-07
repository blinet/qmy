/**
 * @Copyright 2021 Arth(https://github.com/4i8/)
 */
const sqlprocessor = require("./other/sqlprocessor");
const warn = require("./log/warn");
const output = require("./log/output");
const e = require("../configs/error.json");
function set(
  { table: table, column: column, values: values },
  callback,
  statuslog,
  pathlog,
  Connection,
  database
) {
  function out(err) {
    return output(err, statuslog, pathlog);
  }
  if (!table || !column || typeof values == "undefined") {
    return warn(
      "set",
      `
      set({ "table": "<table>", "column": "<column>", "values": "<values>"})
      //It is placed "," if there is more than one value or column
    
      `
    );
  }
  //START
  try {
    Connection.query(
      `INSERT INTO ${sqlprocessor(database, "`")}.${sqlprocessor(
        table,
        "`"
      )} (${sqlprocessor(column, "`")}) VALUES (${sqlprocessor(values, `'`)});`,
      function (err, result) {
        if (err) {
          return out(err);
        }
        if (callback) {
          callback(result);
        }
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
module.exports = set;
/**
 * @Copyright 2021 Arth(https://github.com/4i8/)
 */
