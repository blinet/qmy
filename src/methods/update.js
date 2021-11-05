/**
 * @Copyright 2021 Arth(https://github.com/4i8/)
 */
const sqlprocessor = require("./other/sqlprocessor");
const warn = require("./log/warn");
const output = require("./log/output");
const e = require("../configs/error.json");
function update(
  { table: table, column: column, value: value, PrimaryKey: PrimaryKey },
  callback,
  statuslog,
  pathlog,
  Connection,
  database
) {
  function out(err) {
    return output(err, statuslog, pathlog);
  }
  if (!table || !column || typeof value == "undefined" || !PrimaryKey || !callback) {
    return warn(
      "update",
      `
      update({ table: "<table>", column: "<column>", PrimaryKey: "<PrimaryKey>", value: "<value>" }, function (result) {
        console.log(result)
    })
      `
    );
  }
  //START
  try {
    Connection.query(
      `UPDATE ${sqlprocessor(database, "`")}.${sqlprocessor(
        table,
        "`"
      )} SET \`${column}\` = '${value}' WHERE \`id\` = '${PrimaryKey}'`,
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
module.exports = update;
/**
 * @Copyright 2021 Arth(https://github.com/4i8/)
 */
