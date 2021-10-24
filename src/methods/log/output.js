/**
 * @Copyright 2021 Arth(https://github.com/4i8/)
 */
const custom = require("./custom");
const file = require("./file");
const config = require("../../configs/settings.json");

function output(err, statuslog, pathlog) {
  if (err) {
    if (statuslog == true) {
      file(err, pathlog);
      custom(
        "New Error: " +
          pathlog +
          config.settings.logfile.path +
          `\n\nIf you need help, you can contact us here on the Discord server
${config.settings.support}`,
        "FF0000"
      );
    } else {
      custom(
        err +
          `\n\nIf you need help, you can contact us here on the Discord server
${config.settings.support}`,
        "FF0000"
      );
    }
  }
  return;
}

module.exports = output;
/**
 * @Copyright 2021 Arth(https://github.com/4i8/)
 */
