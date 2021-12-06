<div align="center">
  <p>
 <a href="https://www.npmjs.com/package/qmy"><img  src="https://gcdn.pbrd.co/images/iT2RoGwPO1f9.png?o=1" width="400" alt="qmy" /></a>
  </p>
  <p>
 <a href="https://github.com/4i8/"><img src="https://img.shields.io/static/v1?label=powered%20by&message=Arth&color=000&style=for-the-badge&logo=Windows%20Terminal&logoColor=fff"/></a>
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

## Update

> **1-All mySQL options have been added, you can also put a uri to connect to MYSQL
> 2-The LogFile option has been removed
> 3-Callback was replaced to promise(then and catch and finally)
> 4-Internal issues in Functions have been fixed
> 5-The set function have been made now you can place a custom Sign
> 6-Internal issues with file have been fixed
> 7-result of get function be object and you have a option you can make Array
> 8-result of query function be Array and you have a option you can make object**

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

**When connection Create,please wait for tow seconds
when requesting data
and do not request data directly when running in order not to get this error:
TypeError: Cannot read property 'query' of undefined**

##### Solve this problem in this link: [Direct_connection_problem](https://github.com/4i8/qmy/tree/main/example/Direct_connection_problem)

> **create connection**

```js
/** @example */
new qmy({
  database: "<database>",
  host: "<host>",
  password: "<password>",
  port: 3306,
  user: "<user>",
});
/** @example */
new qmy("uri");
```

> **methods**

```js
const qmy = require("qmy");

const connection = new qmy({
  database: "<database>",
  host: "<host>",
  password: "<password>",
  port: 3306,
  user: "<user>",
});

// <-  Data get ->
/**
 *This function is used to get data from databases
 * @param  {array: <default:false>:boolean }
 * @example
 */
get("<table>", "<Where>:<PrimaryKey>")
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err);
  });
/**
 * Example of a <Where>:<PrimaryKey>
 * @example */
get("users", "id:1111111111")
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err);
  });

// <- query ->
/**
 *This is a query function that you can perform any operation with this function.
 *This function is useful for developers who want to perform an operation that is not available in existing functions
 * @param  {array: <default:true>:boolean }
 * @example */
query("<sql>", { array: false })
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err);
  });

// <- Data remove ->
/**
  *This function is used to remove data
  *
  * @example */
  remove("<table>", "<Where>:<PrimaryKey>").then((result) => {
    console.log(result)
 }).catch((err) => {
    console.log(err);
  });
  /**
  * Example of a <Where>:<PrimaryKey>
  * @example */
  remove("users", "id:1111111111").then((result) => {
    console.log(result)
 }).catch((err) => {
    console.log(err);
  });
   */

// <- Data storage ->
/**
   *This function is used to save data in databases
   * @param  {sign: <default:",">:string }
   * @example */
    set({
    "table": "<table>",
    "column": "<column>",
     "values": "<values>"
    }).then((result) => {
    console.log(result)
 }).catch((err) => {
    console.log(err);
  });
   /**
   //It is placed sign if there is more than one value or column
  * @example */
  set({
    "table": "users",
    "column": "id - arth - color",
    "values": "1111111111 - arth - red"}, { sign:"-" }).then((result) => {
    console.log(result)
 }).catch((err) => {
    console.log(err);
  });


// <- Data update ->
/**
   *This function is used to update data in databases
   *
   * @example */
    update({
       table: "<table>",
       column: "<column>",
       PrimaryKey: "<Where>:<PrimaryKey>",
       value: "<value>",
     }).then((result) => {
    console.log(result)
 }).catch((err) => {
    console.log(err);
  });
   /**
   * Example of a <Where>:<PrimaryKey>
  * @example*/
   update({
       table: "users",
       column: "name",
       PrimaryKey: "id:1111111111",
       value: "arth",
     }).then((result) => {
    console.log(result)
 }).catch((err) => {
    console.log(err);
  });
```

## Links

- [Twiter](https://twitter.com/onlyarth)
- [Github](https://github.com/4i8)
- Documentation#soon

## License

- [Apache-2.0](https://www.apache.org/licenses/LICENSE-2.0)
