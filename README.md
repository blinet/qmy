<div align="center">
  <p>
    <a href="https://www.npmjs.com/package/qmy"><img  src="https://gcdn.pbrd.co/images/iT2RoGwPO1f9.png?o=1" width="400" alt="qmy" /></a>
  </p>
  <p>
    <a href="https://discord.com/users/599882913064026153#804291489319616512"><img src="https://img.shields.io/static/v1?label=powered%20by&message=Arth&color=000&style=for-the-badge&logo=Windows%20Terminal&logoColor=fff"/></a>
    <a href="https://www.npmjs.com/package/qmy"><img src="https://img.shields.io/npm/v/qmy.svg?style=for-the-badge" alt="NPM version" /></a>
    <a href="https://www.npmjs.com/package/qmy"><img src="https://img.shields.io/npm/dt/qmy.svg?maxAge=3600&style=for-the-badge" alt="NPM downloads" /></a>
    <a href="https://discord.gg/r7sgerWCcT"><img src="https://img.shields.io/discord/894463244188676116?https://img.shields.io/static/v1?text=f&style=for-the-badge&logo=discord&logoColor=fff" alt="Discord server" /></a>

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
        path: "../", //{default} ./
      },
      connection: {
        //{false} You will not see connection message in console log
        //{true} You will see connection message in console log
        log: false, //{default} true
      },
    },
  }
);
```

### #Note

**When connection Create,please wait for tow seconds
when requesting data
and do not request data directly when running in order not to get this error:
TypeError: Cannot read property 'query' of undefined**

##### Solve this problem in this link: [Direct_connection_problem](https://github.com/4i8/qmy/tree/main/example/Direct_connection_problem)

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
  if (!result[0]) {
    //false
    console.log(false);
  } else if (result[0]) {
    //true
    console.log(result[0]);
  }
});
<div align="center">
  <p>
    <a href="https://www.npmjs.com/package/qmy"><img  src="https://gcdn.pbrd.co/images/iT2RoGwPO1f9.png?o=1" width="400" alt="qmy" /></a>
  </p>
  <p>
    <a href="https://discord.com/users/599882913064026153#804291489319616512"><img src="https://img.shields.io/static/v1?label=powered%20by&message=Arth&color=000&style=for-the-badge&logo=Windows%20Terminal&logoColor=fff"/></a>
    <a href="https://www.npmjs.com/package/qmy"><img src="https://img.shields.io/npm/v/qmy.svg?style=for-the-badge" alt="NPM version" /></a>
    <a href="https://www.npmjs.com/package/qmy"><img src="https://img.shields.io/npm/dt/qmy.svg?maxAge=3600&style=for-the-badge" alt="NPM downloads" /></a>
    <a href="https://discord.gg/r7sgerWCcT"><img src="https://img.shields.io/discord/894463244188676116?https://img.shields.io/static/v1?text=f&style=for-the-badge&logo=discord&logoColor=fff" alt="Discord server" /></a>

  </p>
</div>

#Changes:

- **[2021-10-03]**:
  > **Fix a minor bug in main code**
- **[2021-10-04]**:
  > **A reminder was added to add a new version**
- **[2021-10-9]**:
  > **Fix a minor bug in main code**
- **[2021-10-24]**:
  > **1-The disconnection issue has been fixed
  > 2-The options issue has been fixed
  > 3-The log file issue has been fixed
  > 4-Internal issues in Functions have been fixed
  > 5-Connection issues fixed
  > 6-Internal issues with file have been fixed
  > 7-Package files have been rearranged
  > 8-The log files have been rearranged
  > 9-Some internal features have been added
  > 10-A new option has been added**

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
- [Github](https://github.com/4i8)
- Documentation#soon

## License

- [Apache-2.0](https://www.apache.org/licenses/LICENSE-2.0)
