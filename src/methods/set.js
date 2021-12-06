/**
 * @Copyright 2021 Arth(https://github.com/4i8/)
 */
const sqlprocessor = require("./other/sqlprocessor");
function set(
  { table: table, column: column, values: values },
  Connection,
  database,
  options
) {
  return new Promise((resolve, reject) => {
    //START
    Connection.query(
      `INSERT INTO ${sqlprocessor(database, "`")}.${sqlprocessor(
        table,
        "`"
      )} (${sqlprocessor(column, "`", options.sign)}) VALUES (${sqlprocessor(
        values,
        "'",
        options.sign
      )});`,
      function (err, result) {
        if (err) {
          return reject(err);
        }
        resolve(result);
      }
    );
  });
  //END
}
module.exports = set;
/**
 * @Copyright 2021 Arth(https://github.com/4i8/)
 */
