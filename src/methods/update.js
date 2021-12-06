/**
 * @Copyright 2021 Arth(https://github.com/4i8/)
 */
const sqlprocessor = require("./other/sqlprocessor");
function update(
  { table: table, column: column, value: value, PrimaryKey: PrimaryKey },
  Connection,
  database
) {
  return new Promise((resolve, reject) => {
    //START
    const pkey = PrimaryKey.split(":");
    Connection.query(
      `UPDATE ${sqlprocessor(database, "`")}.${sqlprocessor(
        table,
        "`"
      )} SET \`${column}\` = '${value}' WHERE \`${pkey[0]}\` = '${pkey[1]}'`,
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
module.exports = update;
/**
 * @Copyright 2021 Arth(https://github.com/4i8/)
 */
