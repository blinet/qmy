/**
 * @Copyright 2021 Arth(https://github.com/4i8/)
 */
const sqlprocessor = require("./other/sqlprocessor");
function remove(table, PrimaryKey, Connection, database) {
  return new Promise((resolve, reject) => {
    const pkey = PrimaryKey.split(":");
    //START
    Connection.query(
      `DELETE FROM  ${sqlprocessor(database, "`")}.${sqlprocessor(
        table,
        "`"
      )} WHERE  \`${pkey[0]}\` = '${pkey[1]}'`,
      function (err, result) {
        if (err) {
          return reject(err);
        }
        resolve(result);
      }
    );
    //END
  });
}
module.exports = remove;
/**
 * @Copyright 2021 Arth(https://github.com/4i8/)
 */
