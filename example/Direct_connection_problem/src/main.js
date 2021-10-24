//Main File
const connection = require("../module/connection");
//This function is used to get data from databases
connection.get("<table>", "<PrimaryKey>", function (result) {
  console.log(result[0]);
});

//This function is used to save data in databases
connection.set(
  { table: "<table>", column: "<column>", values: "<values>" },
  function (result) {
    console.log(result);
  }
); //It is placed "," if there is more than one value or column

//This function is used to update data in databases
connection.update(
  {
    table: "<table>",
    column: "<column>",
    PrimaryKey: "<PrimaryKey>",
    value: "<value>",
  },
  function (result) {
    console.log(result);
  }
);

//This function is used to remove data
connection.remove("<table>", "<PrimaryKey>", function (result) {
  console.log(result);
});

//This is a query function that you can perform any operation with this function.
//This function is useful for developers who want to perform an operation that is not available in existing functions
connection.query("<sql>", function (result) {
  console.log(result);
});
