/**
 * @Copyright 2021 Arth(https://github.com/4i8/)
 */
const custom = require("./custom");
const config = require("../../configs/settings.json");

function warn(str, example) {
  return custom(
    `To use ${str} function, it must be written like this:\n${example}\n\nIf you need help, you can contact us here on the Discord server
${config.settings.support}`,
    "#ffcc00"
  );
}
module.exports = warn;
/**
 * @Copyright 2021 Arth(https://github.com/4i8/)
 */
