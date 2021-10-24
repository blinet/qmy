/**
 * @Copyright 2021 Arth(https://github.com/4i8/)
 */
const fs = require("fs");
const D = new Date().toISOString().split("T")[0];
const config = require("../../configs/settings.json");
function file(error, path) {
  try {
    if (!fs.existsSync(path + config.settings.logfile.folder)) {
      fs.mkdirSync(path + config.settings.logfile.folder);
    }
    var log = fs.createWriteStream(path + config.settings.logfile.path, {
      flags: "a",
    });
    log.write(
      `[${D}]: ` + error + "\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n"
    );
  } catch (error) {}
}
module.exports = file;
/**
 * @Copyright 2021 Arth(https://github.com/4i8/)
 */
