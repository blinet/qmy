/**
 * @Copyright 2021 Arth(https://github.com/4i8/)
 */
function query(sql, Connection, options ) {
  return new Promise((resolve, reject) => {
    //START
    Connection.query(`${sql}`, function (err, result) {
      if (err) {
        return reject(err);
      }
      resolve(options.array ? result : result[0]);
    });
    //END
  });
}
module.exports = query;
/**
 * @Copyright 2021 Arth(https://github.com/4i8/)
 */
