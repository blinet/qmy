//Copyright(c) 2021 Arth(qmy)
const chalk = require("chalk");
const D = new Date().toISOString().split('T')[0]

function customconsole(msg, color) {
    return console.log(chalk.hex("#" + color).bold(`[${D}]: ` + msg))
}
module.exports = customconsole;