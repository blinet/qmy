/**
 * @Copyright 2021 Arth(https://github.com/4i8/)
 */
const chalk = require("chalk");
const D = new Date().toISOString().split("T")[0];

function custom(msg, color) {
  return console.log(chalk.hex("#" + color).bold(`[${D}]: ` + msg));
}
module.exports = custom;
/**
 * @Copyright 2021 Arth(https://github.com/4i8/)
 */
