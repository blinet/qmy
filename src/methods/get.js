/**
 * @Copyright 2021 Arth(https://github.com/4i8/)
 */
const sqlprocessor = require("./other/sqlprocessor");
function get(table, PrimaryKey, Connection, database, options) {
  return new Promise((resolve, reject) => {
    //START
    const pkey = PrimaryKey.split(":");
    Connection.query(
      `SELECT * FROM ${sqlprocessor(database, "`")}.${sqlprocessor(
        table,
        "`"
      )} WHERE \`${pkey[0]}\` = '${pkey[1]}'`,
      function (err, result) {
        if (err) {
          return reject(err);
        }
        resolve(options.array ? result : result[0]);
      }
    );
    //END
  });
}
module.exports = get;
/**
 * @Copyright 2021 Arth(https://github.com/4i8/)
 */
