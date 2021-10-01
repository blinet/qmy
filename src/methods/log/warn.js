//Copyright(c) 2021 Arth(qmy)
const customconsole = require("./customconsole");

function warn(str, str2) {
   return customconsole(`
   To use ${str} function, it must be written like this:\n${str2}
   `, "#ffcc00")
}
module.exports=warn;