//Copyright(c) 2021 Arth(qmy)
const fs = require("fs");
const D = new Date().toISOString().split('T')[0]

function errorfile(error, path) {
    var log = fs.createWriteStream(path, { flags: 'a' });
    log.write(`[${D}]: `+error + '\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n');

}
module.exports = errorfile;