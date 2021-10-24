/**
 * @Copyright 2021 Arth(https://github.com/4i8/)
 */
const warn = require("./log/warn");
const output = require("./log/output");
const e = require("../configs/error.json");
function query(sql, callback, statuslog, pathlog, Connection) {
  function out(err) {
    return output(err, statuslog, pathlog);
  }
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
  //START
  try {
    Connection.query(`${sql}`, function (err, result) {
      if (err) {
        return out(err);
      }
      callback(result);
    });
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
module.exports = query;
/**
 * @Copyright 2021 Arth(https://github.com/4i8/)
 */
