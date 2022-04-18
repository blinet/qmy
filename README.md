<div align="center">
  <p>
 <a href="https://www.npmjs.com/package/qmy"><img  src="https://raw.githubusercontent.com/4i8/qmy/main/logo/Qmy.png" width="400" alt="qmy" /></a>
  </p>
  <p>
 <a href="https://github.com/4i8/"><img src="https://img.shields.io/static/v1?label=powered%20by&message=Aros&color=04AFF7&style=for-the-badge&logo=Windows%20Terminal&logoColor=fff"/></a>
 <a href="https://www.npmjs.com/package/qmy"><img src="https://img.shields.io/npm/v/qmy.svg?style=for-the-badge" alt="NPM version" /></a>
 <a href="https://www.npmjs.com/package/qmy"><img src="https://img.shields.io/npm/dt/qmy.svg?maxAge=3600&style=for-the-badge" alt="NPM downloads" /></a>
 <a href="https://discord.gg/r7sgerWCcT"><img src="https://img.shields.io/discord/894463244188676116?https://img.shields.io/static/v1?text=f&style=for-the-badge&logo=discord&logoColor=fff" alt="Discord server" /></a>

  </p>
</div>

## About

Quick [mysql](https://www.mysql.com/) is a powerful module that makes the mysql system easier, simpler and faster

- Speed
- Unlimited connection without losing connection
- Easy to use
- High security

## Installation

```sh-session
npm install qmy
yarn add qmy
```

## Announcement 

> **(+)connect() will resolve the process by calling the then() function and it will give you a notification that the connection was successful if there is an error, it will reject the process and you can call the catch() function and it will give you the error<br>(-)Remove Reminders New Versions**

## Example usage

> **Connection Config**

```js
 host: "localhost",
 port: 3306,
 localAddress: undefined,
 socketPath: undefined,
 user: undefined,
 password: undefined,
 database: undefined,
 connectTimeout: 10000,
 insecureAuth: false,
 supportBigNumbers: false,
 bigNumberStrings: false,
 dateStrings: false,
 debug: undefined,
 trace: true,
 stringifyObjects: false,
 timezone: "local",
 flags: "",
 queryFormat: undefined,
 pool: undefined,
 ssl: false,
 localInfile: true,
 multipleStatements: false,
 typeCast: true,
 maxPacketSize: 0,
 charsetNumber: 33,
 clientFlags: 455631,
 protocol41: true,
```

### #Note

##### Direct connection problem solving: [Here](#connect)

> **create connection**

**Start by creating a connection to the database.
Use the username and password from your MySQL database or use uri**

```js
const qmy = require("qmy");

const connection = new qmy({
  database: "<database>",
  host: "<host>",
  password: "<password>",
  port: 3306,
  user: "<user>",
});
```

## Documentation

<table>
  <tr>
    <th>Method</th>
    <th>Description</th>
    <th>explain</th>
  <tr>
    <td>connect</td>
    <td>connect() will resolve the process by calling the then() function and it will give you a notification that the connection was successful if there is an error, it will reject the process and you can call the catch() function and it will give you the error
</td>
    <td><a href=#connect>Go to example</a></td>
  </tr>
   <tr>
    <td>query</td>
    <td>Use SQL statements to read from (or write to) a MySQL database. This is also called "to query" the database.
The connection object created in the example above, has a method for querying the database</td>
    <td><a href=#query>Go to example</a></td>
  </tr>
     <tr>
    <td>get</td>
    <td>used to select data from a database</td>
    <td><a href=#get>Go to example</a></td>
  </tr>
    <tr>
    <td>remove</td>
    <td>used to delete existing records in a table</td>
    <td><a href=#remove>Go to example</a></td>
  </tr>
    <tr>
    <td>set</td>
    <td>used to insert new records in a table</td>
    <td><a href=#set>Go to example</a></td>
  </tr>
   </tr>
    <tr>
    <td>update</td>
    <td>used to modify the existing records in a table</td>
    <td><a href=#update>Go to example</a></td>
  </tr>
</table>

## connect

```js
const qmy = require("qmy");

const connection = new qmy({
  database: "<database>",
  host: "<host>",
  password: "<password>",
  port: 3306,
  user: "<user>",
});
connection
  .connect()
  .then(() => {
    //do something
    //...
  })
  .catch((error) => {
    //do something
    //...
    console.log(error);
  });
```

## query

```js
const qmy = require("qmy");

const connection = new qmy({
  database: "<database>",
  host: "<host>",
  password: "<password>",
  port: 3306,
  user: "<user>",
});
connection
  .connect()
  .then(() => {
    connection
      .query("<SQL statements>")
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  })
  .catch((error) => {
    //do something
    //...
    console.log(error);
  });
```

## get

```js
const qmy = require("qmy");

const connection = new qmy({
  database: "<database>",
  host: "<host>",
  password: "<password>",
  port: 3306,
  user: "<user>",
});
connection
  .connect()
  .then(() => {
    connection
      .get("<table>", "<Where>:<PrimaryKey>")
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  })
  .catch((error) => {
    //do something
    //...
    console.log(error);
  });
```

## remove

```js
const qmy = require("qmy");

const connection = new qmy({
  database: "<database>",
  host: "<host>",
  password: "<password>",
  port: 3306,
  user: "<user>",
});
connection
  .connect()
  .then(() => {
    connection
      .remove("<table>", "<Where>:<PrimaryKey>")
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  })
  .catch((error) => {
    //do something
    //...
    console.log(error);
  });
```

## set

```js
const qmy = require("qmy");

const connection = new qmy({
  database: "<database>",
  host: "<host>",
  password: "<password>",
  port: 3306,
  user: "<user>",
});
connection
  .connect()
  .then(() => {
    connection
      .set(
        {
          table: "users",
          column: "id - name - color",
          values: "2324249073 - arth - red",
        },
        { sign: "-" }
      )
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  })
  .catch((error) => {
    //do something
    //...
    console.log(error);
  });
```

## update

```js
const qmy = require("qmy");

const connection = new qmy({
  database: "<database>",
  host: "<host>",
  password: "<password>",
  port: 3306,
  user: "<user>",
});
connection
  .connect()
  .then(() => {
    connection
      .update({
        table: "users",
        column: "name",
        PrimaryKey: "id:2324249073",//<Where>:<PrimaryKey>
        value: "arth",
      })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  })
  .catch((error) => {
    //do something
    //...
    console.log(error);
  });
```

## Links

- [Twiter](https://twitter.com/onlyarth)
- [Github](https://github.com/4i8)
- [Documentation](#documentation)

## License

- [Apache-2.0](https://www.apache.org/licenses/LICENSE-2.0)
