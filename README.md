<div align="center">
  <p>
    <a href="https://www.npmjs.com/package/qmy"><img  src="https://gcdn.pbrd.co/images/iT2RoGwPO1f9.png?o=1" width="400" alt="qmy" /></a>
  </p>
  <p>
    <a href="https://discord.com/users/599882913064026153#804291489319616512"><img src="https://img.shields.io/static/v1?label=powered%20by&message=Arth&color=000&style=for-the-badge&logo=Windows%20Terminal&logoColor=fff"/></a>
    <a href="https://www.npmjs.com/package/qmy"><img src="https://img.shields.io/npm/v/qmy.svg?style=for-the-badge" alt="NPM version" /></a>
    <a href="https://www.npmjs.com/package/qmy"><img src="https://img.shields.io/npm/dt/qmy.svg?maxAge=3600&style=for-the-badge" alt="NPM downloads" /></a>
    <a href="https://discord.gg/r7sgerWCcT"><img src="https://img.shields.io/discord/894463244188676116?style=for-the-badge" alt="Discord server" /></a>

  </p>
</div>

## About

Quick [mysql](https://www.mysql.com/) is a powerful module that makes the mysql system easier, simpler and faster

- Speed
- Uninterrupted connection
- ease
- High security

## Installation

```sh-session
npm install qmy
```

## Example usage

> **create connection**

```js
const qmy = require("qmy");

const connection = new qmy(
  {
    database: "<database>",
    host: "<host>",
    password: "<password>",
    port: 3306,
    user: "<user>",
  },
  //optional
  {
    settings: {
      logfile: {
        //This option saves errors to a file
        status: true, //{default} false
        path: "./test/",
      },
    },
  }
);
```

> **methods**

```js
const qmy = require("qmy");

const connection = new qmy(
  {
    database: "<database>",
    host: "<host>",
    password: "<password>",
    port: 3306,
    user: "<user>",
  },
  //optional
  {
    settings: {
      logfile: {
        //This option saves errors to a file
        status: true, //{default} false
        path: "./test/",
      },
    },
  }
);
//
//This function is used to get data from databases
connection.get("<table>", "<PrimaryKey>", function (result) {
  console.log(result);
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
```

## Links

- [Twiter](https://twitter.com/onlyarth)
- Documentation#soon

## License

- [Apache-2.0](https://www.apache.org/licenses/LICENSE-2.0)
